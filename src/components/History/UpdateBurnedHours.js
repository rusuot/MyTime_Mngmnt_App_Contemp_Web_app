// imports for react, firestore db data & timing computation
import { Form, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Collection } from "authReactH/Collection";
import { Firestore } from "authReactH/Firestore";
import { ComputeTiming } from "Functions/ComputeTiming";

const styles = theme => ({
  disabledButton: {
    backgroundColor: theme.palette.primary || 'red'
  }
});

const UpdateBurnedHours = ({
  show,
  handleClose,
  onehistory: { description, amount, todo, todoId, activity, id },
}) => {
  const { updateDocument, deleteDocument, response } =
  Firestore("history");
  const { documents } = Collection("mytodos", ["createdAt", "desc"]);
  const { documents: activities } = Collection("activities", [
    "createdAt",
    "desc",
  ]);

  const { updateDocument: updateTODO } = Firestore("mytodos");
  const { currentAvailableHours } = ComputeTiming();

  const [form, setForm] = useState({
    description,
    amount,
    todo,
    todoId,
    activity,
  });

  useEffect(() => {
    setForm({ description, amount, todo, todoId, activity });
  }, [description, amount, todo, todoId, activity]);

  const handleUpdate = (e) => {
    e.preventDefault();
// Cases:
// if todo id is none and activity is none -> raise a warning for the user to insert any
    if (form.todoId === "" && form.activity === "") {
      return toast.error("Please select a activity or todo.");
    }
// if activity is different than empty 
// if todo id is none 
// this will be the case to update invested/burned hours as General Spent Hours
    if (form.activity !== "" && form.todoId === "") {
      form.todo = "todo_task_not_set";

// but if there is any todo task
      if (todoId !== "") {
// find the id and update todo with time
        const todo = documents.find((doc) => doc.id === todoId);
        updateTODO(
          {
            currentTime: parseInt(
              parseInt(todo.currentTime) - parseInt(amount)
            ),
          },
          todoId
        );
      }
    } 
// if todo in FORM is different than none
    else if (form.todoId !== "") {
      // find todo id
      const formTODO = documents.find((doc) => doc.id === form.todoId);
      form.todo = formTODO.title;
      form.activity = formTODO.activity;
// if todo id is none
      if (todoId === "") {
        updateTODO(
          {
            currentTime: parseInt(
              parseInt(formTODO.currentTime) + parseInt(form.amount)
            ),
          },

          form.todoId
        );
      } 
// else if todo is is different than none
      else if (todoId !== "") {
        //  find todo id
        const existingTODO = documents.find((doc) => doc.id === todoId);
// and if todo id in form and todoid are equal:
        if (form.todoId === todoId) {
          const currentTime = parseInt(
            parseInt(existingTODO.currentTime) -
              parseInt(amount) +
              parseInt(form.amount)
          );

          updateTODO(
            {
              currentTime,
            },
            form.todoId
          );
        } 
// else if todo id in form and todoid are not equal:
        else if (form.todoId !== todoId) {
          const existingTODO = documents.find((doc) => doc.id === todoId);
          const formTODO = documents.find((doc) => doc.id === form.todoId);
// update form todo
          updateTODO(
            {
              currentTime: formTODO.currentTime + parseInt(form.amount),
            },
            form.todoId
          );
// update existing task todo
          updateTODO(
            {
              currentTime: existingTODO.currentTime - parseInt(form.amount),
            },
            todoId
          );
        }
      }
    }

    updateDocument({ ...form, amount: parseInt(form.amount) }, id);

    if (response.error) {
      return toast.error(response.error);
    }

    // success toast & close
    toast.success("History was successfully updated!!!");
    handleClose();
  };

  // delete
  const handleDelete = (e) => {
    e.preventDefault();
// if todo id is different than none/empty
    if (todoId !== "") {
      const todo = documents.find((doc) => doc.id === todoId);
// /update todo
      updateTODO(
        {
          currentTime: parseInt(
            parseInt(todo.currentTime) - parseInt(amount)
          ),
        },
        todoId
      );
    }

    deleteDocument(id);

    if (response.error) {
      return toast.error(response.error);
    }

// success toast & close
    toast.success("History was successfully deleted!!!");
    handleClose();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

//  compute max time limit
  const getMaxTimingHours = () => {
// if there is an id for todo task
    if (form.todoId !== "") {
// find the id
      const todo = documents?.find((doc) => doc.id === form.todoId);
// initialize variable maxtiminghours
      let maxtiminghours = parseInt(todo?.mngmntAmount - todo?.currentTime);
// if todo id existing & form are equal
      if (form.todoId === todoId) {
// compute max time limit
        maxtiminghours = maxtiminghours + parseInt(amount);
      }
      return maxtiminghours;
    }
    return currentAvailableHours + parseInt(amount);
  };
// modals part
  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Update BurnedHours</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* description field */}
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              required
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="insert something.."
            />
          </Form.Group>
          {/* todo field */}
          <Form.Group className="container .register mngmnt-btn">
            <Form.Label >TODO</Form.Label>
            <Form.Select
              name="todoId"
              // backgroundColor={disabled}
              disabled={!form.todoId && form.activity}
              autoFocus={form.todo}
              value={form.todoId}
              onChange={handleChange}
            >
              <option value="">Update burned hours</option>
              {documents?.map((todo, idx) => {
                return (
                  <option value={todo.id} key={idx}>
                    {todo.title}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>

          <div className="text-secondary bg-info">(OR) - select only one option</div>
          {/* activity field */}
          <Form.Group className="container .register mngmnt-btn">
            <Form.Label>Activity</Form.Label>
            {/* disable part of form selection (todo) if activity was set */}
            <Form.Select
              name="activity"
              disabled={form.todoId}
              // readonly
              autoFocus={form.activity}
              value={form.todoId ? "" : form.activity}
              onChange={handleChange}
            >
              <option value="">Update burned hours</option>
              <option value="time_invested_or_reserved">RealBurnedHours</option>
              {activities?.map((activity, idx) => {
                return (
                  <option value={activity.code} key={idx}>
                    {activity.description}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
{/* Scheduled or burned hours */}
          <Form.Group className="mb-3">
            <Form.Label>
              Scheduled or burned: (your limit is:{" "}
              <span className="text-primary">{parseInt(getMaxTimingHours())} hours</span>)
            </Form.Label>
            <Form.Control
              type="number"
              required
              min={1}
              max={getMaxTimingHours()}
              name="amount"
              value={form.amount}
              placeholder="Enter amount of hours..."
              onChange={handleChange}
            />
          </Form.Group>
{/* buttons part - same as in Update Free Hours */}
          <div className="d-flex">
            {/* update button  */}
            <button
              type="submit"
              className="ms-auto mt-2 text-light rounded bg-success border-0 p-2"
              disabled={response.isPending}
            >
              {!response.isPending ? "Update" : "Loading.."}
            </button>
            {/* delete button  */}
            <button
              type="button"
              className="ms-3 mt-2 text-light rounded bg-danger border-0 p-2"
              disabled={response.isPending}
              onClick={handleDelete}
            >
              {!response.isPending ? "Delete" : "Loading.."}
            </button>
            {/* close/exit button  */}
            <button
              type="button"
              className="ms-3 mt-2 text-light rounded bg-secondary border-0 p-2"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default UpdateBurnedHours;

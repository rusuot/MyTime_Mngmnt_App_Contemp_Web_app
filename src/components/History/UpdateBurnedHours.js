import { Form, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Collection } from "authReactH/Collection";
import { Firestore } from "authReactH/Firestore";
import { ComputeTiming } from "Functions/ComputeTiming";

const UpdateBurnedHours = ({
  show,
  handleClose,
  onehistory: { description, amount, todo, todoId, activity, id },
}) => {
  const { documents } = Collection("mytodos", ["createdAt", "desc"]);
  const { documents: activities } = Collection("activities", [
    "createdAt",
    "desc",
  ]);
  const { updateDocument, deleteDocument, response } =
    Firestore("history");

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

    if (form.todoId === "" && form.activity === "") {
      return toast.error("Please select a activity or todo.");
    }

    // form.todoId should be "".
    if (form.activity !== "" && form.todoId === "") {
      form.todo = "no-todo";

      // If any previuos todo.
      if (todoId !== "") {
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

      // form.activity should be "" & form.todoId must have an ID.
    } else if (form.todoId !== "") {
      const formTODO = documents.find((doc) => doc.id === form.todoId);
      form.todo = formTODO.title;
      form.activity = formTODO.activity;

      if (todoId === "") {
        updateTODO(
          {
            currentTime: parseInt(
              parseInt(formTODO.currentTime) + parseInt(form.amount)
            ),
          },

          form.todoId
        );
      } else if (todoId !== "") {
        const previousTODO = documents.find((doc) => doc.id === todoId);

        if (form.todoId === todoId) {
          const currentTime = parseInt(
            parseInt(previousTODO.currentTime) -
              parseInt(amount) +
              parseInt(form.amount)
          );

          updateTODO(
            {
              currentTime,
            },
            form.todoId
          );
        } else if (form.todoId !== todoId) {
          const previousTODO = documents.find((doc) => doc.id === todoId);
          const formTODO = documents.find((doc) => doc.id === form.todoId);
          updateTODO(
            {
              currentTime: formTODO.currentTime + parseInt(form.amount),
            },
            form.todoId
          );

          updateTODO(
            {
              currentTime: previousTODO.currentTime - parseInt(form.amount),
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

    toast.success("OneHistory updated successfully.");
    handleClose();
  };

  const handleDelete = (e) => {
    e.preventDefault();

    if (todoId !== "") {
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

    deleteDocument(id);

    if (response.error) {
      return toast.error(response.error);
    }

    toast.success("OneHistory deleted successfully!");
    handleClose();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getMaximumTime = () => {
    if (form.todoId !== "") {
      const todo = documents?.find((doc) => doc.id === form.todoId);

      let maximumTime = parseInt(todo?.mngmntAmount - todo?.currentTime);

      if (form.todoId === todoId) {
        maximumTime = maximumTime + parseInt(amount);
      }
      return maximumTime;
    }
    return currentAvailableHours + parseInt(amount);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Update BurnedHours</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              required
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Rent of house"
            />
          </Form.Group>



          <Form.Group className="container .register mngmnt-btn">
            <Form.Label>TODO</Form.Label>
            <Form.Select
              name="todoId"
              onChange={handleChange}
              value={form.todoId}
              disabled={!form.todoId && form.activity}
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

          <Form.Group className="container .register mngmnt-btn">
            <Form.Label>Activity</Form.Label>
            <Form.Select
              name="activity"
              onChange={handleChange}
              value={form.todoId ? "" : form.activity}
              disabled={form.todoId}
            >
              <option value="">Update burned hours</option>
              <option value="#realburnedhours">RealBurnedHours</option>
              {activities?.map((activity, idx) => {
                return (
                  <option value={activity.code} key={idx}>
                    {activity.description}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              Scheduled or burned: (your limit is:{" "}
              <span className="text-primary">{parseInt(getMaximumTime())} hours</span>)
            </Form.Label>
            <Form.Control
              type="number"
              required
              min={1}
              max={getMaximumTime()}
              name="amount"
              value={form.amount}
              placeholder="Enter amount..."
              onChange={handleChange}
            />
          </Form.Group>

          <div className="d-flex">
            <button
              type="submit"
              className="ms-auto mt-2 text-light rounded bg-success border-0 p-2"
              disabled={response.isPending}
            >
              {!response.isPending ? "Update" : "Loading.."}
            </button>
            <button
              type="button"
              className="ms-3 mt-2 text-light rounded bg-danger border-0 p-2"
              disabled={response.isPending}
              onClick={handleDelete}
            >
              {!response.isPending ? "Delete" : "Loading.."}
            </button>
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

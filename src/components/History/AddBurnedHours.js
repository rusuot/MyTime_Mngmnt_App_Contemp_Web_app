// imports for firebase, react & logic
import { Collection } from "authReactH/Collection";
import { Firestore } from "authReactH/Firestore";
import { Form, Modal } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import { ComputeTiming } from "Functions/ComputeTiming";

const AddBurnedHoursModal = ({ show, handleClose }) => {
  // declare constants for firebase
  const { documents } = Collection("mytodos", ["createdAt", "desc"]);
  // const add document in firebase
  const { addDocument, response } = Firestore("history");
  // const update document in firebase
  const { updateDocument, response: updateResponse } = Firestore("mytodos");
  const { documents: activities, error: activitiesError } = Collection(
    "activities",
    ["createdAt", "desc"]
  );

  const { currentAvailableHours } = ComputeTiming();
// hooks
  const [form, setForm] = useState({
    description: "",
    amount: 0,
    todo: "todo_task_not_set",
    activity: "",
    todoId: "",
  });

  const handleRemoveData = () => {
    setForm({
      description: "",
      amount: 0,
      todo: "todo_task_not_set",
      activity: "",
      todoId: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let doc = { ...form, amount: parseInt(form.amount) };

    if (doc.todo === "todo_task_not_set" && doc.activity === "") {
      return toast.warning("Please select an activity or a todo.");
    }

    if (doc.todo !== "todo_task_not_set") {
      const todo = documents[form.todo];
      doc.todo = todo.title;
      doc.todoId = todo.id;
      doc.activity = todo.activity;

      updateDocument(
        {
          currentTime: parseInt(
            parseInt(todo.currentTime) + parseInt(doc.amount)
          ),
        },
        todo.id
      );
    }

    addDocument(doc);

    if (response.error || updateResponse.error) {
      return toast.error(response.error);
    }

    toast.success(`${form.amount} set burned hours - with success!`);

    handleRemoveData();
    handleClose();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
//  time calculation: all - current
  const getMaximumTime = () => {
    if (form.todo !== "todo_task_not_set") {
      const maximumTime = documents[form.todo].mngmntAmount - documents[form.todo].currentTime;
      return maximumTime;
    }
    return currentAvailableHours;
  };

  return (
    <Modal show={show} onHide={handleClose}>
      {activitiesError && toast.error(activitiesError)}
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add Invested/Scheduled H</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              required
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Burn hours for something.. "
            />
          </Form.Group>


{/*  to do logic in form */}
          <Form.Group className="container .register mngmnt-btn">
            <Form.Label>TODO</Form.Label>
            <Form.Select
              name="todo"
              onChange={handleChange}
              value={form.todo}
              // property used in form to disable one option or another
              disabled={form.activity !== ""}
            >
              <option value="todo_task_not_set">Please expand for your TODOs</option>
              {documents?.map((todo, idx) => {
                return (
                  <option value={idx} key={idx}>
                    {todo.title}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>

          <div className="text-secondary bg-info">(OR) - select only one option</div>
{/*  activity logic in form */}
          <Form.Group className="container .register mngmnt-btn">
            <Form.Label>Activity</Form.Label>
            <Form.Select
              name="activity"
              onChange={handleChange}
              value={form.activity}
              // property used in form to disable one option or another
              disabled={form.todo !== "todo_task_not_set"}
            >
              <option value="">Please expand for activity burned hours</option>
              <option value="time_invested_or_reserved">General Spent Hours (just lost time)</option>
              {activities?.map((activity, idx) => {
                return (
                  <option value={activity.code} key={idx}>
                    {activity.description}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
{/* time dynamic If you select a TO DO task or an actually activity time is computed based on what is chosen */}
          <Form.Group className="mb3">
            <Form.Label>
              Maximum time limit: {" "}
              <span className="text-primary">{parseInt(getMaximumTime())} - hours</span>
            </Form.Label>
            (This no will be changed based on what you select: activity/todo)
            <Form.Control
              type="number"
              required
              min={1}
              max={parseInt(getMaximumTime())}
              name="amount"
              value={form.amount}
              placeholder="Insert desired no of hours:"
              onChange={handleChange}
            />
          </Form.Group>


          <div className="d-flex">
            <button
              type="submit"
              className="ms-auto mt-2 text-light rounded bg-danger border-0 p-2"
              disabled={response.isPending}
            >
              {!response.isPending ? "Burn" : "Loading.."}
            </button>
            <button
              type="button"
              className="ms-3 mt-2 text-light rounded bg-secondary border-0  p-2"
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

export default AddBurnedHoursModal;

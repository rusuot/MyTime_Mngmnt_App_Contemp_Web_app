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
  const { addDocument, response } = Firestore("history");
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
    todo: "no-todo",
    activity: "",
    todoId: "",
  });

  const handleRemoveData = () => {
    setForm({
      description: "",
      amount: 0,
      todo: "no-todo",
      activity: "",
      todoId: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let doc = { ...form, amount: parseInt(form.amount) };

    if (doc.todo === "no-todo" && doc.activity === "") {
      return toast.warning("Please select an activity or a todo.");
    }

    if (doc.todo !== "no-todo") {
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

    toast.success(`${form.amount} Consider burned hours`);

    handleRemoveData();
    handleClose();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
//  time calculation: all - current
  const getMaximumTime = () => {
    if (form.todo !== "no-todo") {
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
          <Modal.Title>Add BurnedHours</Modal.Title>
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
              placeholder="Burn hours for something.. "
            />
          </Form.Group>
          <Form.Group className="mb-3">
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

{/*  to do logic in form */}
          <Form.Group className="mt-2 mb-3">
            <Form.Label>TODO</Form.Label>
            <Form.Select
              name="todo"
              onChange={handleChange}
              value={form.todo}
              disabled={form.activity !== ""}
            >
              <option value="no-todo">Please expand for your TODOs</option>
              {documents?.map((todo, idx) => {
                return (
                  <option value={idx} key={idx}>
                    {todo.title}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>

          <div className="text-danger">(OR) - select only one option</div>
{/*  activity logic in form */}
          <Form.Group className="mb-2">
            <Form.Label>Activity</Form.Label>
            <Form.Select
              name="activity"
              onChange={handleChange}
              value={form.activity}
              disabled={form.todo !== "no-todo"}
            >
              <option value="">Please expand for activity burned hours</option>
              <option value="#realspenthours">General Spent Hours (just lost time)</option>
              {activities?.map((activity, idx) => {
                return (
                  <option value={activity.code} key={idx}>
                    {activity.description}
                  </option>
                );
              })}
            </Form.Select>
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

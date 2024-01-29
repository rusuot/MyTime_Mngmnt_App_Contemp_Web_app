// set imports
import { Form, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Firestore } from "authReactH/Firestore";
import { ComputeTiming } from "Functions/ComputeTiming";
import { Collection } from "authReactH/Collection";

const UpdateTODO = ({
  show,
  handleClose,
  todo: { title, activity, currentTime, mngmntAmount, id },
}) => {
  // constants for firebase
  const { updateDocument, deleteDocument, response } = Firestore("mytodos");
  const { updateDocument: updateOneHistory } = Firestore("history");
  // constant for available hours-> computed time function
  const { currentAvailableHours } = ComputeTiming();

  const { documents: activities, error: activitiesError } = Collection(
    "activities",
    ["createdAt", "desc"]
  );

  const { documents: history } = Collection("history", [
    "createdAt",
    "desc",
  ]);

  const [form, setForm] = useState({ title, activity, mngmntAmount, currentTime });

  useEffect(() => {
    setForm({ title, activity, mngmntAmount, currentTime });
  }, [title, activity, mngmntAmount, currentTime]);


  // handle Update
  const handleUpdate = (e) => {
    e.preventDefault();

    if (form.activity === "") {
      return toast.error("Please select a activity!");
    }

    if (form.activity !== activity || form.title !== title) {
      history.forEach((hist) => {
        if (hist.todoId === id) {
          updateOneHistory(
            {
              activity: form.activity,
              todo: form.title,
            },
            hist.id
          );
        }
      });
    }

    updateDocument({ ...form, currentTime: parseInt(form.currentTime) ,mngmntAmount: parseInt(form.mngmntAmount) }, id);
    if (response.error) {
      return toast.error(response.error);
    }

    toast.success("TODO updated successfully!");
    handleClose();
  };

  // handle Delete
  const handleDelete = (e) => {
    e.preventDefault();

    history.forEach((hist) => {
      if (hist.todoId === id) {
        updateOneHistory(
          {
            todoId: "",
            todo: "todo_task_not_set",
            activity: "time_invested_or_reserved",
          },
          hist.id
        );
      }
    });

    deleteDocument(id);

    if (response.error) {
      return toast.error(response.error);
    }

    toast.success("TODO deleted successfully!");
    handleClose();
  };

  // handle Change

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      {activitiesError && toast.error(activitiesError)}
      <Form onSubmit={handleUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Update your TODO task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* title field */}
          <Form.Group className="mb-3">
            <Form.Label>Task title</Form.Label>
            <Form.Control
              type="text"
              required
              name="title"
              onChange={handleChange}
              value={form.title}
              placeholder="For example a desired TODO task/activity"
            />
          </Form.Group>
          {/* time reservation */}
          <Form.Group className="mb-3">
            <Form.Label>
            Time limit (in hours):{" "}
              <span className="text-primary">
                {parseInt(parseInt(currentAvailableHours) + parseInt(mngmntAmount))}
              </span>
              
            </Form.Label>
            <Form.Control
              type="number"
              required
              min={currentTime === 0 ? currentTime + 1 : currentTime}
              max={currentAvailableHours + mngmntAmount}
              name="mngmntAmount"
              onChange={handleChange}
              value={form.mngmntAmount}
              placeholder="Insert no of hours"
            />
          </Form.Group>

          <Form.Label>In activity:</Form.Label>
          {/* activity selection field */}
          <Form.Select
            className="mb-3"
            name="activity"
            onChange={handleChange}
            value={form.activity}
          >
            <option value={""}>Update your TODO</option>
            {activities?.map((activity, idx) => {
              return (
                <option value={activity.code} key={idx}>
                  {activity.description}
                </option>
              );
            })}
          </Form.Select>

          <div className="d-flex">
            {/* update button */}
            <button
              type="submit"
              className="ms-auto mt-2 text-light rounded bg-success border-0 p-2"
              disabled={response.isPending}
            >
              {!response.isPending ? "Update" : "Loading.."}
            </button>
            {/* delete button */}
            <button
              type="button"
              className="ms-3 mt-2 text-light rounded bg-danger border-0 p-2"
              disabled={response.isPending}
              onClick={handleDelete}
            >
              {!response.isPending ? "Delete" : "Loading.."}
            </button>
            {/* close/exit button */}
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

export default UpdateTODO;

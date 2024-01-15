// import react & forms & modal boxes & firestore
import { Form, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Firestore } from "authReactH/Firestore";
import { Collection } from "authReactH/Collection";

// set constants
const UpdateActivity = ({
  show,
  handleClose,
  activity: { description, code, id },
}) => {
  // set firebase constants
  const { updateDocument, deleteDocument, response } =
    Firestore("activities");
  const { documents } = Collection("activities", ["createdAt", "desc"]);
  // set form hooks constants
  const [form, setForm] = useState({ description, code });

  useEffect(() => {
    setForm({ description, code });
  }, [description, code]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const code_update = `${form.description.split(" ").join("").toLowerCase()}`;
    const doc = { ...form, code_update };

    const activityExist = documents.find((doc) => doc.code === code_update && doc.code !== code);

    if(activityExist) {
      return toast.error(`"${form.description}" This activity already exists, please insert other`)
    }
// update
    updateDocument(doc, id);
    if (response.error) {
      return toast.error(response.error);
    }

    toast.success("Activity updated successfully!");
    handleClose();
  };

  // delete
  const handleDelete = (e) => {
    e.preventDefault();
    deleteDocument(id);

    if (response.error) {
      return toast.error(response.error);
    }

    toast.success("Activity deleted successfully!");
    handleClose();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // what to return (form logic)
  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Update Your Activity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="modal-content">
            <Form.Label>Activity description / name</Form.Label>
            <Form.Control
              type="text"
              required
              name="description"
              onChange={handleChange}
              value={form.description}
            />
          </Form.Group>

          <div className="d-flex">
            <button
              type="submit"
              className="ms-auto mt-2 text-light rounded bg-success border-0 p-2"
              disabled={response.isPending}
            >
              {/* added Loading.. in case the response is pending for Update button */}
              {!response.isPending ? "Update" : "Loading.."}
            </button>
            <button
              type="button"
              className="ms-3 mt-2 text-light rounded bg-danger border-0 p-2"
              disabled={response.isPending}
              onClick={handleDelete}
            >
              {/* added Loading.. in case the response is pending for Delete button */}
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

export default UpdateActivity;

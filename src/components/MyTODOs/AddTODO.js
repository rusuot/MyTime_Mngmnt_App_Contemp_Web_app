// firebase and react imports
import { Firestore } from "authReactH/Firestore";
import { ComputeTiming } from "Functions/ComputeTiming";
import { Collection } from "authReactH/Collection";
import { Form, Modal } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";


const AddTODO = ({ show, handleClose }) => {
  // constants for adding desired to do activity
  const { addDocument, response } = Firestore("mytodos");
  const { documents, error } = Collection("activities", [
    "createdAt",
    "desc",
  ]);

  const { currentAvailableHours } = ComputeTiming();

  const [form, setForm] = useState({
    title: "",
    mngmntAmount: 0,
    activity: "",
    currentTime: 0,
  });
// remove
  const handleRemoveData = () => {
    setForm({
      title: "",
      mngmntAmount: 0,
      activity: "",
      currentTime: 0,
    });
  };
// submit
  const handleSubmit = async (e) => {
    e.preventDefault();
// raise/display toasts if none or 0
    if (documents.length === 0) {
      return toast.warning("There is no activity registerd");
    }

    if (currentAvailableHours === 0) {
      return toast.warning(`Current timing is: ${currentAvailableHours}`);
    }

    if (form.activity === "") {
      return toast.error("You did not select any activity, please select one");
    }

    addDocument({...form, currentTime: parseInt(form.currentTime) ,mngmntAmount: parseInt(form.mngmntAmount) });

    if (response.error) {
      return toast.error(response.error);
    }

    toast.success("Your TODO was added with success!");

    handleRemoveData();
    handleClose();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      {error && toast.error(error)}
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New TODO task. You can pick from examples below</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Modal.Dialog>Coding</Modal.Dialog>
        <Modal.Dialog>Documentation-Research</Modal.Dialog>
        <Modal.Dialog>Learn and exercises</Modal.Dialog>
          {/* title field */}
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              required
              name="title"
              onChange={handleChange}
              value={form.title}
              placeholder="copy & insert in here a task from eg above"
            />
{/* select your todo activity */}
          <Form.Label>Select your todo activity: </Form.Label>
          <Form.Select
            className="mb-3"
            name="activity"
            onChange={handleChange}
            value={form.activity}
          >
            <option value={""}>Select your activity for the TODO</option>
            {documents?.map((activity, idx) => {
              return (
                <option value={activity.code} key={idx}>
                  {activity.description}
                </option>
              );
            })}
          </Form.Select>
{/* and insert hour per item selected before */}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
            Insert your desired hours (Your max limit hours is:{" "}
              <span className="text-primary">{currentAvailableHours} - hours </span>)
            </Form.Label>
            <Form.Control
              type="number"
              required
              min={1}
              max={currentAvailableHours}
              name="mngmntAmount"
              onChange={handleChange}
              value={form.mngmntAmount}
              placeholder="Insert no of hours"
            />
          </Form.Group>

          <div className="d-flex">
            {/* add button */}
            <button
              type="submit"
              className="ms-auto mt-2 text-light rounded bg-success border-0 py-2 px-3"
              disabled={response.isPending}
            >
              {!response.isPending ? "ADD" : "Loading.."}
            </button>
            {/* close/exit button */}
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

export default AddTODO;

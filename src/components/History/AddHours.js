//  adding hours imports
import { Form, Modal } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import { Firestore } from "authReactH/Firestore";

const AddHours = ({ show, handleClose }) => {
  const { addDocument, response } = Firestore("history");

  const [form, setForm] = useState({
    description: "",
    todo: "RegisterMyTime",
    activity: "freetime",
    amount: 0,
  });

  const handleRemoveData = () => {
    setForm({
      description: "",
      todo: "RegisterMyTime",
      activity: "freetime",
      amount: 0,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let doc = { ...form, amount: parseInt(form.amount) };

    addDocument(doc);

    if (response.error) {
      return toast.error(response.error);
    }

    toast.success(`Successfully time registered. hours: ${form.amount}.`);

    handleRemoveData();
    handleClose();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add Free Hours</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* add day of week field */}
          <Form.Group className="container .register mngmnt-btn">
            <Form.Label>Day of week</Form.Label>
            <Form.Control
              type="text"
              required
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="For e.g. Monday"
            />
          </Form.Group>
          {/* add hours field */}
          <Form.Group className="container .register mngmnt-btn" controlId="max">
            <Form.Label>Insert your estimated free hours</Form.Label>
            <Form.Control
              type="number"
              required
              min={1}
              max={300}
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="Insert no of hours (min 1 - max 300h)"
            />
          </Form.Group>
          <div className="d-flex">
            {/* submit button: RegisterMyTime */}
            <button
              type="submit"
              className="ms-auto mt-2 text-light rounded bg-success border-0 p-2"
              disabled={response.isPending}
            >
              {!response.isPending ? "RegisterMyTime" : "Loading.."}
            </button>
             {/* exit/close button: Close */}
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

export default AddHours;

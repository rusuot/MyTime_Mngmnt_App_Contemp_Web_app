//  set imports
import { Form, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Firestore } from "authReactH/Firestore";
import { ComputeTiming } from "Functions/ComputeTiming";

const UpdateFreeHours = ({
  show,
  handleClose,
  onehistory: { description, amount, id },
}) => {
  const { updateDocument, deleteDocument, response } =
    Firestore("history");
// declare constant from time computation function
  const { currentAvailableHours } = ComputeTiming();

  const [form, setForm] = useState({
    description,
    amount,
  });

  useEffect(() => {
    setForm({ description, amount });
  }, [description, amount]);

  // Update FreeHours onehistory.
  const handleUpdate = (e) => {
    e.preventDefault();

    // if (form.amount > currentAvailableHours) {
    //   return toast.success("OneHistory can not be Zero(0).");
    // }

    updateDocument({ ...form, amount: parseInt(form.amount) }, id);

    if (response.error) {
      return toast.error(response.error);
    }

    toast.success("OneHistory updated successfully.");
    handleClose();
  };

  const handleDelete = (e) => {
    e.preventDefault();

    if (amount > currentAvailableHours) {
      return toast.error("You have already spend from this history!.");
    }

    deleteDocument(id);

    if (response.error) {
      return toast.error(response.error);
    }

    toast.success("OneHistory deleted successfully.");
    handleClose();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getMinLimit = () => {

    if( currentAvailableHours >= amount ){
        return 1;
    }

    return amount - currentAvailableHours
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Update Free Hours</Modal.Title>
        </Modal.Header>
        <Modal.Body>
{/*  amount of hours*/}
<Form.Group className="container .register mngmnt-btn">
            <Form.Label>Hours (you need to insert a no grater than:{" "} 
              <span className="text-primary">hours{parseInt(getMinLimit())}</span>- no. is computed based on what is invested/scheduled already)</Form.Label>
            <Form.Control
              type="number"
              name="amount"
              value={form.amount}
              required
              min={getMinLimit()}
              max={3000}
              placeholder="Insert no of hours"
              onChange={handleChange}
            />
          </Form.Group>
{/* description */}
          <Form.Group className="container .register mngmnt-btn">
            <Form.Label>Day of week</Form.Label>
            <Form.Control
              type="text"
              required
              name="description"
              value={form.description}
              placeholder="For example name a week day"
              onChange={handleChange}
            />
          </Form.Group>
{/* buttons part - same as in Update Burned Hours */}
{/* update button */}
          <div className="d-flex">
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
{/* close button */}
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

export default UpdateFreeHours;

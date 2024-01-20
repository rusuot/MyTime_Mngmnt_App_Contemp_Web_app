// firestore & react imports
import { Firestore } from "authReactH/Firestore";
import { Collection } from "authReactH/Collection";

import { useState } from "react";
import { toast } from "react-toastify";
import { Form, Modal } from "react-bootstrap";



// import { doc, setDoc } from "firebase/firestore"; 

// // Add a new document in collection "cities"
// await setDoc(doc(db, "cities", "LA"), {
//   name: "Los Angeles",
//   state: "CA",
//   country: "USA"
// });



// add activity, examples: studies, sports..
const AddActivity = ({ show, handleClose }) => {
  const { addDocument, response } = Firestore("activities");
  // const { setDocument, response2 } = Firestore("activities");
  const { documents } = Collection("activities", [
    "createdAt",
    "desc",
  ]);

  const [form, setForm] = useState({
    description: "",
  });

  const handleRemoveData = () => {
    setForm({
      description: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = `${form.description.split(" ").join("").toLowerCase()}`;
    const doc = { ...form, code };

    const activityExist = documents.find((doc) => doc.code === code);

    if(activityExist) {
      return toast.error(`"${form.description}" activity already exist.`)
    }

    addDocument(doc);

    if (response.error) {
      return toast.error(response.error);
    }

    toast.success(`Successfully added ${form.description}.`);

    handleRemoveData();
    handleClose();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}  >
        <Modal.Header closeButton>
          <Modal.Title>Add your desired activity. Your current Uni year classes:</Modal.Title>


        </Modal.Header>
        <Modal.Body>
        <Modal.Dialog>Contemporary Web Applications (QHO640)</Modal.Dialog>
        <Modal.Dialog>Data Science (QHO636)</Modal.Dialog>
        <Modal.Dialog>UX Strategies (QHO639)</Modal.Dialog>
{/* description field */}
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              required
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="copy & insert in here a class name or 'study'"
            />
{/* add button */}
          </Form.Group>
          <div className="d-flex">
            <button
              type="submit"
              className="ms-auto mt-2 text-light rounded bg-success border-0 py-2 px-3"
              disabled={response.isPending}
            >
              {!response.isPending ? "ADD" : "Loading.."}
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

export default AddActivity;

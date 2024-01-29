// react imports
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import { toast } from "react-toastify";
// imports from specified files
import TODOList from "components/MyTODOs/TODOList";
import AddTODO from "components/MyTODOs/AddTODO";
// import Collection - DB stuff
import { Collection } from "authReactH/Collection";


const MyTODOs = () => {
  const [showTODOModal, setShowTODOModal] = useState(false);
  const [filterActivity, setFilterActivity] = useState("#all");
  
  const { documents: activities, error: activitiesError } = Collection(
    "activities",
    ["createdAt", "desc"]
  );

  const handleChange = (e) => {
    setFilterActivity(e.target.value);
  };

  return (
    <div className="mytodos-page">
      {activitiesError && toast.error(activitiesError)}
      <h2 className="m-0 fw-bold text-center mb-2 mb-sm-3">MyTODOs</h2>

      <div className="mytodos-page-header d-flex justify-content-between align-items-center mb-2 mb-sm-3">
        <button
          className=".mytodos-page button py-2 px-3 rounded fw-bold fs-6 me-1"
          onClick={() => setShowTODOModal(true)}
        >
          New TODO
        </button>
        <div className="mytodos-page-header justify-content-center align-items-center gap-2">
          <Form.Group>
            <Form.Select onChange={(e) => handleChange(e)} className="py-2">
              <option value={"#all"}>Check activities / classes</option>
              {activities?.map((activity) => {
                return <option value={activity.code}>{activity.description}</option>;
              })}
            </Form.Select>
          </Form.Group>
        </div>
      </div>

      <TODOList filterActivity={filterActivity} />

      <AddTODO
        show={showTODOModal}
        handleClose={() => setShowTODOModal(false)}
      />
    </div>
  );
};

export default MyTODOs;

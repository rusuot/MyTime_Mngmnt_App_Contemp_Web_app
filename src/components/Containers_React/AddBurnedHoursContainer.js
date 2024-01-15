import React, { useState } from "react";
import { Troubleshoot } from "Icons/Icons";
import AddHours from "components/History/AddHours";
import AddBurnedHours from "components/History/AddBurnedHours";


const AddBurnedHoursContainer = () => {
  const [showAddHoursModal, setShowAddHoursModal] = useState(false);
  const [showAddBurnedHoursModal, setShowAddBurnedHoursModal] = useState(false);


  return (
    <div className="container .register">


      <div className="d-flex justify-content-center">
      <h5>Insert burned hours in here:</h5>
        <button
          className="ms-2 ms-lg-3 mngmnt-btn"
          onClick={() => setShowAddBurnedHoursModal(true)}
        >
          <Troubleshoot className={"me-1 me-md-2"} />
          Add Burned Hours
        </button>
      </div>



      <AddHours
        show={showAddHoursModal}
        handleClose={() => setShowAddHoursModal(false)}
      />
      <AddBurnedHours
        show={showAddBurnedHoursModal}
        handleClose={() => setShowAddBurnedHoursModal(false)}
      />
    </div>
  );
};

export default AddBurnedHoursContainer;
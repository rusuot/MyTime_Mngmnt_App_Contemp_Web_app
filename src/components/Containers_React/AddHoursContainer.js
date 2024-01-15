import React, { useState } from "react";
import { CalendarClock} from "Icons/Icons";
import AddHours from "components/History/AddHours";


const AddHoursContainer = () => {
  const [showAddHoursModal, setShowAddHoursModal] = useState(false);

  return (
    <div className="container .register">

      <div className="d-flex  justify-content-center">
      <h5>Insert your time in here:</h5>
        <button
          className="container .register mngmnt-btn"
          onClick={() => setShowAddHoursModal(true)}
        >
          <CalendarClock className={"me-1 me-md-2"} />
          Add Free Hours
        </button>
      </div>

      <AddHours
        show={showAddHoursModal}
        handleClose={() => setShowAddHoursModal(false)}
      />
    </div>
  );
};

export default AddHoursContainer;

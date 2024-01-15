import React, { useState } from "react";
import { CalendarClock, Troubleshoot } from "Icons/Icons";
import AddHours from "components/History/AddHours";
import AddBurnedHours from "components/History/AddBurnedHours";
import { ComputeTiming } from "Functions/ComputeTiming";
import { ProgressBar } from "react-bootstrap";
import { getProgressBarVariantContainer } from "Functions/functions";

const ColumnB = () => {
  const [showAddHoursModal, setShowAddHoursModal] = useState(false);
  const [showAddBurnedHoursModal, setShowAddBurnedHoursModal] = useState(false);
  const { currentAvailableHours, freehoursAvailableHours } = ComputeTiming();

  return (
    <div className="container-columnb">
      <h2 className="mb-4">
        Remained available hours: <span className="fw-bold">{currentAvailableHours}  </span>
        from <span className="fw-bold">{freehoursAvailableHours}</span>
        {/* getProgressBarVariantContainer */}
        <ProgressBar
          className="rounded-pill mb-2 mb-sm-3"
          variant={getProgressBarVariantContainer(currentAvailableHours, freehoursAvailableHours)}
          animated={true}
          min={0}
          max={freehoursAvailableHours}
          now={currentAvailableHours}
        />





      </h2>
      <div className="d-flex justify-content-center">
      <h5>Insert your time in here:</h5>
        <button
          className="mngmnt-btn"
          onClick={() => setShowAddHoursModal(true)}
        >
          <CalendarClock className={"me-1 me-md-2"} />
          Add Free Hours
        </button>
      </div>



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

export default ColumnB;

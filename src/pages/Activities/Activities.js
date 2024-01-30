// import react & activities: list & add logic
import React, { useState } from "react";
import ActivityList from "components/Activities/ActivityList";
import AddActivity from "components/Activities/AddActivity";


const Activities = () => {
  const [displayAddActivity, setAddActivity] = useState(false);

  // stylying classes: activities-page & activities-page-header
  return (
    <div className="activities-page">
      <h2 className="m-0 fw-bold text-center mb-2 mb-sm-3">Your Activities/Classes</h2>
      <div className="activities-page-header d-flex justify-content-start align-items-center mb-2 mb-sm-3">
        <button
          className="activities-page-header border-0 py-2 px-3 rounded fw-bold fs-6 me-1"
          onClick={() => setAddActivity(true)}>Insert a new activity
        </button>
      </div>
      <AddActivity
        show={displayAddActivity}
        handleClose={() => setAddActivity(false)}
      />
      <ActivityList />

    </div>
  );
};

export default Activities;

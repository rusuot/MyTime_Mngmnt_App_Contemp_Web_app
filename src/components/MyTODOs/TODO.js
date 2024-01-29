// react & progres bar import & progress bar function: 
import React from "react";
import { ProgressBar } from "react-bootstrap";
import { getProgressBarVariant } from "Functions/functions";

const TODO = ({
  data: { title, activity, currentTime, mngmntAmount },
  onClick,
}) => {
  return (
    <>
      <div className="todo" onClick={() => onClick()}>
      {/* <h5>Activity name: {activity}</h5> */}
      <h5 className="m-0 fw-italic text-center mb-2 mb-sm-3">Activity name: {activity}</h5>
        <p className="mt-2 mb-2 mb-sm-3 todo-title">

          {title.length >= 45 ? (
            <>
              {title.substring(0, 45)}
              <span className="text-secondary">...</span>
            </>
          ) : (
            <h5 className="m-0 fw-italic text-center mb-2 mb-sm-3">My TODO name: {title}</h5>

          )}
        </p>
        <div className="d-flex">
          <h5>Current burned hours: {currentTime}</h5>
          <h5 className="ms-auto text-secondary">From a total of:{mngmntAmount}</h5>
        </div>

        <ProgressBar
          className="rounded-pill mb-2 mb-sm-3"
          variant={getProgressBarVariant(currentTime, mngmntAmount)}
          
          animated={true}
          min={0}
          max={mngmntAmount}
          now={currentTime}
        />
        <h5 className="ms-auto text-secondary">Progress bar for estimated time and burned hours.</h5>
        <h5 className="m-0 fw-italic text-center mb-2 mb-sm-3">Percentage done for this item:
        {((currentTime / mngmntAmount) * 100).toPrecision(2)}%</h5>
      </div>
    </>
  );
};

export default TODO;

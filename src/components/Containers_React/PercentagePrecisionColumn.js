// imports
import React from "react";
import { ComputeTiming } from "Functions/ComputeTiming";
import { CalendarClock, Troubleshoot, InfoIcon} from "Icons/Icons";
const PercentagePrecisionColumn = () => {
  const { freehoursAvailableHours, realburnedhoursAvailableHours, currentAvailableHours } = ComputeTiming();

  return (
    <div className="container-columna">
      <div className="d-flex flex-column justify-content-center">
        <h6 className="fw-bold heading my-3">
        <InfoIcon></InfoIcon>
          Percentage Precision (free/scheduled hours){" "}
        </h6>
        <div className="mngmnt-statistics">
          <div className="statistics-container">
              <div className="d-flex text-success">
                <CalendarClock className={"me-1"} />
                <span>
                  +{((currentAvailableHours / freehoursAvailableHours) * 100).toPrecision(2)}%
                </span>
              </div>
          </div>
          <div className="statistics-container">
              <div className="d-flex text-secondary">
                <Troubleshoot className={"me-1"} />
                <span>
                  -{((realburnedhoursAvailableHours / freehoursAvailableHours) * 100).toPrecision(2)}%
                </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PercentagePrecisionColumn;

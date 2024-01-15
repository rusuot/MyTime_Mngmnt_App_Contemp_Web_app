//  do imports
import React from "react";

import { ComputeTiming } from "Functions/ComputeTiming";
import { InfoIcon} from "Icons/Icons";

//  this will display only infos and small time computations
const InfoColumn = () => {
  // constants declaration
  const { freehoursAvailableHours, realburnedhoursAvailableHours} = ComputeTiming();
  return (
    <div className="container-columna">
      <div className="d-flex flex-column justify-content-center">
        <h6 className="fw-bold heading my-3">
          Time Summary{" "}
        </h6>
        <div className="mngmnt-statistics">
                  {/* info for available hours */}
          <div className="statistics-container">
            <div className="d-flex justify-content-between">
            <InfoIcon className={"statistics-btn"} />
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="mt-3 mb-2 opacity-85">Available Hours: </h6>
                <h6 className="fw-bold">no: {freehoursAvailableHours}</h6>
              </div>
            </div>
          </div>
                  {/* info for scheduled hours */}
          <div className="statistics-container">
            <div className="d-flex justify-content-between">
              <InfoIcon className={"statistics-btn"} />
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="mt-3 mb-2 opacity-85">You have burned already</h6>
                <h6 className="mt-3 mb-2 opacity-85">Item in progres N/A</h6>
                {/* <h6 className="fw-bold">no: {currentAvailableHours} hours</h6> */}
              </div>
            </div>
          </div>
                  {/* info for burned hours */}
                  <div className="statistics-container">
            <div className="d-flex justify-content-between">
              <InfoIcon className={"statistics-btn"} />
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="mt-3 mb-2 opacity-85">You have scheduled already</h6>
                <h6 className="fw-bold">no: {realburnedhoursAvailableHours} hours</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoColumn;

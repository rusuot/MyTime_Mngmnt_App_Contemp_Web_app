//  imports for firebase & react & icons and so on

import React from "react";
import { Link } from "react-router-dom";

import { TableChartViewIcon, InfoIcon} from "Icons/Icons";

//  this will display the remove and open chart directly from A1 Column (container)
const OpenPieChartsContainer = () => {
  return (
    <div className="container">
      <div className="d-flex flex-column justify-content-center">
      </div>

      <h6 className="fw-bold heading my-3">
          Select icon below for pie charts:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
        </h6>
              <Link to="/charts">
                <TableChartViewIcon
                  className={
                    "tablechartviewicon opacity-95 text-success border border-success"
                  }
                />
              </Link>
              <InfoIcon></InfoIcon>

    </div>
  );
};

export default OpenPieChartsContainer;

import React from "react";

import { ComputeTiming } from "Functions/ComputeTiming";
import { ProgressBar } from "react-bootstrap";
import { getProgressBarVariantContainer, getProgressBarVariant2Container } from "Functions/functions";

const RegisterOrBurnHoursContainer = () => {
  const { currentAvailableHours, freehoursAvailableHours, realburnedhoursAvailableHours } = ComputeTiming();

  return (
    <div className="container .register">

      <h2 className="mb-4">
        Remained available hours: <span className="fw-bold">{currentAvailableHours}  </span>
        from <span className="fw-bold">{freehoursAvailableHours}</span>
        <ProgressBar
          className="rounded-pill mb-2 mb-sm-3"
          
          // variant={ScreenreaderLabelExample(currentAvailableHours, freehoursAvailableHours)}
          variant={getProgressBarVariantContainer(currentAvailableHours, freehoursAvailableHours)}
          animated={true}
          min={0}
          max={freehoursAvailableHours}
          now={currentAvailableHours}
        />
      </h2>
      {/* <h2 className="mb-4">
        Reserved hours: <span className="fw-bold">{realburnedhoursAvailableHours}  </span>
        from <span className="fw-bold">{freehoursAvailableHours}</span>
        <ProgressBar
          className="rounded-pill mb-2 mb-sm-3"
          
          // variant={ScreenreaderLabelExample(currentAvailableHours, freehoursAvailableHours)}
          variant={getProgressBarVariant2Container(realburnedhoursAvailableHours, freehoursAvailableHours)}
          animated={true}
          min={0}
          max={freehoursAvailableHours}
          now={currentAvailableHours}
        />
      </h2> */}
    </div>
  );
};

export default RegisterOrBurnHoursContainer;

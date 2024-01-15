import React from "react";
import ImageContainer from "./ImageContainer";
import InfoColumn from "./InfoColumn";
import PercentagePrecisionColumn from "./PercentagePrecisionColumn";

const Container = () => {
  return (
    <div className="container mt-1 mb-4 shadow">
      <ImageContainer />
      {/* <div class="image">
</div> */}
      <InfoColumn />
      <PercentagePrecisionColumn />
      {/* <ColumnA1 /> */}


</div>

  );
};

export default Container;

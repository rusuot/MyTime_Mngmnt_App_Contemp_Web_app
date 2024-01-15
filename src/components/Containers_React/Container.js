import React from "react";
import ColumnB from "./ColumnB";
import HelloUser from "./HelloUser";
import ColumnA from "./ColumnA";
// import ColumnA1 from "./ColumnA1";
import ColumnC from "./ColumnC";

const Container = () => {
  return (
    <div className="container mt-1 mb-4 shadow">
      <HelloUser />
      {/* <div class="image">
</div> */}
      <ColumnA />
      <ColumnB />
      <ColumnC />
      {/* <ColumnA1 /> */}


</div>

  );
};

export default Container;

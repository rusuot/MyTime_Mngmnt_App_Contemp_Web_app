// import react
import React from "react";



const Activity = ({ data: { description, code }, onClick }) => {
  // returning activity description
  return (
    <>
      <div className="activity" onClick={() => onClick()}>
        <h6 className="text-success bg-info m-0 border border-success d-inline py-1 px-2 rounded">{'activity code: '}{code}</h6>
        <h3 className="mt-3 mb-2 mb-sm-3 fw-bold text-center">{description}</h3>



        
      </div>
    </>
  );
};

export default Activity;

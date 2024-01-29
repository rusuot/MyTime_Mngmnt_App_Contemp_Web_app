// imports for react and todo list
import { Link } from "react-router-dom";
import React from "react";
import TODOList from "./TODOList";

const HomeMyTODOs = () => {
  return (
    <>
      <div className="mytodos-header">
      {/* <div className="home .mytodos .todo"> */}
        <h6 className="mytodos-header-title"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp; MyTODOs</h6>
        <Link to="/mytodos" className="mytodos-check-all-btn">
          Check your ToDos from here!
        </Link>
      </div>

      <TODOList />
    </>
  );
};

export default HomeMyTODOs;

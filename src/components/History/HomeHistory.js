import React from "react";
import { Link } from "react-router-dom";
import OneHistoryList from "./OneHistoryList";

const HomeHistory = () => {
  return (
    <>
      <div className="history-header">
        <h6 className="history-title me-1"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp; Your History</h6>
        <Link to="/history" className="history-check-all-btn">
          Check your history from here!
        </Link>
      </div>
      {/* open history list */}
      <OneHistoryList />
    </>
  );
};

export default HomeHistory;

// firebase imports & react & js logic
import { Collection } from "authReactH/Collection";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Activity from "./Activity";
import UpdateActivity from "./UpdateActivity";

const ActivityList = () => {
  // set constants
  const [displayActivity, setActivity] = useState(false);
  const [data, setData] = useState(false);
  // set firebase constants
  const { documents, error } = Collection("activities", [
    "createdAt",
    "desc",
  ]);
// what to return
  return (
    <>
      <div className={"activity-list mb-4"}>
      <div className="scroll-container">
        {error && toast.error(error)}
        {!documents ? (
          <div className="text-center text-dark bg-light p-2 rounded w-100">
            Loading..
          </div>
        ) : documents.length > 0 ? (
          documents.map((activity, idx) => {
            // returning documents list from firebase 
            return (
              <><Activity
                key={idx}
                data={activity}
                onClick={() => {
                  setData(activity);
                  setActivity(true);
                } } /><li key={idx + 1}>
                  Item number: {idx + 1}
                </li></>
                         
            );
          })
        ) : (
          <div className="text-center text-dark bg-light p-2 rounded w-100 fw-bold">
            There is no Activity found, please insert at least one!
          </div>
        )}
        
      </div>
      </div>


{/* call for update an activity */}
      <UpdateActivity
        show={displayActivity}
        handleClose={() => setActivity(false)}
        activity={data}
      />
    </>
  );
};

export default ActivityList;

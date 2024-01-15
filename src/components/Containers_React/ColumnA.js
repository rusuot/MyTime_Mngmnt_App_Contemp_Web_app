import { Collection } from "authReactH/Collection";
import { Firestore } from "authReactH/Firestore";
import React from "react";

import { toast } from "react-toastify";
import { ComputeTiming } from "Functions/ComputeTiming";
import { InfoIcon} from "Icons/Icons";

 
const ColumnA = () => {
  // constants declaration
  const { freehoursAvailableHours, realspenthoursAvailableHours, currentAvailableHours } = ComputeTiming();

  const { documents: history, error } = Collection("history", [
    "createdAt",
    "desc",
  ]);
  const { documents: mytodos, todoError } = Collection("mytodos", [
    "createdAt",
    "desc",
  ]);
  const { documents: activities, activityError } = Collection("activities", [
    "createdAt",
    "desc",
  ]);

  const { deleteDocument, response } = Firestore("history");
  const { deleteDocument: deleteTODO, response: todoResponse } =
    Firestore("mytodos");
  const { deleteDocument: deleteActivity, response: activityResponse } =
    Firestore("activities");

  const handleRemoveDataAll = () => {
    if (!error && !todoError && !activityError) {
      mytodos?.forEach((todo) => {
        deleteTODO(todo.id);
        console.log("deleted")
      });

      if (todoResponse.error) {
        return toast.error(todoResponse.error);
      }

      history?.forEach((onehistory) => {
        deleteDocument(onehistory.id);
      });

      if (response.error) {
        return toast.error(response.error);
      }

      activities?.forEach((activity) => {
        deleteActivity(activity.id);
      });

      if (activityResponse.error) {
        return toast.error(activityResponse.error);
      }

      toast.success("All history, mytodos and activities are removed");
    } else {
      toast.error(error + " " + todoError + " " + activityError);
    }
  };
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
                <h6 className="fw-bold">no: {realspenthoursAvailableHours} hours</h6>
              </div>

            </div>
          </div>


        </div>
      </div>


    </div>
  );
};

export default ColumnA;

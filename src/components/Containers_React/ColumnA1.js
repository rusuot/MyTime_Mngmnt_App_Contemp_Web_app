import { Collection } from "authReactH/Collection";
import { Firestore } from "authReactH/Firestore";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { TableChartViewIcon, InfoIcon, DeleteIcon} from "Icons/Icons";

 
const ColumnA1 = () => {
  // constants declaration

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
    <h6 className="fw-bold heading my-3">
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Remove all data and start again:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {" "}
          <button
      className="removedata-all-btn py-1 px-2 bg-danger text-light rounded border-1"
      onClick={handleRemoveDataAll}
    >
      RemoveData
          </button>
          <DeleteIcon></DeleteIcon>
    </h6>
    </div>
  );
};

export default ColumnA1;

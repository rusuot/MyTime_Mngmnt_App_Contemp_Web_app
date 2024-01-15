//  imports for firebase & react & icons and so on
import { Collection } from "authReactH/Collection";
import { Firestore } from "authReactH/Firestore";
import React from "react";
import { toast } from "react-toastify";
import { DeleteIcon} from "Icons/Icons";

//  this will display the remove and open chart directly from A1 Column (container)
const DeteleAllDataContainer = () => {
  // constants declaration
  const { documents: activities, activityError } = Collection("activities", [
    "createdAt",
    "desc",
  ]);
  const { documents: mytodos, todoError } = Collection("mytodos", [
    "createdAt",
    "desc",
  ]);
  const { documents: history, error } = Collection("history", [
    "createdAt",
    "desc",
  ]);

  const { deleteDocument, response } = Firestore("history");
  const { deleteDocument: deleteTODO, response: todoResponse } =
    Firestore("mytodos");
  const { deleteDocument: deleteActivity, response: activityResponse } =
    Firestore("activities");

  const handleRemoveMyTimingsAndStartAgain = () => {
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

      toast.success("You have selected the option to clean all data from DB. Action was successfully completed");
    } else {
      toast.error(error + " " + todoError + " " + activityError);
    }
  };
  return (
    <div className="container">
      <div className="d-flex flex-column justify-content-center">
      </div>
    <h6 className="fw-bold heading my-3">
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Remove all data and start again:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {" "}
          <button
      // className="removedata-all-btn py-1 px-2 bg-danger text-light rounded border-1"
            className="removedata-all-btn bg-warning"
      onClick={handleRemoveMyTimingsAndStartAgain}
    >
      Remove all my timings and start again
          </button>
           {/* add icon for delete */}
          <DeleteIcon></DeleteIcon>
    </h6>
    </div>
  );
};

export default DeteleAllDataContainer;

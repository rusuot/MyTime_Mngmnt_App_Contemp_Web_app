// set imports for Collection - DB stuff & react & file used
import OneHistoryList from "components/History/OneHistoryList";
import { Collection } from "authReactH/Collection";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";

const History = () => {
  const { documents: activities, error: activitiesError } = Collection(
    "activities",
    ["createdAt", "desc"]
  );
  const { documents: mytodos, error } = Collection("mytodos", [
    "createdAt",
    "desc",
  ]);
  const [filter, setfilter] = useState({
    activity: "#all",
    todo: "all",
  });

  const handleChange = (e) => {
    setfilter({ ...filter, [e.target.name]: e.target.value });
  };
  return (
    <div className="onehistory-page">
      {error && toast.error(error)}
      {activitiesError && toast.error(activitiesError)}
      <h2 className="m-1 fw-bold text-center mb-3 mb-sm-4">History</h2>
      <div className="d-flex  flex-row bd-highlight mb-3">
        <Form.Group>
          <Form.Select
            onChange={(e) => handleChange(e)}
            name="activity"
            className="py-2"
          >
            <option value={"#all"}>Check Activity</option>
            <option value={"freetime"} idx={"01"}>
              FreeHours
            </option>
            <option value={"time_invested_or_reserved"} idx={"00"}>
            RealBurnedHours
            </option>
            {activities?.map((activity, idx) => {
              return (
                <option value={activity.code} key={idx}>
                  {activity.description}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Select
            onChange={(e) => handleChange(e)}
            name="todo"
            className="py-2"
          >
            <option value={"all"}>Check MyTODOs</option>
            <option value={"RegisterMyTime"}>RegisterMyTime</option>
            {mytodos?.map((todo, idx) => {
              return (
                <option value={todo.title} key={idx}>
                  {todo.title}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>
      </div>


      <OneHistoryList filter={filter} />
    </div>
  );
};

export default History;

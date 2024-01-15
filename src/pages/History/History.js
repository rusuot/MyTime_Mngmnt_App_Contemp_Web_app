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
      <h2 className="m-0 fw-bold text-center mb-3 mb-sm-4">History</h2>
      <div className="d-flex justify-content-between align-items-center gap-2 mb-2">
        <Form.Group>
          <Form.Select
            onChange={(e) => handleChange(e)}
            name="activity"
            className="py-2"
          >
            <option value={"#all"}>All Activity</option>
            <option value={"#yourfreehours"} idx={"01"}>
              FreeHours
            </option>
            <option value={"#realspenthours"} idx={"00"}>
            RealSpentHours
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
            <option value={"all"}>All MyTODOs</option>
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

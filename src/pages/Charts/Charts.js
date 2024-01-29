// import Collection for DB stuff
import { Collection } from "authReactH/Collection";
// & react
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
// & needed files
import TimingPieChart from "./TimingPieChart";
import PieChartData from "./PieChartDataLogic";


// function getRandomColor() {
//   var letters = '0123456789ABCDEF'.split('');
//   var color = '#';
//   for (var i = 0; i < 6; i++ ) {
//       color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// }

const Charts = () => {
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

  const { isLoading, freeData, burnedData, options, docLength } =
  PieChartData(filter);

  console.log(burnedData);
  return (
    <div className="charts-container">
      <div className="charts-page">
        {error && toast.error(error)}
        {activitiesError && toast.error(activitiesError)}
        {/* <h1 className="mb-4 text-center">Time Management Charts</h1> */}
        {isLoading ? (
          <div className="text-center fw-bold bg-light rounded py-2 max-w-800">
            {/* set the color for Loading popup */}
            Loading..
          </div>
        ) : docLength === 0 ? (
          <div className="text-center fw-bold bg-light rounded py-2 max-w-7800">
            No History found to generate Graph.
          </div>
        ) : (
          <>
            <div className="charts-page-options justify-content-between align-items-center gap-2 mb-2">
            <h1 className="mb-4 text-center">Time Management Charts</h1>
              <Form.Group>
                <Form.Select
                  onChange={(e) => handleChange(e)}
                  name="activity"
                  className="py-2"
                >
                  <option value={"#all"}>Select My Activity Data (default: see all)</option>

                  <option value={"time_invested_or_reserved"} idx={"00"}>
                  RealburnedHours
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
                  <option value={"all"}>Select MyTODOs data (default: see all)</option>
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
            <div className="mb-3 graph">
            <h5> Chart: Actually scheduled and burned hours</h5>
              <TimingPieChart data={burnedData} options={options} type={"pie"} 
              />
            </div>
            <div className="graph">
            <h5> Check your estimated free time: </h5>
              <TimingPieChart data={freeData} options={options} type={"pie"} 
              />

            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Charts;

// import Collection for DB, react & used pages
import { Collection } from "authReactH/Collection";
import React, { useState } from "react";
import { toast } from "react-toastify";
import TODO from "./TODO";
import UpdateTODO from "./UpdateTODO";

const TODOList = ({ filterActivity }) => {
  const { documents, error } = Collection("mytodos", ["createdAt", "desc"]);
  const [showTODOModal, setShowTODOModal] = useState(false);
  const [data, setData] = useState({});

  return (
    <>
      {/* <div className={"mytodos mb-4"}> */}
      <div className={"scroll-container-todo"}>
      <div className={"home .mytodos .todo"}>
      
        {error && toast.error(error)}
        {!documents ? (
          <div className="text-center text-dark bg-light p-2 rounded w-100">
            Loading..
          </div>
        ) : documents.length > 0 ? (
          documents.map((todo, idx) => {
            if (!filterActivity || filterActivity === "#all") {
              return (
                <><TODO
                  key={idx}
                  data={todo}
                  onClick={() => {
                    setData(todo);
                    setShowTODOModal(true);
                  } } />
                  <li key={idx + 1}>
                    Item number: {idx + 1}
                  </li></>
              );
            } else if (filterActivity === todo.activity) {
              return (
                <><TODO
                  key={idx}
                  data={todo}
                  onClick={() => {
                    setData(todo);
                    setShowTODOModal(true);
                  } } />
                  <li key={idx + 1}>
                    Item number: {idx + 1}
                  </li></>
              );
            } else {
              return <></>;
            }
          })
        ) : (
          <div className="text-center text-dark bg-light p-2 rounded w-100 fw-bold">
            There are no TODO tasks in activity/class selected.
          </div>
        )}
      </div>


      </div>

      <UpdateTODO
        show={showTODOModal}
        handleClose={() => setShowTODOModal(false)}
        todo={data}
      />
    </>
  );
};

export default TODOList;

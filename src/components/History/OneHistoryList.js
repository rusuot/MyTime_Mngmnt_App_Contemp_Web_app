import React, { useState } from "react";
import OneHistory from "./OneHistory";
import { toast } from "react-toastify";
import { Collection } from "authReactH/Collection";
import UpdateBurnedHours from "./UpdateBurnedHours";
import UpdateFreeHours from "./UpdateFreeHours";


const OneHistoryList = ({ filter }) => {
  const { documents, error } = Collection("history", [
    "createdAt",
    "desc",
  ]);

  const [showUpdateBurnedHours, setShowUpdateBurnedHours] = useState(false);
  const [showUpdateFreeHours, setShowUpdateFreeHours] = useState(false);
  const [data, setData] = useState({});

  let scrollHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  );

  const HistComp = ({ idx, onehistory }) => {
    return (
      <
        OneHistory
        key={idx}
        data={onehistory}
        onClick={() => {
          setData(onehistory);
          onehistory.activity === "#yourfreehours"
            ? setShowUpdateFreeHours(true)
            : setShowUpdateBurnedHours(true);
        }}
      />
    );
  };

  return (
    <>
      <div className="scroll-container">
        {error && toast.error(error)}
        {!documents ? (
          <div className="text-center">Loading..</div>
        ) : documents?.length > 0 ? (
          documents.map((onehistory, idx) => {
            if (
              !filter ||
              (filter?.activity === "#all" && filter?.todo === "all")
            ) {
              // <ul>
              return <HistComp key={idx} onehistory={onehistory} />;
              // </ul>
            } else if (
              (filter.activity === "#all" ||
                filter.activity === onehistory.activity) &&
              (filter.todo === "all" || filter.todo === onehistory.todo)
            ) {
              return <HistComp key={idx} onehistory={onehistory} />;
            } else {
              return <></>;
            }
          }
          )
        ) : (
          <div className="text-center fw-bold">No History.</div>
        )}
      </div>
      <UpdateFreeHours
        show={showUpdateFreeHours}
        handleClose={() => setShowUpdateFreeHours(false)}
        onehistory={data}
      />

      <UpdateBurnedHours
        show={showUpdateBurnedHours}
        handleClose={() => setShowUpdateBurnedHours(false)}
        onehistory={data}
      />
    </>
  );
};

export default OneHistoryList;

// react imports
import Moment from "react-moment";
import React from "react";

const OneHistory = ({
  data: { description, amount, todo, activity, createdAt }, onClick,
}) => {
  return (
    <div className="hist-todo  px-1" onClick={() => onClick()} >
      <div className="d-flex flex-column w-100">
        <h6 className="fw-bold heading my-3">
        <span>
        {activity === "#yourfreehours" ? <h5> You have added some free hours!!!</h5> : <h5> Scheduled/Burned hours </h5>}

      </span>

          {  

            <Moment format="'LL'">
              {createdAt.toDate()}
            </Moment>
          }
          <span
          
            className={
              "ms-1 fw-bold " +
              (activity === "#yourfreehours" ? "text-success"  : "text-danger")
            }
          >
            <h5> In your activity: {activity}</h5>
            {/* {activity} */}
            <h6
            className={
              "m-0 ms-auto fw-bold " +
              (activity === "#yourfreehours" ? "text-success" : "text-danger")
            }
          >
            {(activity === "#yourfreehours" ? "added" : "scheduled OR burned") + ' '+ ` ${amount} hours `}
          </h6>
          </span>
        </h6>


        <div className="d-flex align-items-center">
          <p className="trans-description m-0">
            {description.length >= 45 ? (
              <>
                {description.substring(0, 45)}<span className="text-secondary">...</span>
              </>
            ) : (
              <h5> More exactly set on: {description}</h5>
              // description
            )}
          </p>
        </div>
        <p className="hist-todo m-0 text-secondary">
          ~
          {todo.length >=
          35 ? (
            <>
              {todo.toLowerCase().substring(0, 25)}<span className="text-secondary">...</span>
            </>
          ) : (
            todo.toLowerCase()
          )}
        </p>
      </div>
    </div>
  );
};

export default OneHistory;

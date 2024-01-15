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
        {activity === "#yourfreehours" ? <h5> Here you have added free hours</h5> : <h5> Scheduled/Burned hours </h5>}
      </span>



          <span
            className={
              "ms-1 fw-bold " +
              (activity === "#yourfreehours" ? "text-success bg-info"  : "text-secondary bg-info")
            }
          >
            <h5> In your activity: {activity}</h5>
            <h6
            className={
              "m-0 ms-auto fw-bold " +
              (activity === "#yourfreehours" ? "text-success bg-info" : "text-secondary bg-info")
            }
          >
            {(activity === "#yourfreehours" ? "Hours added:" : "Hours burned or scheduled:") + ' '+ ` ${amount}`}
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
              <h5> More exactly set: {description} at {  
// add time for this from db
                <Moment format="'LL'">
                  {createdAt.toDate()}
                </Moment>
                }</h5>
              
            )}
                      
          </p>
        </div>
        <p className="hist-todo m-0 text-primary">
          TypeOfSelection---
          {todo.length >=
          35 ? (
            <>
              {todo.substring(0, 35)}<span className="text-primary">...</span>
            </>
          ) : (
            todo
          )}
        </p>
      </div>
    </div>
  );
};

export default OneHistory;

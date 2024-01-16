// react imports
import Moment from "react-moment";
import React from "react";



const OneHistory = ({

  data: { description, amount, todo, activity, createdAt }, onClick,
}) => {
  return (
    <div className="hist-todo  px-1" onClick={() => onClick()} >
      <div className="text-end">
        <h6 className="text-end">
        <span>
        {activity === "freetime" ? <h5 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        Here you have added free hours</h5> : <h5 > &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        Scheduled/Burned hours </h5>}
      </span>

          <span
            className={
              "text-end" +
              (activity === "freetime" ? "text-success bg-info"  : "text-secondary bg-info")
            }
          >
            <h5> In your activity: {activity}</h5>
            <h6
            className={
              "m-0 ms-auto fw-bold " +
              (activity === "freetime" ? "text-success bg-info" : "text-secondary bg-info")
            }
          >
            {(activity === "freetime" ? "Hours added:" : "Hours burned or scheduled:") + ' '+ ` ${amount}`}
          </h6>
          </span>
        </h6>

        <div className="text-end">
          <p className="text-end">
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
                } 
                </h5>
              
            )}
        <h6 className="text-end"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         Selection Type: &nbsp;&nbsp;&nbsp;
          {todo.length >= 45 ? (
            <>
            <>
              {todo.substring(0, 45)}<span className="text-end">...</span>
              </>
            </>
          ) : (
            todo
          )}
        </h6>   
          </p>
        </div>
      </div>
    </div>
  );
};

export default OneHistory;

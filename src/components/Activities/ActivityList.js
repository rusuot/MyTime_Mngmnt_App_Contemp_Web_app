// firebase imports & react & js logic
import { Collection } from "authReactH/Collection";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Activity from "./Activity";

import UpdateActivity from "./UpdateActivity";
import {useNavigate} from "react-router-dom";
// import myFunction from "pages/Search/Search2";



const ActivityList = () => {
  // set constants
  const [displayActivity, setActivity] = useState(false);
  const [data, setData] = useState(false);
  // set firebase constants
  const { documents, error } = Collection("activities", [
    "createdAt",
    "desc",
  ]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();



// const handleSubmit = (e) => {
// e.preventDefault();
// // navigate(`/search?name=${search}`);

// // setSearch("");
// document.getElementById("text_box").onkeyup = function() {myFunction()};

// }


// what to return
  return (
    <>
      <div className={"activity-list mb-4"}>

        {/* <form onSubmit={handleSubmit} >
          <input
          type="text"
          placeholder="Search onsubmit"
          id="myInput"
          />
        </form> */}

      <div className="scroll-container">
        {error && toast.error(error)}
        
        {!documents ? (
          <div className="text-center text-dark bg-light p-2 rounded w-100">
            Loading..
          </div>
          
        ) : documents.length > 0 ? (
          documents.map((activity, idx) => {
            // returning documents list from firebase 
            return (
              <>
{/* 
<body>
        <div id="container">
        <div id="search">
            <label for="searchInput">Find <i class="fa fa-search"></i>Friends</label>
            <input id="searchInput" type="text" placeholder="Search"></input>
        </div>
        
        <ul id="results">
            <li class="name">Bob</li>
            <li class="name">Kate</li>
            <li class="name">Cindy</li>
            <li class="name">Kelly</li>
            <li class="name">Frank</li>
            <li class="name">Joe</li>
            <li class="name">Malaysia</li>
            <li class="name">Brittney</li>
            <li class="name">Mike</li>
            <li class="name">Julian</li>
            <li class="name">David</li>
            <li class="name">Fred</li>
            <li class="name">Jason</li>   
        </ul>
        
     </div>
    <script src="Search2.js"></script>
    </body>  */}


              <Activity
              // ActivitymyFunction
                key={idx}
                data={activity}
                onClick={() => {
                  setData(activity);
                  setActivity(true);
                } }
                />

                <ul id="myUL">
                <li key={idx + 1}> Item number: {idx + 1} </li>
                <li key={activity.id}>{activity.description}</li>
                <li > Item description: {activity.description} </li>
                </ul>

                </>

                          
            );
          })
        ) : (
          <div className="text-center text-dark bg-light p-2 rounded w-100 fw-bold">
            There is no Activity found, please insert at least one!
          </div>
        )}
        
      </div>
      </div>

{/* 
<script src='Search2.js'>

</script> */}



      {/* <script src='Search2.js'>
      </script> */}

{/* call for update an activity */}
      <UpdateActivity
        show={displayActivity}
        handleClose={() => setActivity(false)}
        activity={data}
      />
    </>
  );
};

export default ActivityList;

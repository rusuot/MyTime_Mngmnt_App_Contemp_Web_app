// import Collection - DB stuff
import { Collection } from "authReactH/Collection";

export const ComputeTiming = () => {
  const { documents } = Collection("history", ["createdAt", "desc"]);

  const { documents: mytodos } = Collection("mytodos", ["createdAt", "desc"]);

  // initialize with 0 hours by default -variable declaration)
  // current & free & real spend or burned hours


// variable declaration (initialize with default 0) the remained hours (free - burned)
  let currentAvailableHours = 0;
// variable declaration (initialize with default 0) the free hours
  let freehoursAvailableHours = 0;
// variable declaration (initialize with default 0) the burned hours
  let realburnedhoursAvailableHours = 0;

  documents?.forEach((doc) => {
    if (doc.activity === "freetime") {
      // addition assignment for free hours
      freehoursAvailableHours += parseInt(doc.amount);
    } else {
      if (doc.todo === "todo_task_not_set") {
        // addition assignment for burned  hours
        realburnedhoursAvailableHours += parseInt(doc.amount);
      }
    }
  });

  currentAvailableHours = freehoursAvailableHours - realburnedhoursAvailableHours;

  mytodos?.forEach((todo) => {
  // substraction assignment for mngmntAmount. 
  // mngmntAmount represents the amount of hours scheduled for a TODO
    currentAvailableHours -= parseInt(todo.mngmntAmount);
    // addition assignment for burned hours / scheduled for a TODO 
    realburnedhoursAvailableHours += parseInt(todo.mngmntAmount);
  });

  return { freehoursAvailableHours, realburnedhoursAvailableHours, currentAvailableHours };
};

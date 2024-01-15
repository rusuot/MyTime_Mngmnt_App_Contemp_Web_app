import { Collection } from "authReactH/Collection";

export const ComputeTiming = () => {
  const { documents } = Collection("history", ["createdAt", "desc"]);

  const { documents: mytodos } = Collection("mytodos", ["createdAt", "desc"]);

  // initialize with 0 hours by default
  // current & free & real spend or burned hours
  let currentAvailableHours = 0;
  let freehoursAvailableHours = 0;
  let realburnedhoursAvailableHours = 0;

  documents?.forEach((doc) => {
    if (doc.activity === "#yourfreehours") {
      freehoursAvailableHours += parseInt(doc.amount);
    } else {
      if (doc.todo === "no-todo") {
        realburnedhoursAvailableHours += parseInt(doc.amount);
      }
    }
  });

  currentAvailableHours = freehoursAvailableHours - realburnedhoursAvailableHours;

  mytodos?.forEach((todo) => {
    currentAvailableHours -= parseInt(todo.mngmntAmount);
    realburnedhoursAvailableHours += parseInt(todo.mngmntAmount);
  });

  return { freehoursAvailableHours, realburnedhoursAvailableHours, currentAvailableHours };
};

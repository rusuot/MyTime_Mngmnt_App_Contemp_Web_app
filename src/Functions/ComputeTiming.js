import { Collection } from "authReactH/Collection";

export const ComputeTiming = () => {
  const { documents } = Collection("history", ["createdAt", "desc"]);

  const { documents: mytodos } = Collection("mytodos", ["createdAt", "desc"]);

  let freehoursAvailableHours = 0;
  let realspenthoursAvailableHours = 0;
  let currentAvailableHours = 0;

  documents?.forEach((doc) => {
    if (doc.activity === "#yourfreehours") {
      freehoursAvailableHours += parseInt(doc.amount);
    } else {
      if (doc.todo === "no-todo") {
        realspenthoursAvailableHours += parseInt(doc.amount);
      }
    }
  });

  currentAvailableHours = freehoursAvailableHours - realspenthoursAvailableHours;

  mytodos?.forEach((todo) => {
    currentAvailableHours -= parseInt(todo.mngmntAmount);
    realspenthoursAvailableHours += parseInt(todo.mngmntAmount);
  });

  return { freehoursAvailableHours, realspenthoursAvailableHours, currentAvailableHours };
};

// firebase collections (containers for firebase documents=units of storage)
// imports
import { useEffect, useRef, useState } from "react";
import { db } from "../Firebase/config";
// 
import {
  query,
  where,
  orderBy,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { useThisAuthContext } from "./AuthContext";


//--> only for eg (firebase website)
// const querySnapshot = await getDocs(collection(db, "users"));
// querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data()}`);
// });

export const Collection = (collectionName, user_history) => {
  // error
  const [error, setError] = useState(null);
  // documents
  const [documents, setDocuments] = useState(null);
  // user
  const { user } = useThisAuthContext();
  //order user
  const user_ordered = useRef(user_history).current;
  //current user logged
  const logged_user = useRef(["user", "==", user.uid]).current;


  useEffect(() => {
    let ref = collection(db, collectionName);

    if (logged_user) {
      // querry where
      ref = query(
        ref, where(...logged_user));}
    if (user_ordered) {
      // querry orderBy
      ref = query(
        ref, orderBy(...user_ordered));}

    const unsubscribe = onSnapshot(
      ref,
      (querySnapshot) => {
        // define empty list for results
        let results = [];
        querySnapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        //set results in documents
        setDocuments(results);
        // 
        setError(null);},

      (error) => {
        console.log(error);
        setError("Error! Hint: Firebase indexes might not be created yet!!! The data can not be fetched. ");
      }

    );

    return () => unsubscribe();
  }, [collectionName, 
    logged_user, 
    user_ordered]);
  return { documents, 
    error };
};
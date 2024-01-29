  // References used for learning:
  // https://react.dev/reference/react/useReducer
  // https://stackoverflow.com/questions/71564914/firebase-updating-documents-delayed-by-one-onclick-event

// setting imports (react and firebase)
import { useThisAuthContext } from "./AuthContext";
import { db, timestamp } from "../Firebase/config";
import {
  query,
  where,
  getDoc,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  collection,
  doc,
} from "firebase/firestore";
import { useState, useEffect, useReducer } from "react";

let DefaultState = {
  // State is Pending to be set on boolean false and null for error, success & document
  isPending: false,
  document: null,
  success: null,
  error: null,
};

// firestoreReducer logic
const firestoreReducer = (
  state, action
  ) => {
    // switch case mechanism (6 cases)
  switch (action.type) {
        // search document
        case "SEARCH_A_DOCUMENT":
          return {
            isPending: false,
            document: action.payload,
            success: true,
            error: null,
          };
    // get document
    case "GET_A_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    // add document
    case "ADD_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    // delete document
    case "DELETE_DOCUMENT":
      return {
        isPending: false,
        document: null,
        success: true,
        error: null,
      };
    // update document
    case "UPDATE_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
        };
    // state is pending
    case "IS_PENDING":
      return { isPending: true, document: null, success: false, error: null };
    // error case
    case "ERROR":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };


    default:
      return state;
  }
};


export const Firestore = (firestoreCollection) => {
  // References:
  // https://react.dev/reference/react/useReducer
  // https://stackoverflow.com/questions/71564914/firebase-updating-documents-delayed-by-one-onclick-event
  const { user } = 
  useThisAuthContext();
  const [isCancelled, setIsCancelled] = 
  useState(false);
  const [response, dispatch] = 
  useReducer(firestoreReducer, DefaultState);

  const ref = collection(db, firestoreCollection);
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // logic for: add a document logic
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await addDoc(ref, {
        ...doc,
        createdAt,
        user: user.uid,
      });
      dispatchIfNotCancelled({
        type: "ADD_DOCUMENT",
        payload: addedDocument,
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  // logic for: get a document
  const getDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const q = query(ref, where("id", "==", id))
      const querySnapshot = await getDoc(q);
      const retrievedDocument = querySnapshot.data()

      console.log(retrievedDocument)
      dispatchIfNotCancelled({
        type: "GET_A_DOCUMENT",
        payload: retrievedDocument,
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
      console.log(err)
    }
  };

  // logic for: search a document
  const searchDocument = async (name) => {
    console.log("JS Firestore page *****");
    dispatch({ type: "IS_PENDING" });

    try {
      // const q = query(ref, where("name", "==", name))
      // const q = query(ref, where("name", 'array-contains-any', name))
      const q = query(ref, where("name", "==", name).get())
      console.log("query to be run is:", q);
      // used getDocs (plural) to get more that one single doc

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {

        console.log(doc.id, " => ", doc.data());
      });



      // const querySnapshot = await getDocs(q);
      // 
// querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   console.log(doc.name, " => ", doc.data());
// });

//

      const retrievedDocument = querySnapshot

      console.log(retrievedDocument)
      dispatchIfNotCancelled({
        type: "SEARCH_A_DOCUMENT",
        payload: retrievedDocument,
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
      console.log(err)
    }
  };




  // logic for: update a document
  const updateDocument = async (newdoc, id) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const updatedAt = timestamp.fromDate(new Date());
      const docRef = doc(db, firestoreCollection, id);
      const updatedDocument = await updateDoc(docRef, { ...newdoc, updatedAt });

      dispatchIfNotCancelled({
        type: "UPDATE_DOCUMENT",
        payload: updatedDocument,
      });
    } catch (err) {
      dispatchIfNotCancelled({
        type: "ERROR",
        payload: err.message,
      });
    }
  };

  // logic for: delete a document
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const docRef = doc(
        db, firestoreCollection, id);
      const deletedDocument = await deleteDoc(docRef);
      dispatchIfNotCancelled({
        type: "DELETE_DOCUMENT",
        payload: deletedDocument,
      });
    } catch (err) {
      dispatchIfNotCancelled({
        type: "ERROR",
        payload: err.message,
      });
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { 
    getDocument, 
    addDocument, 
    updateDocument, 
    deleteDocument, 
    searchDocument,
    response 
  };
};

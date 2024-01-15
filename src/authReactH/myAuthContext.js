//  references:  https://stackoverflow.com/questions/74572278/firebase-authentication-using-contextapi-and-usereducer-hook

// imports for firebase and react
import { auth } from "../Firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useReducer, createContext} from "react";


// let isAuthReady = false
// firebase.auth().onAuthStateChanged((user) => {
//   store.commit('setUser', user)

//   if (!isAuthReady) {
//     isAuthReady = true
//     init()
//   }
// })

export const authReducer = (state, action) => {
  switch (action.type) {
    case "IS_AUTH_READY":
      return { ...state, user: action.payload, isAuthReady: true };
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };

    default:
      return state;
  }
};

export const GlobalContext = createContext();
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthReady: false,
  });

  useEffect(() => {
    // checking if any user is logged in
    const unsub = onAuthStateChanged(auth, (user) => {
      dispatch({ type: "IS_AUTH_READY", payload: user });
      unsub();
    });
  }, []);

  return (
    <GlobalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

// ref for info
// https://medium.com/@yildizfatma/building-a-user-login-screen-with-react-native-and-firebase-80ccb78e66ca

import { useEffect, useState } from "react";
import { useThisAuthContext } from "./AuthContext";
import { auth } from "../Firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

export const doLogin = () => {
  const [isStopped, setIsStopped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useThisAuthContext();

  // ref for info:  https://stackoverflow.com/questions/67851779/handling-errors-when-firebase-auth-in-different-file
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    // user login auth, pass & email
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      // logout user using dispatch
      dispatch({ 
        type: "LOGIN", 
        payload: user });

      // set loading on false and error on null for user update
      // if state is diff than stopped
      // this logic is used for logout and signup.
      if (!isStopped) {
        setIsLoading(false);
        setError(null);
      }
    } catch (err) {
      if (!isStopped) {
        setIsLoading(false);
        setError(null);
        setError(err.message);
        setIsLoading(false);
      }

      return err.message
    }
  };
  
  //set login is stopped
  useEffect(() => {
    return () => setIsStopped(true);
  }, []);

  return { login, isLoading, error };
};

// firebase and react imports
import { useEffect, useState } from "react";
import { useThisAuthContext } from "./AuthContext";
import { auth } from "../Firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export const userSignup = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useThisAuthContext();
  const [isStopped, setIsStopped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!user) {
        throw new Error("An error was encountered while signup user!");
      }

      await updateProfile(user, { displayName });
      dispatch({ type: "LOGIN", payload: user });
      // similar logic for login/logout/signup
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
  useEffect(() => {
    return () => setIsStopped(true);
  }, []);
  return { error, signup, isLoading };
};
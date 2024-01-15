// ref for info
//  quite similar to login for logout also
// https://medium.com/@yildizfatma/building-a-user-login-screen-with-react-native-and-firebase-80ccb78e66ca
//  imports for react & firebase stuff
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../Firebase/config";
import { signOut } from "firebase/auth";
import { useThisAuthContext } from "./AuthContext";

export const Logout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const { dispatch } = useThisAuthContext();
  const [error, setError] = useState(null);

  // ref for info:  https://stackoverflow.com/questions/67851779/handling-errors-when-firebase-auth-in-different-file

  const logout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await signOut(auth);
      dispatch({ type: "LOGOUT" });
      if (!isStopped) {
        setIsLoading(false);
        setError(null);
      }

    toast.success("User logged out successfully!")

    } catch (err) {
            // similar logic for login/logout/signup
      if (!isStopped) {
        setIsLoading(false);
        setError(null);
        setError(err.message);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsStopped(true);
  }, []);

  return { logout, isLoading, error };
};

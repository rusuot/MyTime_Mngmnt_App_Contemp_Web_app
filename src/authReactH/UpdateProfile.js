// firebase and react imports
import { useState } from "react";
import { updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { useThisAuthContext } from "./AuthContext";


export const ThisUpdateProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useThisAuthContext();

  const UpdateProfile = async ({ email, password, displayName }) => {
    setIsLoading(true);

    try {
      // if displayName exists, update user displayName
      if (displayName) {
        await updateProfile(user, { displayName });
      }
      // if email exists, update user email
      if (email) {
        await updateEmail(user, email);
      }
      // if pass exists, update user pass
      if (password) {
        await updatePassword(user, password);
      }

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);

      return err.message;
    }
  };
// return update & isLoading state
  return { UpdateProfile, isLoading };
};

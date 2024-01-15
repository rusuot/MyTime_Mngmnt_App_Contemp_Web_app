// imports react & auth context
import { useContext } from "react";
import { GlobalContext } from "./myAuthContext";

//return auth_context
export const useThisAuthContext  = () => {
    // useThisAuthContext for next eg of calls: const { isAuthReady, user } = useThisAuthContext();
    const auth_context = useContext(GlobalContext)
    if (!auth_context) {
        // raise error
        throw Error ('useAuthContext must be inside GlobalProvider ! ')
    }

    return auth_context
}
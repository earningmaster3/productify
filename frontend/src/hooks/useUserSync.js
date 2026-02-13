import { useAuth, useUser } from "@clerk/clerk-react";
import { syncUser } from "../lib/api";
import { useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";

const useUserSync = () => {

    const { isSignedIn } = useAuth();

    const { mutate, isLoading, error } = useMutation({
        mutationFn: syncUser,
        onSucess: (data) => {
            console.log("User synced successfully:", data);
        }
    })

    useEffect(() => {
        if (isSignedIn ) {
            mutate();
        }
    }, [isSignedIn])
    return { isLoading, error };
}

export default useUserSync;
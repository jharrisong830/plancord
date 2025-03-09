import { useContext } from "react";
import FirebaseAuthContext from "../../contexts/FirebaseAuthContext";
import { Navigate } from "react-router";

/** renders child props only if there is an authenticated user currently logged in, otherwise we redirect to the login route */
export default function AuthRoute({
    children
}: {
    children: React.JSX.Element;
}) {
    const auth = useContext(FirebaseAuthContext);

    if (auth?.currentUser === null) {
        return <Navigate to="/login" />;
    } else {
        return children;
    }
}

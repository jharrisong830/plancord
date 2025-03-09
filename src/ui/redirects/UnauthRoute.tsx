import { useContext } from "react";
import FirebaseAuthContext from "../../contexts/FirebaseAuthContext";
import { Navigate } from "react-router";

/** renders child props only if there is no user currently logged in, otherwise we redirect to the home page route */
export default function AuthRoute({
    children
}: {
    children: React.JSX.Element;
}) {
    const auth = useContext(FirebaseAuthContext);

    if (auth?.currentUser === null) {
        return children;
    } else {
        return <Navigate to="/" />;
    }
}

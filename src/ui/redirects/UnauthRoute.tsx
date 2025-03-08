import { Navigate } from "react-router";
import firebaseAuth from "../../firebase/auth";

/** renders child props only if there is no user currently logged in, otherwise we redirect to the home page route */
export default function AuthRoute({
    children
}: {
    children: React.JSX.Element;
}) {
    const auth = firebaseAuth();

    if (auth.currentUser === null) {
        return children;
    } else {
        return <Navigate to="/" />;
    }
}

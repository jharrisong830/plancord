import { useContext } from "react";
import FirebaseAuthContext from "../../contexts/FirebaseAuthContext";
import LoginView from "../LoginView";

/** renders child props only if there is an authenticated user currently logged in, otherwise we show the login screen */
export default function AuthRoute({
    children
}: {
    children: React.JSX.Element;
}) {
    const { authState } = useContext(FirebaseAuthContext)!;
    const { isAuth } = authState;

    if (isAuth) {
        return children;
    }
    return <LoginView />;
}

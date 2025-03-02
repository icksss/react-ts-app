import { useSelector } from "react-redux";
import { RootState } from "../stores/reducer";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const isLoggedIn = useSelector((state: RootState)   => state.user.isLoggedIn);
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;

}

export default PrivateRoute;


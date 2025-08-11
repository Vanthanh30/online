import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const isAdmin = user?.role === "admin";

    return isAdmin ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default PrivateRoute;
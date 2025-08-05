import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
    const user = JSON.parse(localStorage.getItem('user'));
    const isAdmin = user ? user.role === 'admin' : false;
    return isAdmin ? <Outlet /> : <Navigate to="/admin/login" />;
}

export default PrivateRoute;

import LayoutDefault from "../pages/client/layoutDefault/index";
import Home from "../pages/client/home_pages/homepage";
import Login from "../pages/client/auth/login";
import LoginAdmin from "../pages/admin/auth/login";
import AdminPrivateRoute from "../components/AdminPrivateRoute/index";
import AdminLayout from "../pages/admin/layoutDefault/index";
import Dashboard from "../pages/admin/dashboard/index";

export const routes = [
    {
        path: "/",
        element: <LayoutDefault />,
        children: [
            {
                index: true, // "/" => Home
                element: <Home />,
            },
            {
                path: "login", // "/login"
                element: <Login />,
            }
        ]
    },
    {
        path: "/admin",
        children: [
            {
                path: "login", // "/admin/login"
                element: <LoginAdmin />,
            },
            {
                element: <AdminPrivateRoute />, // bảo vệ khu vực admin
                children: [
                    {
                        element: <AdminLayout />, // layout admin
                        children: [
                            {
                                index: true, // "/admin"
                                element: <Dashboard />,
                            },
                        ]
                    }
                ]
            }
        ]
    }
];

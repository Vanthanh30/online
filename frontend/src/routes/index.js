
import LayoutDefault from "../pages/client/layoutDefault/index";
import Home from "../pages/client/home_pages/homepage";
import Login from "../pages/client/auth/login";
import LoginAdmin from "../pages/admin/auth/login";
import PrivateRoute from "../components/privateRoute";
import Dashboard from "../pages/admin/dashboard/dashboard";
import LayoutDefaultAdmin from "../pages/admin/layouDefault";

export const routes = [
    {
        path: "/",
        element: <LayoutDefault />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            }
        ]
    },
    {
        path: "/admin",
        children: [
            {
                path: "login",
                element: <LoginAdmin />,
            },
            {
                element: <PrivateRoute />,
                children: [
                    {
                        element: <LayoutDefaultAdmin />,
                        children: [
                            {
                                index: true,
                                element: <Dashboard />,
                            }
                        ]
                    }
                ]
            }
        ]
    }
]
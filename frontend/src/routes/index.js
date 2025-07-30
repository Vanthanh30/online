
import LayoutDefault from "../pages/client/layoutDefault/index";
import Home from "../pages/client/home_pages/homepage";
import Login from "../pages/client/auth/login";
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
                index: "/login",
                element: <Login />,
            }
        ]
    }
]
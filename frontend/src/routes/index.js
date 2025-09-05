import LayoutDefault from "../pages/client/layoutDefault/index";
import Home from "../pages/client/home_pages/homepage";
import Login from "../pages/client/auth/login";
import LoginAdmin from "../pages/admin/auth/login";
import AdminPrivateRoute from "../components/AdminPrivateRoute/index";
import AdminLayout from "../pages/admin/layoutDefault/index";
import Dashboard from "../pages/admin/dashboard/index";
import Categories from "../pages/admin/categories/index";
import Courses from "../pages/admin/course/index";
import AddCourse from "../pages/admin/course/addCourse";
import Accounts from "../pages/admin/accounts/index";
import CreateAccounts from "../pages/admin/accounts/createAccount";
import EditAccount from "../pages/admin/accounts/editAccount";
import CreateCategory from "../pages/admin/categories/createCategory";
import EditCategories from "../pages/admin/categories/editCategory";
import EditCourse from "../pages/admin/course/editCourse";
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
        path: "/admin/",
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
                            {
                                path: 'categories/',
                                element: <Categories />,
                            },
                            {
                                path: 'categories/create',
                                element: <CreateCategory />,
                            },
                            {
                                path: 'categories/edit/:id',
                                element: <EditCategories />,
                            },
                            {
                                path: 'courses/',
                                element: <Courses />,
                            },
                            {
                                path: 'courses/add',
                                element: <AddCourse />,
                            },
                            {
                                path: 'courses/edit/:id',
                                element: <EditCourse />,
                            },
                            {
                                path: 'accounts/',
                                element: <Accounts />,
                            },
                            {
                                path: 'accounts/create',
                                element: <CreateAccounts />,
                            },
                            {
                                path: 'accounts/edit/:id',
                                element: <EditAccount />,
                            },
                        ]
                    }
                ]
            }
        ]
    }
];

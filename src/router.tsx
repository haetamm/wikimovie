import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import AuthLayout from "./layouts/AuthLayout";
import Profile from "./pages/Profile";

interface RouterConfig {
    path: string;
    element: React.ReactNode;
    children?: RouterConfig[];
}

const routerConfig: RouterConfig[] = [
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/discover" />
            },
            {
                path: "discover",
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />
            }
        ]
    },
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/profile" />
            },
            {
                path: "/profile",
                element: <Profile />
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
];

const router = createBrowserRouter(routerConfig);
export default router;
import { useEffect, FC } from 'react';
import type { LoaderFunctionArgs } from "react-router-dom";
import {
    RouterProvider,
    createBrowserRouter,
    redirect,
} from "react-router-dom";

import { useAppDispatch, useAppSelector } from './hooks';
import { setUserData, setUserToken } from './store/reducers/AuthSlice';
import { getToken } from './utils/localStorage.ts';
import Layout from './components/Layout.tsx';
import NotFound from './pages/NotFound';
import { getUserFromToken } from './utils';
import Loader from './components/Loader';

import './App.css';
import Main from './pages/Main.tsx';
import Users from "./pages/Users.tsx";
import AdminCourses from "./pages/AdminCourses.tsx";
import Courses from "./pages/Courses.tsx";
import Contacts from "./pages/Contacts.tsx";
import About from "./pages/About.tsx";
import Events from "./pages/Events.tsx";
import Event from "./pages/Event.tsx";
import AdminEvents from "./pages/AdminEvents.tsx";
import Course from "./pages/Course.tsx";
import AdminTutors from './pages/AdminTutors.tsx';
import Profile from './pages/Profile.tsx';
import { adminRole, tutorRole } from './constants.ts';

const App: FC = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);


    useEffect(() => {
        const localToken = getToken();
        const userFromToken = getUserFromToken(localToken);

        dispatch(setUserToken(localToken));
        dispatch(setUserData(userFromToken));
    }, []);

    const router = createBrowserRouter([
        {
            id: "root",
            path: "/",
            Component: Layout,
            children: [
                {
                    index: true,
                    Component: Main,
                },
                // {
                //     path: 'users',
                //     Component: Users,
                // },
                {
                    path: 'courses',
                    Component: Courses,
                },

                {
                    path: 'courses/:id',
                    Component: Course,
                },
                {
                    path: 'events',
                    Component: Events,
                },
                {
                    path: 'events/:id',
                    Component: Event,
                },
                {
                    path: 'contacts',
                    Component: Contacts,
                },
                {
                    path: 'about-us',
                    Component: About,
                },
                {
                    path: 'admin-courses',
                    Component: AdminCourses,
                    loader: (request) => protectedByRoleLoader(request, [adminRole, tutorRole]),
                },
                {
                    path: 'admin-events',
                    Component: AdminEvents,
                    loader: (request) => protectedByRoleLoader(request, [adminRole]),
                },
                {
                    path: 'admin-tutors',
                    Component: AdminTutors,
                    loader: (request) => protectedByRoleLoader(request, [adminRole]),
                },
                {
                    path: 'profile',
                    Component: Profile,
                    loader: protectedLoader,
                },
                {
                    path: "*",
                    Component: NotFound,
                },
            ],
        }
    ]);

    function protectedByRoleLoader({ request }: LoaderFunctionArgs, role: string[]) {
        if (user === null || role.includes(user.role)) {
            return null;
        }

        if (user.username) {
            return redirect("/");
        }

        return redirect("/");
    }

    function protectedLoader({ request }: LoaderFunctionArgs) {
        if (user === null || user.username) {
            return null;
        }

        return redirect("/");
    }

    return (
        <RouterProvider router={router} fallbackElement={<Loader />} />
    );
};

export default App;
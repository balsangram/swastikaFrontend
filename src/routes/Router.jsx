import React, { lazy } from 'react'
import ProtectedRoute from '../components/auth/ProtectedRoutes'
import { Navigate } from 'react-router-dom'
import BlankLayout from '../components/Layouts/BlankLayout'
import Login from '../page/auth/Login'
import Home from '../page/Home'

// import Timer from '../page/timer/Timer'
// import TodoList from './page/todo/TodoList';
// import Note from './page/note/Note';
// import Profile from './page/profile/Profile';
// import Notification from './page/notification/Notification';
// import GraphHome from './page/graph/GraphHome';
// import FriendIds from './page/message/FriendIds';
// import ChatPage from './page/groupChart/ChatPage';
// import Register from '../page/auth/Register'
import Loadable from '../components/Layouts/Loadable'

const Timer = Loadable(lazy(() => import('../page/timer/Timer')))
const TodoList = Loadable(lazy(() => import('../page/todo/TodoList')))
const Note = Loadable(lazy(() => import('../page/note/Note')))
const Profile = Loadable(lazy(() => import('../page/profile/Profile')))
const Notification = Loadable(lazy(() => import('../page/notification/Notification')))
const GraphHome = Loadable(lazy(() => import('../page/graph/GraphHome')))
const FriendIds = Loadable(lazy(() => import('../page/message/FriendIds')))
const ChatPage = Loadable(lazy(() => import('../page/groupChart/ChatPage')))
const Register = Loadable(lazy(() => import('../page/auth/Register')))
const Router = [
    {
        path: '/',
        element: <ProtectedRoute />,
        children: [
            { path: 'home', element: <Home /> }, // default page after login
            { path: 'timer', element: <Timer /> },
            { path: 'todoList', element: <TodoList /> },
            { path: 'profile', element: <Profile /> },
            { path: 'notification', element: <Notification /> },
            { path: 'graphHome', element: <GraphHome /> },
            { path: 'chatPage', element: <ChatPage /> },
            { path: 'friendIds', element: <FriendIds /> },
        ],
    },
    {
        path: '/',
        element: <BlankLayout />,
        children: [
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
            { path: '', element: <Navigate to="login" replace /> },
        ],
    },
];


export default Router
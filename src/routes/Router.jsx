import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/auth/ProtectedRoutes';
import BlankLayout from '../components/Layouts/BlankLayout';
import Home from '../page/Home';
import Loadable from '../components/Layouts/Loadable';
import EditNote from '../page/note/EditNote';
import TimeTable from '../page/timeTable/TimeTable';

// Lazy imports
const Timer = Loadable(lazy(() => import('../page/timer/Timer')));
const TodoList = Loadable(lazy(() => import('../page/todo/TodoList')));
const Note = Loadable(lazy(() => import('../page/note/Note')));
const Profile = Loadable(lazy(() => import('../page/profile/Profile')));
const Notification = Loadable(lazy(() => import('../page/notification/Notification')));
const GraphHome = Loadable(lazy(() => import('../page/graph/GraphHome')));
const FriendIds = Loadable(lazy(() => import('../page/message/FriendIds')));
const ChatPage = Loadable(lazy(() => import('../page/groupChart/ChatPage')));
const Login = Loadable(lazy(() => import('../page/auth/Login')));
const Register = Loadable(lazy(() => import('../page/auth/Register')));
const DefaultLayout = Loadable(lazy(() => import('../components/Layouts/DefaultLayout')))

const Router = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      { index: true, element: <Home /> }, // Default route under "/"
      { path: 'timer', element: <Timer /> },
      { path: 'todoList', element: <TodoList /> },
      { path: 'note', element: <Note /> },
      { path: 'profile', element: <Profile /> },
      { path: 'notification', element: <Notification /> },
      { path: 'graphHome', element: <GraphHome /> },
      { path: 'chatPage', element: <ChatPage /> },
      { path: 'friendIds', element: <FriendIds /> },
      { path: 'editNote', element: <EditNote /> },
      { path: 'timeTable', element: <TimeTable /> },
    ],
  },
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];


export default Router;

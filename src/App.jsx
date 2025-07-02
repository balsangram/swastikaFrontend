import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import BlankLayout from '../src/components/Layouts/BlankLayout';
import DefaultLayout from '../src/components/Layouts/DefaultLayout';
// import Home from './page/Home';
import Timer from './page//timer/Timer';
import TodoList from './page/todo/TodoList';
import Note from './page/note/Note';
import Profile from './page/profile/Profile';
import Notification from './page/notification/Notification';
import GraphHome from './page/graph/GraphHome';
import FriendIds from './page/message/FriendIds';
import ChatPage from './page/groupChart/ChatPage';

// Lazy imports (same as your route file)
const Home = React.lazy(() => import('./page/Home'));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          {/* Default Layout Routes */}
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/timer" element={<Timer />} />
            <Route path="/todoList" element={<TodoList />} />
            <Route path="/note" element={<Note />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/graphHome" element={<GraphHome />} />
            <Route path="/chatPage" element={<ChatPage />} />
            <Route path="/friendIds" element={<FriendIds />} />
          </Route>

          {/* Blank Layout Routes */}
          <Route element={<BlankLayout />}>
            {/* <Route path="/signin" element={<SignIn />} />
            <Route path="/forgot-password" element={<ForgotPassword />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import { UserContextProvider } from './context/UserContext';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';

axios.defaults.baseURL = 'http://127.0.0.1:4000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/:subpage?" element={<ProfilePage />} />
        </Route>
      </Routes>
    </UserContextProvider>

  );
}

export default App;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import { UserContextProvider } from './context/UserContext';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import PlacesPage from './pages/PlacesPage';
import AddPlaceForm from './components/AddPlaceForm';

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
          <Route path="/profile/places" element={<PlacesPage />} />
          <Route path="/profile/places/:id" element={<AddPlaceForm />} />
          <Route path="/profile/places/new" element={<AddPlaceForm />} />
        </Route>
      </Routes>
    </UserContextProvider>

  );
}

export default App;

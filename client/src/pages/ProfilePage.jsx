import React, { useContext, useState } from 'react';
import { Navigate, Link, useParams } from 'react-router-dom';

import { UserContext } from '../context/UserContext';
import PlacesPage from './PlacesPage';
import UserProfile from '../components/UserProfile';
import ProfileNav from '../components/ProfileNav';

function ProfilePage() {
  const { user, ready } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = 'profile';
  }

  if (!ready && !user) {
    return <h1>Loading...</h1>;
  }

  if (ready && !user && !redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <ProfileNav />
      {subpage === 'profile' && <UserProfile redirect={redirect} setRedirect={setRedirect} />}
      {subpage === 'places' && <PlacesPage />}
    </div>
  );
}

export default ProfilePage;

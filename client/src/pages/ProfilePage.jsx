import React, { useContext } from 'react';
import { Navigate, Link, useParams } from 'react-router-dom';

import { UserContext } from '../context/UserContext';
import UserProfile from '../components/UserProfile';

function ProfilePage() {
  const { user, ready } = useContext(UserContext);
  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = 'profile';
  }

  if (!ready) {
    return <h1>Loading...</h1>;
  }

  if (ready && !user) {
    return <Navigate to="/login" />;
  }

  function linkClasses(type = null) {
    let classes = 'py-2 px-6';
    const isSelectedPage = type === subpage;
    if (isSelectedPage) {
      classes += ' rounded-full bg-primary text-white';
    }
    return classes;
  }

  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-4">
        <Link to="/profile" className={linkClasses('profile')}>My Profile</Link>
        <Link to="/profile/bookings" className={linkClasses('bookings')}>My Bookings</Link>
        <Link to="/profile/places" className={linkClasses('places')}>My Accomodations</Link>
      </nav>
      {subpage === 'profile' && <UserProfile />}
    </div>
  );
}

export default ProfilePage;

import React, { useContext, useState } from 'react';
import { Navigate, Link, useParams } from 'react-router-dom';

import { UserContext } from '../context/UserContext';
import UserProfile from '../components/UserProfile';

function ProfilePage() {
  const { user, ready } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = 'profile';
  }

  if (!ready) {
    return <h1>Loading...</h1>;
  }

  if (ready && !user && !redirect) {
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
      <nav className="w-full flex justify-center gap-4 my-8">
        <Link to="/profile" className={linkClasses('profile')}>My Profile</Link>
        <Link to="/profile/bookings" className={linkClasses('bookings')}>My Bookings</Link>
        <Link to="/profile/places" className={linkClasses('places')}>My Accomodations</Link>
      </nav>
      {subpage === 'profile' && <UserProfile redirect={redirect} setRedirect={setRedirect} />}
    </div>
  );
}

export default ProfilePage;

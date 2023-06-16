import React, { useContext, useState } from 'react';
import axios from 'axios';

import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function UserProfile({ redirect, setRedirect }) {
  const { user, setUser } = useContext(UserContext);

  async function logOut() {
    await axios.post('/logout');
    setRedirect('/');
    setUser(null);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="text-center max-w-lg mx-auto">
      Logged in as
      {' '}
      {user.name}
      {' '}
      (
      {user.email}
      )
      <button onClick={logOut} type="button" className="primary max-w-sm">
        Log Out
      </button>
    </div>
  );
}

export default UserProfile;

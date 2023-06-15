import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    console.log(user);
    async function setUserState() {
      const { data } = await axios.get('/profile');
      setUser(data);
    }
    if (!user) {
      console.log('Setting user state');
      setUserState();
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      { children }
    </UserContext.Provider>
  );
}

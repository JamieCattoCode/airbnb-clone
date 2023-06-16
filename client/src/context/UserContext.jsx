import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    console.log(user);
    if (!user) {
      axios.get('/profile')
        .then(({ data }) => {
          setUser(data);
          setReady(true);
        })
        .catch((error) => console.log(error))
        .finally(setReady(true));
    }
    console.log(user);
    console.log(ready);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      { children }
    </UserContext.Provider>
  );
}

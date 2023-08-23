import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
    useEffect(() => {
      const token = localStorage.getItem('token');
  
      if (token) {
        fetchMyProfile(token);
      }
    }, [navigate]);
  
    const fetchMyProfile = async (token) => {
      try {
        const response = await fetch('http://localhost:5000/myProfile', {
          headers: {
            authorization: token,
          },
        });
  
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          console.log(userData);
        } else {
          console.error('Error fetching user profile:', response.statusText);
          navigate('/HeaderMegaMenu/SignIn');
        }
      } catch (error) {
        console.error('Error:', error.message);
        navigate('/HeaderMegaMenu/SignIn');
      }
    };
  
    return (
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    );
  }
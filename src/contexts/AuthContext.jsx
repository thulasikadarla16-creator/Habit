import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChange } from '../firebase/auth';
import { getUserData, saveUserData } from '../firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (user) => {
      setUser(user);
      setLoading(false);
      
      if (user) {
        // Load user data from Firestore
        try {
          const data = await getUserData(user.uid);
          setUserData(data);
        } catch (error) {
          console.error('Error loading user data:', error);
          setUserData(null);
        }
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const updateUserData = async (newData) => {
    if (!user) return;
    
    try {
      const updatedData = { ...userData, ...newData };
      await saveUserData(user.uid, updatedData);
      setUserData(updatedData);
    } catch (error) {
      console.error('Error updating user data:', error);
      throw error;
    }
  };

  const value = {
    user,
    userData,
    loading,
    updateUserData,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

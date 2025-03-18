'use client'
import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, onAuthStateChanged } from "../../lib/firebase"; 

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // New state to track loading

  useEffect(() => {
    console.log("AuthProvider Mounted");
    
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log("Auth State Changed:", firebaseUser);
      setUser(firebaseUser);
      setLoading(false); // Stop loading when auth state updates
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

import { createContext, useContext, useState, useEffect } from 'react';

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('userProfile');
    if (saved) return JSON.parse(saved);
    return { name: 'Aditya', state: 'Maharashtra', userType: 'Citizen' };
  });

  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
  }, [profile]);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => useContext(ProfileContext);
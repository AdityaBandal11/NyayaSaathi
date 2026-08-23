import { createContext, useContext, useState, useEffect } from 'react';

const ProfileContext = createContext();

const STORAGE_KEY = 'nyayaSaathiProfile';
const LEGACY_STORAGE_KEY = 'userProfile'; // key used by an earlier draft of the profile feature

export const DEFAULT_PROFILE = {
  name: 'Aditya',
  email: 'aditya@example.com',
  phone: '',
  state: 'Maharashtra',
  language: 'English',
  userType: 'Citizen',
  avatar: '', // no uploaded image in this prototype — components fall back to initials
};

export const GUEST_PROFILE = {
  name: 'Guest User',
  email: '',
  phone: '',
  state: '',
  language: 'English',
  userType: 'Guest',
  avatar: '',
};

function readStoredProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    // Merge with defaults so missing/partial fields never crash the app.
    return { ...DEFAULT_PROFILE, ...parsed };
  } catch {
    // Malformed JSON or localStorage unavailable — fall back to defaults.
    return null;
  }
}

export function getInitials(name) {
  if (!name || typeof name !== 'string') return 'U';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'U';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(() => readStoredProfile() || DEFAULT_PROFILE);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // localStorage unavailable — profile still works for this session
    }
  }, [profile]);

  const updateProfile = (updates) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const setGuestProfile = () => setProfile(GUEST_PROFILE);
  const resetProfile = () => setProfile(DEFAULT_PROFILE);

  const initials = getInitials(profile?.name);

  return (
    <ProfileContext.Provider value={{ profile, setProfile, updateProfile, setGuestProfile, resetProfile, initials }}>
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => useContext(ProfileContext);

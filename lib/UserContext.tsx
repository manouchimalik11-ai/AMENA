"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  city?: string;
}

interface UserCtx {
  user: UserProfile | null;
  loading: boolean;
  login: (u: UserProfile) => void;
  logout: () => void;
}

const UserContext = createContext<UserCtx>({ user: null, loading: true, login: () => {}, logout: () => {} });

export function useUser() { return useContext(UserContext); }

export default function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("amena-user");
      if (raw) setUser(JSON.parse(raw));
    } catch {}
    setLoading(false);
  }, []);

  function login(u: UserProfile) {
    setUser(u);
    localStorage.setItem("amena-user", JSON.stringify(u));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("amena-user");
  }

  return <UserContext.Provider value={{ user, loading, login, logout }}>{children}</UserContext.Provider>;
}

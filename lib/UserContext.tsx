"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface UserProfile {
  name: string;
  email: string;
}

interface UserCtx {
  user: UserProfile | null;
  login: (u: UserProfile) => void;
  logout: () => void;
}

const UserContext = createContext<UserCtx>({ user: null, login: () => {}, logout: () => {} });

export function useUser() { return useContext(UserContext); }

export default function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("amena-user");
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  function login(u: UserProfile) {
    setUser(u);
    localStorage.setItem("amena-user", JSON.stringify(u));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("amena-user");
  }

  return <UserContext.Provider value={{ user, login, logout }}>{children}</UserContext.Provider>;
}

"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

type AuthContextProps = {
  children: ReactNode;
};

export default function AuthContext({ children }: AuthContextProps) {
  return <SessionProvider>{children}</SessionProvider>;
} 
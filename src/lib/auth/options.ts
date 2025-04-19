import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcryptjs";
import { prisma } from "../prisma";

// Add extended Session and User types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
}

// Helper to detect build time vs runtime
const isBuildTime = process.env.NODE_ENV === 'production' && !process.env.VERCEL_ENV;

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Skip DB operations during build
        if (isBuildTime || process.env.SKIP_DB_CONNECT === 'true') {
          console.log("Build-time detected, skipping database operations");
          return null;
        }

        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // For runtime, use the real database
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email
            }
          });
  
          if (!user || !user.password) {
            return null;
          }
  
          const isPasswordValid = await compare(
            credentials.password,
            user.password
          );
  
          if (!isPasswordValid) {
            return null;
          }
  
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          };
        } catch (error) {
          console.error("Error authenticating user:", error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error'
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  debug: process.env.NODE_ENV === "development",
};

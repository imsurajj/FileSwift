import { PrismaClient } from '@prisma/client';

// Prevent multiple instances of Prisma Client in development
declare global {
  var prisma: PrismaClient | undefined;
}

// During build process on Vercel or other CI, we want to avoid database connections
// isProd helps identify if we are in a real production environment vs. just build time
const isProd = process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV === 'production';
const isBuildTime = process.env.NODE_ENV === 'production' && !process.env.VERCEL_ENV;

// Custom Prisma initialization that handles build-time safely
function createPrismaClient() {
  // For build time, return a mock client
  if (isBuildTime) {
    console.log("Build-time detected, using mock Prisma client");
    
    // Return mock implementation that won't try to connect to a database
    return new Proxy({} as PrismaClient, {
      get: (target, prop) => {
        // Return mock methods for commonly used operations
        if (['user', 'post', 'comment'].includes(prop as string)) {
          return {
            findUnique: async () => null,
            findMany: async () => [],
            create: async () => ({}),
            update: async () => ({}),
            delete: async () => ({}),
          };
        }
        return () => {};
      },
    });
  }
  
  try {
    // For development or real production, use the real Prisma client
    return new PrismaClient();
  } catch (error) {
    console.error("Failed to initialize Prisma client:", error);
    // Return mock client as fallback
    return {} as PrismaClient;
  }
}

export const prisma = globalThis.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;

export default prisma; 
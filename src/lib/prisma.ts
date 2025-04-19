import { PrismaClient } from '@prisma/client';

// Prevent multiple instances of Prisma Client in development
declare global {
  var prisma: PrismaClient | undefined;
}

// Function to determine if we're in a build environment
const isBuildTime = () => {
  return process.env.SKIP_DB_CONNECT === 'true';
};

// Create a mock client for build time
const mockPrismaClient = {
  user: {
    findUnique: async () => null,
    findMany: async () => [],
    create: async () => ({}),
    update: async () => ({}),
    delete: async () => ({}),
  },
  // Add other models as needed
} as unknown as PrismaClient;

// Create or get the Prisma client
function getPrismaClient() {
  // Return mock client during build
  if (isBuildTime()) {
    console.log('Using mock Prisma client for build');
    return mockPrismaClient;
  }
  
  // Return actual client for runtime
  try {
    return new PrismaClient();
  } catch (error) {
    console.error('Failed to initialize Prisma client:', error);
    return mockPrismaClient;
  }
}

// Initialize the client
const prisma = globalThis.prisma || getPrismaClient();

// Save the client reference in development
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

export { prisma };
export default prisma; 
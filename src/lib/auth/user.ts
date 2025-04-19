import bcrypt from 'bcryptjs';
import { prisma } from '../prisma';

export async function createUser({ 
  name, 
  email, 
  password 
}: { 
  name: string; 
  email: string; 
  password: string;
}) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        image: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
      },
    });
  
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function getUserByEmail(email: string) {
  try {
    return prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });
  } catch (error) {
    console.error("Error getting user by email:", error);
    return null;
  }
}

export async function verifyPassword(plainPassword: string, hashedPassword: string) {
  try {
    return bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    console.error("Error verifying password:", error);
    return false;
  }
} 
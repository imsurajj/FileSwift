import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  try {
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        email: 'admin@example.com',
        name: 'Admin User',
        password: hashedPassword,
        image: 'https://ui-avatars.com/api/?name=Admin+User&background=8B5CF6&color=ffffff',
      },
    });
    
    console.log('Admin user created or updated:', adminUser);
    
    // Create demo user
    const demoUserPassword = await bcrypt.hash('demo123', 10);
    
    const demoUser = await prisma.user.upsert({
      where: { email: 'demo@example.com' },
      update: {},
      create: {
        email: 'demo@example.com',
        name: 'Demo User',
        password: demoUserPassword,
        image: 'https://ui-avatars.com/api/?name=Demo+User&background=0EA5E9&color=ffffff',
      },
    });
    
    console.log('Demo user created or updated:', demoUser);
    
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 
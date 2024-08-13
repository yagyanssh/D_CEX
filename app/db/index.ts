import { PrismaClient } from '@prisma/client';


/* 
    creating a singleton and warring it inside a funtion
    so that it gets called only when allowed not evertime this file recompiles
*/
const prismaClientSingleton = () => {
    return new PrismaClient();
}

type  PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

// eslintdisable-next-line
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if(process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
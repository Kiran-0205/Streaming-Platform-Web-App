import { PrismaClient } from "../generated/prisma";

const client = globalThis.prismadb || new PrismaClient();

if(process.env.NODE_ENV === 'production') global.prismadb = client;

export default client;
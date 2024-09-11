import NextAuth from "next-auth";
import { authOptions } from "./options";

// We have kept the authOptions seperate to make things more clear
const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}    // We have to write such verbs like GET, POST because these methods doesn't works in route.ts.
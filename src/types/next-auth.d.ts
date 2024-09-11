import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    _id?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean;
    username?: string;
  }
  interface Session {
    user: {
      _id?: string;
      isVerified?: boolean;
      isAcceptingMessages?: boolean;
      username?: string;
    } & DefaultSession['user']  // Extending the dafault user properties (session should have key named user everytime)
  }
  interface jwt {
    _id?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean;
    username?: string;
  }
}

// The next-auth.d.ts file is used in a Next.js project to provide TypeScript definitions for the next-auth library, which is a popular authentication solution for Next.js applications.
// This file helps in ensuring that TypeScript understands the types and interfaces related to the next-auth module, especially when customizing the default behavior or integrating it into your application.

// When you extend the session object using the next-auth.d.ts file, DefaultSession is often used as a base type to include the default properties while adding custom ones.
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDB from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import userModel from "@/model/User";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text " },
        password: { label: "Password", type: "password" },
      },
      // Now that nextAuth does not know how to do authentication we'll have to create our authorize function, we perform all the validation checks u want & return user
      async authorize(credentials: any): Promise<any> {
        await connectToDB();

        try {
          const user = await userModel.findOne({
            // Mongoose OR operator
            $or: [
              { email: credentials.identifier.email }, // Its ES6 so credentials.identifier is also fine
              { username: credentials.identifier.username },
            ],
          });
          // If user does not exists
          if (!user) {
            throw new Error("User not found with this email");
          }
          // Thats where our custom verification starts
          if (!user.isVerified) {
            throw new Error("User not verified, please verify your email");
          }
          // Here we're using credentials.password instead of credentials.identifier.password (This is some inconsistency that we have to deal with)
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isPasswordCorrect) {
            return user; // Any object returned will be saved in `user` property of the JWT
          } else {
            throw new Error("Incorrect Password"); // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (user) {
        // Here next-auth wont allow us to access the userId. So we'll have to make some changes to the next-auth module
        session.user._id = user._id;
        session.user.isVerified = user.isVerified;
        session.user.isAcceptingMessages = user.isAcceptingMessages;
        session.user.username = user.username;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.username = user.username;
      }
      return token;
    },
  },
  // Specify URLs to be used if you want to create custom sign in, sign out and error pages.
  // Pages specified will override the corresponding built-in page.
  // NextAuth.js automatically creates simple, unbranded authentication pages for handling Sign in, Sign out, Email Verification and displaying error messages.
  pages: {
    signIn: "/sign-in", // Here next-auth will automatically makes signIn page for us but we'll have to make a custom signUp page for us.
  },
  session: {
    strategy: "jwt",
  },
  // Used to encrypt the NextAuth.js JWT, and to hash email verification tokens. This is the default value for the secret option in NextAuth and Middleware.
  secret: process.env.NEXTAUTH_SECRET,
};

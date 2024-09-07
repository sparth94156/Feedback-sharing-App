import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDB from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import userModel from "@/model/User";
import { pages } from "next/dist/build/templates/app-page";

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
            $or: [
              { email: credentials.identifier.email },
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
            return user   // Any object returned will be saved in `user` property of the JWT
          }
          else{
            throw new Error('Incorrect Password')
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    })
  ],
  // Specify URLs to be used if you want to create custom sign in, sign out and error pages.
  // Pages specified will override the corresponding built-in page.
  // NextAuth.js automatically creates simple, unbranded authentication pages for handling Sign in, Sign out, Email Verification and displaying error messages.
  pages: {
    signIn: '/signIn' 
  },
  session: {
    strategy: "jwt"
  },  
  // Used to encrypt the NextAuth.js JWT, and to hash email verification tokens. This is the default value for the secret option in NextAuth and Middleware.
  secret: process.env.NEXTAUTH_SECRET
};

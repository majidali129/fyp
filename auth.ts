import { connectDB } from "@/lib/connectDB";
import UserModel from "@/models/user.model";
import NextAuth, { AuthError, CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";

class customError extends AuthError {
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { type: "text", label: "Email Address" },
        password: { type: "password", label: "Password" }
      },

      authorize: async (credentials: any): Promise<any> => {
        await connectDB();
        try {
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier }
            ]
          });
          if (!user) {
            throw new Error("User not found with this email");
          }
          if (!user.isVerified) {
            throw new Error("Please verify your account before logging in");
          }
          const isPasswordCorrect = await bcryptjs.compare(
            credentials.password,
            user.password
          );
          if (!isPasswordCorrect) {
            // throw new Error("Password did not match");
            // throw new CredentialsSignin("Password did not match");
            throw new customError("Password did not match");
          } else {
            return user;
          }
        } catch (error: any) {
          console.log("login failed", error);
          throw new Error(error);
        }
      }
    })
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token._id = user._id?.toString();
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.username = user.username;
        token.role = user.role;
        token.isVerified = user.isVerified;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.username = token.username as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user._id = token.id as string;
        session.user.role = token.role as string;
        session.user.isVerified = token.isVerified as boolean;
      }
      return session;
    }
  },
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/sign-in"
  }
});

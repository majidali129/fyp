import "next-auth";

declare module "next-auth" {
  interface session {
    user: {
      _id?: string;
      username?: string;
      firstName?: string;
      lastName?: string;
      role?: string;
      isVerified?: boolean;
    } & DefaultSession["user"];
  }
  interface User {
    _id?: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    role?: string;
    isVerified?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    role?: string;
    isVerified?: boolean;
  }
}

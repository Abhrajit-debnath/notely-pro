import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
    throw new Error("Missing GitHub OAuth environment variables");
}

if (!process.env.GOOGLE_ID || !process.env.GOOGLE_SECRET) {
    throw new Error("Missing Google OAuth environment variables");
}

export const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        })
    ],
    // callbacks: {
    //     async signIn({user,account,profile,email,credentials}) {
            
    //         return true; 
    //     }
    // }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST } 

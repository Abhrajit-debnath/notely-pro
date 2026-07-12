import { apiClient } from "@/app/apiClient/axiosClient";
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
    callbacks: {
        async signIn({ user, account, profile, email, credentials }:any):Promise<any> {


            const oAuthPayload = {
                email: user.email,
                name: user.name,
                image: user.image,
                provider: account.provider,
                providerId: account.providerAccountId
            }
            try {
                const oAuthResponse: any = await apiClient.post("/api/auth/oauth", oAuthPayload)

                if (oAuthResponse && oAuthResponse.data) {
                    user.accessToken = oAuthResponse.data.accessToken;
                    user.refreshToken = oAuthResponse.data.refreshToken;

                    return true
                }

                return false




            } catch (error) {
                console.error("Backend OAuth login failed:", error);
                return false
            }


        },
        async jwt({ token, user }: any) {
            if (user) {
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
            }
            return token;
        },
        async session({ session, token }: any) {
            if (token) {
                session.user.accessToken = token.accessToken;
                session.user.refreshToken = token.refreshToken;
            }
            return session;
        }
    }

};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST } 

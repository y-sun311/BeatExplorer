import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import axios from 'axios';
import spotifyApi, { LOGIN_URL } from '../../../lib/spotify';

async function refreshAccessToken(token) {
    try {
        const basicAuth = Buffer.from(`${process.env.NEXT_PUBLIC_CLIENT_ID}:${process.env.NEXT_PUBLIC_CLIENT_SECRET}`).toString('base64');
        const { data } = await axios.post(
            'https://accounts.spotify.com/api/token',
            new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: token.refreshToken,
            }).toString(),
            {
                headers: {
                    Authorization: `Basic ${basicAuth}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                cache: "no-cache",
            }
        );
        return {
            ...token,
            accessToken: data.access_token,
            accessTokenExpires: Date.now() + data.expires_in * 1000,
            refreshToken: data.refresh_token ?? token.refreshToken, // Fall back to old refresh token
        };
    } catch (error) {
        console.error("Error refreshing access token", error);
        return {
            ...token,
            error: 'RefreshAccessTokenError',
        };
    }
}

const authOptions = {
    providers: [
        SpotifyProvider({
            clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
            authorization: LOGIN_URL,
        }),
    ],
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, account, profile }) {
            console.log('JWT callback:', { token, account, profile });
            if (account) {
                token.id = account.id;
                token.accessToken = account.accessToken;
                token.refreshToken = account.refresh_token;
                token.accessTokenExpires = account.expires_at * 1000;
                token.profile = profile;
                return token;
            }

            if (Date.now() < token.accessTokenExpires) {
                console.log("Existing token is valid");
                return token;
            }

            console.log("Access token has expired, refreshing...");
            return await refreshAccessToken(token);
        },
        async session({ session, token }) {
            console.log('Session callback:', { session, token });
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;
            session.user.username = token.profile.name;
            session.user.id = token.id;
            return session;
        }
    },
};

const { handlers } = NextAuth(authOptions);
export const { GET, POST } = handlers;


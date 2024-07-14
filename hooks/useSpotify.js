"use client";

import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';

function useSpotify() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      if (session.error === 'RefreshAccessTokenError') {
        signIn(); // Force sign in to resolve error
      }

      // Get the access token

    }
  }, [session]);

  console.log("session ", session);
  return session?.user?.accessToken;
}

export default useSpotify;

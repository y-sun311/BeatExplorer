"use client";

import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';

function useSpotify() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signIn(); // Force sign in to resolve error
    }
  }, [session]);

  return session?.user?.accessToken;
}

export default useSpotify;


"use client";

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { shuffle } from 'lodash';
import { ChevronDoubleDownIcon } from '@heroicons/react/outline';
import { useRecoilState } from 'recoil';
import { fetchSpotifyData } from '../lib/spotify';
import { playlistIdState, playlistAtom } from '../../atoms/playlistAtom';
import useSpotify from '@/hooks/useSpotify';

const colors = [
  'bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400',
  'bg-purple-400', 'bg-pink-400', 'bg-indigo-400', 'bg-gray-400',
  'bg-black', 'bg-white'
];

function Center() {
  const { data: session, status } = useSession();
  const accessToken = useSpotify();
  const [color, setColor] = useState(null);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState); 
  const [playlist, setPlaylists] = useRecoilState(playlistAtom);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    if (accessToken) {
      const fetchPlaylists = async () => {
        // get the playlist by id provided
        try {
          const data = await fetchSpotifyData(`https://api.spotify.com/v1/playlists/${playlistId}`, accessToken);
          setPlaylists(data);
        } catch (error) {
          console.error('Error fetching playlists:', error);
        }
        }
        fetchPlaylists();
    }
    }, [accessToken, playlistId]);

    console.log(playlist);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex-grow">
      <header className='absolute top-5 right-8'>
        <div className='bg-red-300 flex items-center space-x-3 rounded-full opacity-80 hover:opacity-60 cursor-pointer p-1 pr-2'>
          <img className='rounded-full w-10 h-10' src={session?.user?.image} alt="" />
          <h2>{session?.user?.name}</h2>
          <ChevronDoubleDownIcon className='h-5 w-5' />
        </div>
      </header>

      <section className={`flex items-end w-full space-x-7 bg-gradient-to-b  ${color} h-80 text-white p-8`}>
        <img className='h-44 w-44 shadow-xl' src={playlist?.images?.[0].url}></img>
   
   <div>
            <p>PLAYLIST</p>
            <h1 className='text-2xl font-bold'>{playlist?.name}</h1>

   </div>
      </section>
    </div>
  );
}

export default Center;

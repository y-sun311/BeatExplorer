"use client";

import {
  HomeIcon,
  SearchIcon,
  PlusCircleIcon,
  LibraryIcon,
  RssIcon,
  HeartIcon,
} from '@heroicons/react/outline';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import useSpotify from '@/hooks/useSpotify';
import { fetchSpotifyData } from '../lib/spotify';
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../../atoms/playlistAtom';

function Sidebar() {
  const { data: session } = useSession();
  const accessToken = useSpotify();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState); 

  console.log("you picked this playlist", playlistId);

  useEffect(() => {
    if (accessToken) {
      const fetchPlaylists = async () => {
        try {
          const data = await fetchSpotifyData('https://api.spotify.com/v1/me/playlists', accessToken);
          setPlaylists(data.items);
        } catch (error) {
          console.error('Error fetching playlists:', error);
        }
      };

      fetchPlaylists();
    }
  }, [accessToken]);

  return (
    <div className="p-5 text-gray-400 bg-black border-gray-900 text-xs lg:text-sm h-screen overflow-y-scroll sm:max-w-[12rem] lg:max-w-[15rem]
    hidden md:inline-flex">
      <div className="space-y-4">
        {/* <button className="flex items-center space-x-2 hover:text-white" onClick={() => signOut()}>
          <p>Logout</p>
        </button> */}
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5" />
          <p>Your Episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        {/* Playlists */}
        {playlists.map((playlist) => (
          <p key={playlist.id} onClick={() => setPlaylistId(playlist.id)}  className="cursor-pointer hover:text-white">
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
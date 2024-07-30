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
import { useEffect, useMemo, useState } from 'react';
import useSpotify from '@/hooks/useSpotify';
import { fetchSpotifyData } from '../lib/spotify';
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../../atoms/playlistAtom';
import { useRouter } from 'next/navigation';

function Sidebar() {
  const accessToken = useSpotify();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  const router = useRouter();

  const menuItems = useMemo(() => [
    { icon: HomeIcon, text: "Home", path: "/" },
    { icon: SearchIcon, text: "Search", path: "/search" },
    // { icon: LibraryIcon, text: "Your Library", path: "/library" },
    // { icon: PlusCircleIcon, text: "Create Playlist", path: "/create-playlist" },
    // { icon: HeartIcon, text: "Liked Songs", path: "/liked-songs" },
    // { icon: RssIcon, text: "Your Episodes", path: "/your-episodes" },
  ], []);

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
    <div className="p-5 text-gray-400 bg-black border-gray-900 text-xs lg:text-sm h-screen overflow-y-scroll sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36">
      <div className="space-y-4">
        {/* Example Logout button */}
        {/* <button className="flex items-center space-x-2 hover:text-white" onClick={() => signOut()}>
          <p>Logout</p>
        </button> */}
        {menuItems.map(({ icon: Icon, text, path }) => (
          <button key={path} className="flex items-center space-x-2 hover:text-white" onClick={() => router.push(path)}>
            <Icon className="h-5 w-5" />
            <p>{text}</p>
          </button>
        ))}
        <hr className="border-t-[0.1px] border-gray-900" />
        {/* Playlists */}
        {playlists.map((playlist) => (
          <p key={playlist.id} onClick={() => setPlaylistId(playlist.id)} className="cursor-pointer hover:text-white">
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;

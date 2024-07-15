import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { currentTrackState, isPlayingState } from "@/atoms/songAtom";
import { useEffect, useState } from "react";
import useSongInfo from "../../hooks/useSongInfo";
import { FastForwardIcon, PauseIcon, PlayIcon, ReplyIcon, RewindIcon, SwitchHorizontalIcon } from "@heroicons/react/outline";

function Player() {
  const { data: session } = useSession();
  const accessToken = session?.user?.accessToken;
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);
  const songInfo = useSongInfo();

  const fetchCurrentSong = async () => {
    if (!songInfo) {
      try {
        const currentSongResponse = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (currentSongResponse.ok) {
          const currentSong = await currentSongResponse.json();

          if (currentSong?.item) {
            setCurrentTrackId(currentSong.item.id);

            const currentPlaybackResponse = await fetch('https://api.spotify.com/v1/me/player', {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });

            if (currentPlaybackResponse.ok) {
              const currentPlayback = await currentPlaybackResponse.json();
              setIsPlaying(currentPlayback.is_playing);
            } else {
              console.log('Error fetching current playback state');
            }
          } else {
            console.log('No song currently playing');
          }
        } else {
          console.log('Error fetching currently playing song');
        }
      } catch (error) {
        console.error('Error fetching current song or playback state:', error);
      }
    }
  };

  const handlePlayPause = async () => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/me/player/${isPlaying ? 'pause' : 'play'}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        setIsPlaying(!isPlaying);
      } else {
        const errorDetails = await response.json();
        console.error('Error toggling play/pause:', errorDetails);
      }
    } catch (error) {
      console.error('Error toggling play/pause:', error);
    }
  };

  useEffect(() => {
    if (accessToken && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [accessToken, currentTrackId, fetchCurrentSong]);

  console.log(songInfo);
  console.log(currentTrackId);
  console.log(accessToken);

  return (
    <div className="grid grid-cols-3 text-xs md:text-base px-2 md:px-8 h-24 bg-gradient-to-b from-black to-gray-800 text-white">
      <div className="flex items-center space-x-4">
        {songInfo && (
          <img className='hidden md:inline h-10 w-10' src={songInfo.album.images[0]?.url} alt={songInfo.name} />
        )}
        <h3>{songInfo?.name}</h3>
        <p>{songInfo?.artists?.[0]?.name}</p>
      </div>

      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="button" />
        <RewindIcon className="button" />

        {isPlaying ? (
          <PauseIcon className="button" onClick={handlePlayPause} />
        ) : (
          <PlayIcon className="button" onClick={handlePlayPause} />
        )}

        <FastForwardIcon className="button" />
        <ReplyIcon className="button" />
      </div>
    </div>
  );
}

export default Player;

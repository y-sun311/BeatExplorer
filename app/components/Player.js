import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { currentTrackState, isPlayingState } from "@/atoms/songAtom";
import { useEffect, useState } from "react";
import useSongInfo from "../../hooks/useSongInfo";

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
    <div>
      <div>
        {songInfo && (
          <img className='hidden md:inline h-10 w-10' src={songInfo.album.images[0]?.url} alt={songInfo.name} />
        )}
      </div>
    </div>
  );
}

export default Player;


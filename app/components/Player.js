import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { currentTrackState, isPlayingState } from "@/atoms/songAtom";
import { useState } from "react";
import useSongInfo from "../../hooks/useSongInfo";

function Player() {
    const { data: session, status } = useSession();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [volume, setVolume] = useState(50);
    const songInfo = useSongInfo();

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

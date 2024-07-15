import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";
import { currentTrackState } from "../atoms/songAtom";
import useSpotify from "./useSpotify";

function useSongInfo() {
    const [currentIdTrack, setCurrentIdTrack] = useRecoilState(currentTrackState);
    const [songInfo, setSongInfo] = useState(null);
    const token = useSpotify();

    useEffect(() => {
        const fetchSongInfo = async () => {
            if (currentIdTrack) {
                const trackId = currentIdTrack.split(':').pop();
                try {
                    const trackInfo = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }).then((res) => res.json());

                    setSongInfo(trackInfo);
                } catch (error) {
                    console.error('Error fetching song info:', error);
                }
            }
        };

        fetchSongInfo();
    }, [currentIdTrack, token]);

    return songInfo;
}

export default useSongInfo;

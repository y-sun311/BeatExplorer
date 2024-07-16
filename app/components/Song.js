import { millsToMinutesAndSeconds } from '../lib/time';
import { useRecoilState } from 'recoil';
import { currentTrackState, isPlayingState } from '../../atoms/songAtom';
import { useSession } from 'next-auth/react';
import { playSong } from '../lib/spotify';

function Song({ order, track }) {
    const { data: session } = useSession();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const accessToken = session?.user?.accessToken;

    const playSongFetch = async () => {
        console.log('Playing song:', track.track.uri);
        if (!accessToken) {
            console.error('No access token available');
            return;
        }

        try {
            await playSong(track.track.uri, accessToken);
            setCurrentTrackId(track.track.uri);
            setIsPlaying(true);
        } catch (error) {
            console.error('Error playing song:', error);
        }
    };

    return (
        <div className="grid grid-cols-2 px-5 py-5 hover:bg-gray-800 cursor-pointer rounded-md" onClick={playSongFetch}>
            <div className="flex items-center space-x-4">
                <p>{order + 1}</p>
                <img className='h-10 w-10' src={track.track.album.images[0].url} alt="" />
                <div>
                    <p>{track.track.name}</p>
                    <p className='text-gray-500'>{track.track.artists[0].name}</p>
                </div>
            </div>

            <div className="flex justify-between items-center ml-auto md:ml-0">
                <p className="w-40 hidden md:inline text-gray-500">{track.track.album.name}</p>
                <p>{millsToMinutesAndSeconds(track.track.duration_ms)}</p>
            </div>
        </div>
    );
}

export default Song;

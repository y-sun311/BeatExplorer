import React from 'react';
import { useRecoilValue } from 'recoil';
import { playlistAtom } from '../../atoms/playlistAtom';
import Song from './Song';

function Songs(){
    const playlist = useRecoilValue(playlistAtom);
    return <div className='text-white flex flex-col px-8'>
        {playlist?.tracks?.items.map((track, i) => (
            <Song key={track.track.id} track={track} order={i}/>
        ))}

    </div>
}

export default Songs;
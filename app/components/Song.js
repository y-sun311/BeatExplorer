import { millsToMinutesAndSeconds } from '../lib/time';


function Song({ order, track}){

return (
    <div className="grid grid-cols-2 px-5 py-5 hover:bg-gray-800 cursor-pointer rounded-md">
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
)

}

export default Song;

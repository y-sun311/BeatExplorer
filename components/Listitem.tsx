"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";

interface ListitemProps{
    name: string;
    image: string;
    href: string;
}

const Listitem: React.FC<ListitemProps> = ({name, image, href}) => {

    const router = useRouter();

    const onClick = () => {
        router.push(href);
    }

    return  (
       <button onClick={onClick} className="relative group flex items-center rounded-md pr-4 gap-x-4 overflow-hidden transition bg-neutral-100/10 hover:bg-neutral-100/20">
          <div className="relative min-h-[64px] min-w-[64px]">
             <Image  fill={true} className="object-cover" src={image} alt="Image"/>
          </div>
          <p className="py-5 font-medium truncate">
                {name}
          </p>
          <div className="opacity-0 flex p-4 
           rounded-full items-center
           justify-center absolute transition bg-green-400 
           drop-shadow-md right-5 group-hover:opacity-100 
           hover:scale-110">
            <FaPlay className="text-black"/>
          </div>
       </button>
    );


}

export default Listitem;
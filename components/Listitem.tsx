"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

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
       <button className="relative group flex item-center rounded-md pr-4 gap-x-4 overflow-hidden transition bg-neutral-100/10 hover:bg0neutral-100/20">
          <div className="relative min-h-[64px] min-w-[64px]">
             <Image className="object-cover" src={image} alt="image"/>
          </div>
          <p>
                {name}
          </p>
       </button>
    );


}

export default Listitem;
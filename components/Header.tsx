"use client";

import { useRouter } from "next/navigation";
import { HiHome, HiSearch } from "react-icons/hi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";


interface HeaderProps{
    children?: React.ReactNode;
    className?: string;

}




const Header: React.FC<HeaderProps> = ({children, className}) => {

    const router = useRouter();

    const handleLogout = () => {
    }
    return (
        <div className={twMerge('h-fit bg-gradient-to-b from-emerald-800 p-6')}>
            <div className="w-fuull mb-4 flex item-center justify-between">
                <div className="hidden md:flex gap-x-2 items-center">
                    <button onClick={() => router.back()} className="rounded-full bg-black flex item-center justify-center hover:opacity-75 transition">
                        <RxCaretLeft size={30} className="text-white"/>
                    </button>
                    <button className="rounded-full bg-black flex item-center justify-center hover:opacity-75 transition">
                        <RxCaretRight onClick={() => router.forward} size={30} className="text-white"/>
                    </button>
                </div>
                <div className="flex md:hidden gap-x-2 items-center">
                    <button className="bg-white flex item-center p-2 rounded-full transition hover:opacity-75">
                        <HiHome className="text-black" size={30}/>
                    </button>
                    <button className="bg-white flex item-center p-2 rounded-full transition hover:opacity-75">
                        <HiSearch className="text-black" size={30}/>
                    </button>
                </div>
            </div>
        </div>
    )

}


export default Header;

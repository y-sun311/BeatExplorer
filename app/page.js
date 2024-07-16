"use client"

import Sidebar from "@/app/components/Sidebar";
import Center from "@/app/components/Center";
import Player from "./components/Player";


export default function Home() {
  return (
    <div className='bg-black h-screen overflow-hidden'>
        <main className="flex">
           <Sidebar />
           <Center />
        </main>

        <div className="sticky bottom-0">
            <Player />
        </div>
    </div>
  );
}

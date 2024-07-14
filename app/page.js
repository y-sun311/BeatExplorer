import Sidebar from "@/app/components/Sidebar";
import Center from "@/app/components/Center";


export default function Home() {
  return (
    <div className='bg-black h-screen overflow-hidden'>
        <main className="flex">
           <Sidebar />
           <Center />
        </main>

        <div>{/* player */}</div>
    </div>
  );
}

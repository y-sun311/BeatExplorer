import Header from "@/src/app/components/Header";
import Listitem from "@/src/app/components/Listitem";



export default function Home() {
  return (
   <div className="rounded-lg w-full h-full overflow-hidden overflow-y-auto bg-netural-900">
   <Header>
    <div className="mb-2">
        <h1 className="text-whote text-2xl font-semibold">
            welcome
        </h1>
        <div className="mt-4 gap-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4">
            <Listitem image="/images/liked.png" name="Liked Songs" href="liked"/>
        </div>

    </div>
   </Header>
   <div className="px-6 mt-2 mb-7">
    <div className="flex justify-between items-center">
        <h1 className="font-semibold text-white text-3xl">
            Newest Songs
        </h1>
    </div>
    <div>
       List Songs
    </div>
   </div>
   </div>
  );
}

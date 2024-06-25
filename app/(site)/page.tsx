import Header from "@/components/Header";
import Listitem from "@/components/Listitem";



export default function Home() {
  return (
   <div className="rounded-lg w-full h-full overflow-hidden overflow-y-auto bg-netural-900">
   <Header>
    <div className="mb-2">
        <h1 className="text-whote text-2xl font-semibold">
            welcome
        </h1>
        <div className="mt-4 gap-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4">
            <Listitem image="/images/liked.png" name="liked song" href="liked"/>
        </div>

    </div>
   </Header>
   </div>
  );
}

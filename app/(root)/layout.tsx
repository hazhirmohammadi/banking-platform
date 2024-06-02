import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import MobileNav from "@/components/MobileNav";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
 const LoggIn = { firstName: "Hazhir", lastName: "mohammadi" };

  return (
  <main className="flex h-screen w-full font-inter ">
    {/*@ts-ignore*/}
    <Sidebar user={LoggIn} />

   <div className="flex w-full flex-col">
    <div className="root-layout">
     <Image src="/icons/logo.svg" alt="menu logo" width={30} height={30} />
     <div>
       {/*@ts-ignore*/}
       <MobileNav user={LoggIn} />
     </div>
    </div>
    {children}
   </div>
  </main>
 );
}

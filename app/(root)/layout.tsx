import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import MobileNav from "@/components/MobileNav";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";


export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

 const LoggIn =await getLoggedInUser();
 if (!LoggIn) redirect("/sign-in")

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

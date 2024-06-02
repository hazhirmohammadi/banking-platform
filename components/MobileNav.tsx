"use client";
import {
 Sheet,
 SheetClose,
 SheetContent,
 SheetDescription,
 SheetHeader,
 SheetTitle,
 SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

const MobileNav = ({ user }: MobileNavProps) => {
 const pathname = usePathname();
 return (
  <section className="w-full max-w-[264px]">
   <Sheet>
    <SheetTrigger>
     <Image
      src="/icons/hamburger.svg"
      alt="menu icon"
      width={30}
      height={30}
      className="cursor-pointer"
     />
    </SheetTrigger>
    <SheetContent side="left" className="border-none bg-white">
     <Link href="/"
           className="cursor-pointer items-center gap-1 px-4"
     >
      <Image
       src="/icons/logo.svg"
       alt="logo"
       width={34}
       height={34}
      />
      <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Horizon</h1>
     </Link>
     <div className="mobilenav-sheet">
      <SheetClose asChild>
       <nav className="h-full flex flex-col gap-6 py-16 text-white">
        {sidebarLinks.map((i) => {
         const isActive = pathname === i.route || pathname.startsWith(`/${i.route}/`);
         return (
          <SheetClose asChild key={i.route}>
           <Link className={cn("mobilenav-sheet_close w-full", { "bg-bank-gradient": isActive })} href={i.route}
                 key={i.label}>

            <Image
             src={i.imgURL}
             alt={i.label}
             width={20}
             height={20}
             className={cn({ "brightness-[3] invert-0": isActive })}
            />
            <p className={cn("text-16 font-semibold text-black-2 ", { "!text-white  ": isActive })}>
               <span className="text-sm whitespace-nowrap">
                {i.label}
               </span>
            </p>
           </Link>
          </SheetClose>
         );
        })}
       </nav>
      </SheetClose>
       <Footer user={user} type="mobile"/>
     </div>
    </SheetContent>
   </Sheet>
  </section>
 );
};

export default MobileNav;

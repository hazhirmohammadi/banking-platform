"use client";
import Link from "next/link";
import Image from "next/image";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

const Sidebar = ({ user }: SiderbarProps) => {
 const pathname = usePathname();
 return (
  <section className="sidebar">
   <nav className="flex flex-col gap-4">
    <Link href="/"
          className="mb-12 cursor-pointer items-center gap-2 "
    >
     <Image
      src="/icons/logo.svg"
      alt="logo"
      width={34}
      height={34}
      className="size[24px] max-xl:size-14"
     />
     <h1 className="sidebar-logo">Horizon</h1>
    </Link>

    {sidebarLinks.map((i) => {
     const isActive = pathname === i.route || pathname.startsWith(`/${i.route}/`);
     return (
      <Link className={cn("sidebar-link", { "bg-bank-gradient": isActive })} href={i.route} key={i.label}>
       <div className="relative size-6">
        <Image
         src={i.imgURL}
         alt={i.label}
         fill
         className={cn({ "brightness-[3] invert-0": isActive })}
        />
       </div>
       <p className={cn("sidebar-label ", { "!text-white  ": isActive })}>
        <span className="text-sm whitespace-nowrap">
         {i.label}
        </span>
       </p>
      </Link>
     );
    })}

    USER
   </nav>
   <Footer user={user} />
  </section>
 );
};

export default Sidebar;

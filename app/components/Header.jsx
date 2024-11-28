import Image from "next/image";
import Link from "next/link";

import Logo from "@/public/logo.png";
import { Button } from "@/components/ui/button";
import { PenBox } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Usermenu from "./User-menu";
import { checkUser } from "@/lib/checkUser";
import { ThemeToggle } from "./ThemeToogle";

export default async function Header() {
  await checkUser()
  return (
    <nav className="mx-auto py-2 px-4 flex justify-between items-center shadow-md border-b-2">
      <Link href={"/"} className="flex items-center gap-2">
        <Image src={Logo} alt="Logo" className="size-12" />
        <h4 className="text-4xl font-semibold">
          Sched<span className="text-blue-600">ify</span>
        </h4>
      </Link>
      <div className="flex items-center gap-4">
        <Link href={"/events?create=true"}>
          <Button className="flex items-center gap-2 w-full py-5">
            <PenBox size={18} />
            <span className="hidden sm:inline">Create Event</span>
          </Button>
        </Link>
        <SignedOut>
          <SignInButton forceRedirectUrl="/dashboard">
            <Button variant="outline" className="w-full mr-2 py-4">
              Login
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <Usermenu />
        </SignedIn>
      </div>
      
    </nav>
  );
}

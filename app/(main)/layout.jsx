"use client";

import { useUser } from "@clerk/nextjs";
import { BarLoader } from "react-spinners";
import { Calendar, BarChart, Users, Clock } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/meetings", label: "Meetings", icon: Users },
  { href: "/availability", label: "Availability", icon: Clock },
];

export default function AppLayout({ children }) {
  const { isLoaded } = useUser();
  const pathname = usePathname();
  return (
    <>
      {!isLoaded && <BarLoader width={"100%"} color="#36d7b7" />}
      <div className="flex flex-col h-screen bg-primary-foreground md:flex-row">
        <aside className="hidden md:block w-64 bg-primary/5 border border-r-2">
          <nav className="mt-8">
            <ul>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-4 text-primary font-medium text-lg hover:bg-primary/15 ${
                      pathname === item.href
                        ? "bg-primary/15 text-primary hover:bg-primary/15"
                        : ""
                    } `}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <header className="flex justify-between items-center mb-4">
            <h2 className="text-5xl md:text-6xl gradient-title pt-2 md:pt-0 text-center md:text-left w-full">
              {navItems.find((item) => item.href === pathname).label ||
                "Dashboard"}
            </h2>
          </header>
          {children}
        </main>
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-200 shadow-md opacity-100 ">
          <ul className="flex justify-around">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex flex-col items-center py-2 px-4 font-semibold text-primary hover:bg-primary/20 ${
                    pathname === item.href ? "bg-primary/20 text-primary hover:bg-primary/20" : ""
                  }`}
                >
                  <item.icon className="w-5 h-5 " />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}

"use client";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React, { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-row h-screen">
      <div className="absolute -top-[86%] -left-[30%] w-[900px] h-[900px] bg-gradient-radial from-[#c1d114] via-[#cedd26] via-[#dbe363] via-[#e4ed80]  to-transparent to-90% opacity-60 blur-2xl rounded-full -z-10"></div>

      <div className="flex-[0.2] flex flex-col justify-between border-r-[1px] px-8">
        <div>
          <img src="/logo.svg" alt="logo" className="w-32 mb-16" />
          <nav className="flex flex-col gap-8">
            <Link
              href="/dashboard/"
              className={pathname === "/dashboard" ? "font-bold" : ""}
            >
              Leads
            </Link>
            <Link href="#" className="cursor-not-allowed">
              Settings
            </Link>
          </nav>
        </div>
        <div className="mb-16">
          <SignedIn>
            <div className="flex flex-row gap-2 justify-start items-center">
              <UserButton />
              <p className="font-bold text-xl">Admin</p>
            </div>
          </SignedIn>
        </div>
      </div>
      <main className="flex-[0.8] p-8">{children}</main>
    </div>
  );
}

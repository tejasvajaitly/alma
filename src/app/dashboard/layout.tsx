"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React, { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-row">
      <aside className="flex-[0.2]">
        <nav>
          <Link
            href="/dashboard/"
            className={pathname === "/dashboard" ? "bg-slate-600" : ""}
          >
            Leads
          </Link>
          <Link
            href="/dashboard/settings"
            className={pathname === "/dashboard/settings" ? "bg-slate-600" : ""}
          >
            Settings
          </Link>
        </nav>
      </aside>
      <main className="flex-[0.8]">{children}</main>
    </div>
  );
}

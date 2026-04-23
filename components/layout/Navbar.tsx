"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FiHome,
  FiInfo,
  FiMail,
  FiLayers,
} from "react-icons/fi";

const navItems = [
  { label: "Home", href: "/", icon: FiHome },
  { label: "About", href: "/about", icon: FiInfo },
  // { label: "Services", href: "/services", icon: FiLayers },
  { label: "Contact", href: "/contact", icon: FiMail },
];

export default function Navbar() {
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50">

      <div className="flex items-center gap-2 bg-white border border-black/20 rounded-full px-2 py-1 shadow-md backdrop-blur">

        {navItems.map((item, i) => {
          const Icon = item.icon;

          return (
            <Link
              key={i}
              href={item.href}
              className={`group flex items-center justify-center md:justify-start gap-0 md:gap-2 px-3 md:px-4 py-1.5 rounded-full text-sm transition ${i === 0
                  ? "bg-black text-white"
                  : "text-slate-700 hover:bg-black hover:text-white"
                }`}
            >
              <Icon
                className={`h-4 w-4 ${i === 0
                    ? "text-current"
                    : "text-blue-600 group-hover:text-white"
                  }`}
              />

              <span className="hidden md:inline font-medium">
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* RIGHT ICONS */}

      </div>
    </header>
  );
}
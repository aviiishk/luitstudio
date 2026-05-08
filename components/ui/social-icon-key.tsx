"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface Props {
  href: string;
  icon: string;
  title: string;
}

export default function SocialIconKey({ href, icon, title }: Props) {
  const [rotate, setRotate] = useState(0);

  useEffect(() => {
    setRotate(Math.floor(Math.random() * 10 - 5));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -8, rotate: 0, scale: 1.05 }}
      className="relative"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-[90px] h-[90px] md:w-[110px] md:h-[110px] relative group"
      >
        {/* KEYCAP */}
        <div className="absolute inset-0 z-10 transition-all duration-200 group-active:translate-y-1">
          <Image
            src={icon}
            alt={title}
            fill
            className="object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.3)]"
          />
        </div>

        {/* BASE SHADOW */}
        <div className="absolute inset-0 translate-y-3 opacity-40 blur-md bg-black/40 rounded-xl" />
      </Link>
    </motion.div>
  );
}

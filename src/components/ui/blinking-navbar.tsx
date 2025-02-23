"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/", icon: "material-symbols:home-app-logo", label: "Home" },
  {
    href: "/tin-tuc",
    icon: "material-symbols:breaking-news-outline-sharp",
    label: "News",
  },
  {
    href: "mailto:tuvan@icanpr.vn",
    icon: "material-symbols:mail-rounded",
    label: "Email",
  },
  {
    href: "https://api.whatsapp.com/send?phone=84869967809",
    icon: "mdi:whatsapp",
    label: "WhatsApp",
  },
  {
    href: "https://zalo.me/84869967809",
    icon: "arcticons:zalo",
    label: "Zalo",
  },
];

export default function BlinkingNavbar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isHovered === null) {
        setActiveIndex((prevIndex) => (prevIndex + 1) % navItems.length);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const NavLink = ({ item, index, isExternal = false }) => {
    const Component = isExternal ? 'a' : Link;
    const props = isExternal ? { 
      href: item.href, 
      target: "_blank", 
      rel: "noopener noreferrer" 
    } : { href: item.href };

    const isActive = index === activeIndex;
    const isHoveredItem = index === isHovered;

    return (
      <Component
        {...props}
        className="relative group flex items-center justify-center h-full"
        onMouseEnter={() => {
          setIsHovered(index);
          setActiveIndex(index);
        }}
        onMouseLeave={() => setIsHovered(null)}
      >
        <div className="relative flex flex-col items-center justify-center w-14 h-14">
          {(isActive || isHoveredItem) && (
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-orange-500/20 rounded-2xl blur-[2px]" />
              <div className="absolute inset-0 bg-gradient-to-b from-orange-500/20 to-orange-600/20 rounded-2xl" />
            </div>
          )}
          
          <Icon
            icon={item.icon}
            className={`text-2xl transition-colors duration-300 ${
              isActive || isHoveredItem 
                ? 'text-orange-500' 
                : 'text-white/70 group-hover:text-white'
            }`}
          />
          <span
            className={`text-[10px] font-medium mt-1 transition-colors duration-300 ${
              isActive || isHoveredItem 
                ? 'text-orange-500' 
                : 'text-white/70 group-hover:text-white'
            }`}
          >
            {item.label}
          </span>
        </div>
      </Component>
    );
  };

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="fixed z-50 bottom-0 left-0 w-full
        bg-[#1a1f2e]/20 backdrop-blur-xl shadow-2xl lg:hidden
        rounded-t-[20px] border-t border-white/10"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent rounded-t-[20px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      
      <ul className="relative flex justify-around items-center h-20 px-2">
        <AnimatePresence>
          {navItems.map((item, index) => (
            <motion.li
              key={item.label}
              className="flex-1 flex justify-center"
              whileTap={{ scale: 0.95 }}
            >
              <NavLink
                item={item}
                index={index}
                isExternal={item.href.startsWith("http") || item.href.startsWith("mailto")}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </motion.nav>
  );
}

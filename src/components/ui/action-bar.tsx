"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react/dist/iconify.js";

interface CircularMenuProps {
  position: "left" | "right";
}

export default function CircularMenu({
  position = "right",
}: CircularMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: "material-symbols:call", label: "Phone", href: "tel:+84869967809" },
    {
      icon: "material-symbols-light:mail",
      label: "Messages",
      href: "mailto:tuvan@icanpr.vn",
    },
    {
      icon: "simple-icons:zalo",
      label: "Zalo",
      href: "https://zalo.me/84869967809",
    },
    { icon: "material-symbols:android-camera", label: "SCAN", href: "#" },
  ];

  return (
    <div className="fixed bottom-24 w-14 h-14 right-3 z-[100000]">
      <div className="relative">
        <AnimatePresence>
          {isOpen && (
            <>
              {menuItems.map((item, index) => {
                const baseAngle = -215;
                const angleIncrement = 45;
                const angle = baseAngle + index * angleIncrement;
                const radius = 80;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;

                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="absolute z-[9999999999999999999999] w-12 h-12 rounded-xl 
                             bg-gradient-to-br from-background to-background/80
                             backdrop-blur-sm backdrop-saturate-150
                             border border-white/20 dark:border-white/[0.08]
                             shadow-[0_8px_16px_-6px_rgba(0,0,0,0.2)]
                             flex items-center justify-center
                             hover:scale-110 hover:-translate-y-1
                             transition-transform duration-300"
                    initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                    animate={{
                      scale: 1,
                      x,
                      y,
                      opacity: 1,
                    }}
                    exit={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                    style={{ originX: 0.5, originY: 0.5 }}
                    aria-label={item.label}
                  >
                    <div className="relative">
                      {/* Icon Glow Effect */}
                      <div className="absolute inset-0 bg-background/20 blur-lg rounded-full" />
                      
                      <Icon
                        icon={item.icon}
                        className="relative z-10 text-white text-xl w-5 h-5
                                 transform transition-transform duration-300
                                 group-hover:scale-110"
                      />
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 
                                  opacity-0 group-hover:opacity-100
                                  transition-opacity duration-200">
                      <div className="px-2 py-1 text-xs font-medium text-white
                                    bg-gray-900/80 rounded-md backdrop-blur-sm
                                    whitespace-nowrap">
                        {item.label}
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </>
          )}
        </AnimatePresence>

        <motion.button
          className="w-14 h-14 rounded-xl relative
                     bg-gradient-to-br from-background to-background/80
                     backdrop-blur-sm backdrop-saturate-150
                     border border-white/20 dark:border-white/[0.08]
                     shadow-[0_8px_16px_-6px_rgba(0,0,0,0.2)]
                     flex items-center justify-center
                     hover:scale-105 hover:-translate-y-1
                     transition-transform duration-300"
          onMouseEnter={() => setIsOpen(true)}
          onClick={() => setIsOpen(!isOpen)}
          animate={{ rotate: isOpen ? 45 : 0 }}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <div className="relative">
            {/* Button Glow Effect */}
            <div className="absolute inset-0 bg-background/20 blur-lg rounded-full" />
            
            <Icon
              icon={"material-symbols:list-alt-add-rounded"}
              className="relative z-10 w-14 h-14 text-white
                       transform transition-transform duration-300"
            />
          </div>
        </motion.button>
      </div>
    </div>
  );
}

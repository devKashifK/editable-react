"use client";

import { Icon } from "@iconify/react";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./button";
import { motion } from "framer-motion";

export default function Footer() {
  const navigate = useRouter();

  const provinces = [
    {
      path: "/de-cu-tinh-bang-pnp/alberta-nhap-cu-aaip",
      element: "Alberta Nhap Cu (AAIP)",
    },
  
    {
      path: "/de-cu-tinh-bang-pnp/british-columbia-bcpnp",
      element: "British Colombia (BC PNP)",
    },
    {
      path: "/de-cu-tinh-bang-pnp/ontario-oinp",
      element: "Ontario (OINP)",
    },
  
    {
      path: "/de-cu-tinh-bang-pnp/manitoba-mpnp",
      element: "Manitoba (MPNP)",
    },
    {
      path: "/de-cu-tinh-bang-pnp/new-brunswick-nbpnp",
      element: "New Brunswick (NBPNP)",
    },
    // {
    //   path: "/de-cu-tinh-bang-pnp/newfoundland-and-labrador",
    //   element: "Newfoundland and Labrador",
    // },
  
    // {
    //   path: "/de-cu-tinh-bang-pnp/northwest-territories",
    //   element: "Northwest Territories",
    // },
    {
      path: "/de-cu-tinh-bang-pnp/nova-scotia-nsnp",
      element: "Nova Scotia (NSNP)",
    },
    // {
    //   path: "/de-cu-tinh-bang-pnp/nanuvut",
    //   element: "Nanuvut",
    // },
  
    {
      path: "/de-cu-tinh-bang-pnp/prince-edward-island-peipnp",
      element: "Prince Edward Island (PEI PNP)",
    },
    {
      path: "/de-cu-tinh-bang-pnp/quebec",
      element: "Quebec",
    },
    {
      path: "/de-cu-tinh-bang-pnp/saskatchewan-sinp",
      element: "Saskatchewan (SINP)",
    },
    {
      path: "/de-cu-tinh-bang-pnp/yukon-ynp",
      element: "Yukon (YNP)",
    },
  ];

  const serviceLinks = [
    { name: "Dinh cu canada", href: "/immigration/dinh-cu-canada" },
    { name: "Cong Nhan Lanh Nghe Lien Bang", href: "/immigration/nhap-canh-nhanh/cong-nhan-lanh-nghe-lien-bang" },
    { name: "Du Hoc Dinh Cu", href: "immigration/du-hoc-dinh-cu" },
    { name: "Family Sponsorship", href: "/immigration/family-sponsorship" },
  ];

  return (
    <footer className="bg-gradient-to-b from-[#1A2A3A] to-[#0F1923] text-white">
      {/* Top Banner */}
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="w-32 sm:w-40">
            <img 
              src="/logo.png" 
              alt="logo" 
              className="w-full h-auto object-contain brightness-200" 
            />
          </div>
          <a
            href="tel:+84869967809"
            className="group flex items-center gap-3 text-white hover:text-background transition-colors duration-300"
          >
            <Icon icon="ph:phone-fill" className="w-5 sm:w-6 h-5 sm:h-6" />
            <span className="font-medium text-sm sm:text-base">+84 869 967 809</span>
          </a>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-white">Về iCanPR</h3>
            <nav className="flex flex-col space-y-2 sm:space-y-3">
              <Link 
                href="/ve-icanpr" 
                className="text-gray-300 hover:bg-white/10 px-2 py-1 rounded-md transition-all duration-200"
              >
                Giới thiệu về công ty iCanPR
              </Link>
              <Link 
                href="/lien-he" 
                className="text-gray-300 hover:bg-white/10 px-2 py-1 rounded-md transition-all duration-200"
              >
                Liên hệ
              </Link>
              <Link 
                href="/doi-tac-icanpr" 
                className="text-gray-300 hover:bg-white/10 px-2 py-1 rounded-md transition-all duration-200"
              >
                Đối tác iCanPR
              </Link>
              <Link 
                href="/cuoc-song-canada/cac-tinh-bang-canada/tinh-alberta" 
                className="text-gray-300 hover:bg-white/10 px-2 py-1 rounded-md transition-all duration-200"
              >
                Chương trình tỉnh bang
              </Link>
            </nav>
          </div>

          {/* Provincial Programs */}
          <div className="space-y-4 lg:col-span-2">
            <h3 className="text-lg sm:text-xl font-bold text-white">Chương trình tỉnh bang</h3>
            <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {provinces.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="text-gray-300 hover:bg-white/10 px-2 py-1 rounded-md transition-all duration-200 text-sm"
                >
                  {link.element}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-white">Dịch vụ</h3>
            <nav className="flex flex-col space-y-2">
              {serviceLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:bg-white/10 px-2 py-1 rounded-md transition-all duration-200 text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-white">Thông tin liên hệ</h3>
            <div className="space-y-3 text-sm sm:text-base">
              <div className="flex items-start gap-3">
                <Icon icon="ph:map-pin-fill" className="w-6 h-6 mt-1 flex-shrink-0 text-gray-300" />
                <p className="text-gray-300">Tầng 7, 85 Nguyễn Hữu Cầu, phường Tân Định, Quận 1, Tp. Hồ Chí Minh</p>
              </div>
              <div className="flex items-center gap-3">
                <Icon icon="ph:envelope-fill" className="w-6 h-6 text-gray-300" />
                <a 
                  href="mailto:tuvan@icanpr.vn" 
                  className="text-gray-300 hover:bg-white/10 px-2 py-1 rounded-md transition-all duration-200"
                >
                  tuvan@icanpr.vn
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Icon icon="ph:clock-fill" className="w-6 h-6 text-gray-300" />
                <p className="text-gray-300">8:30 - 5:30, Thứ 2 - Thứ 6 (Thứ 7: đặt hẹn)</p>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-white">Đăng ký tư vấn</h3>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Email của bạn"
                className="w-full px-4 py-2.5 sm:py-3 bg-white/10 border border-white/20 rounded-lg 
                text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-all duration-200"
              />
              <Button
                onClick={() => navigate.push("/lien-he")}
                variant="default"
                className="w-full bg-white/20 hover:bg-white/30 text-white font-medium py-2.5 sm:py-3 px-6 
                rounded-lg shadow-lg transition-all duration-200"
              >
                Tư vấn miễn phí
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs sm:text-sm text-gray-300 text-center sm:text-left">© 2024 iCanPR - All rights reserved</p>
          <img src="/RCIC-CERTIFIED-1.png" className="w-20 sm:w-24 h-auto brightness-200" alt="RCIC Certified" />
        </div>
      </div>
    </footer>
  );
}

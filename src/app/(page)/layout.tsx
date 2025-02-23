import Footer from "@/components/ui/footer";
import React from "react";
import BlinkingNavbar from "@/components/ui/blinking-navbar";
import HeroDefault from "@/components/ui/hero-2";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {/* <Sidebar /> */}
      <HeroDefault />
      {children}
      <Footer />
      <BlinkingNavbar />
    </div>
  );
}

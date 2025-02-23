import Footer from "@/components/ui/footer";
import React from "react";
import BlinkingNavbar from "@/components/ui/blinking-navbar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <Footer />
      <BlinkingNavbar />
    </div>
  );
}

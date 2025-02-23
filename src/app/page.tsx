import BlinkingNavbar from "@/components/ui/blinking-navbar";
import Home from "../../pages/home";

export default function page() {
  return (
    <div className="relative">
      <Home />
      <BlinkingNavbar />
    </div>
  );
}

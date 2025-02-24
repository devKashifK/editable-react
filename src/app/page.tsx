import BlinkingNavbar from "@/components/ui/blinking-navbar";
import PageRenderer from "@/components/ui/renderer";

export default function page() {
  return (
    <div className="relative">
      <PageRenderer name="home" key="home" />;
      <BlinkingNavbar />
    </div>
  );
}

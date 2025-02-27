"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import { Button } from "./custom";
import Navbar from "./navbar";
import { useMediaByExactTitle } from "./use-media";
interface HeroProps {
  backgroundImage: string;
  title: string;
  description: string;
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  buttons: Array<{
    icon: string;
    text: string;
    link: string;
    variant: "primary" | "outline";
  }>;
}

export default function Hero({
  backgroundImage,
  title,
  description,
  features,
  buttons,
}: HeroProps) {
  const navigate = useRouter();
  const backgroundImageUrl = useMediaByExactTitle(backgroundImage);

  return (
    <div className="relative min-h-screen w-full">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url("${backgroundImageUrl?.data}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Navbar */}
      <div className="relative z-20">
        <Navbar type="hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 min-h-screen flex items-center pt-10">
        <div className="max-w-3xl pt-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {title}
          </h1>

          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            {buttons.map((button, index) => (
              <Button
                key={index}
                onClick={() => navigate.push(button.link)}
                className={
                  button.variant === "primary"
                    ? "bg-white text-background hover:bg-white/90 transition-colors px-8 py-4 rounded-lg text-base font-semibold flex items-center gap-2"
                    : "bg-transparent border-2 border-white text-white hover:bg-white/10 transition-colors px-8 py-4 rounded-lg text-base font-semibold flex items-center gap-2"
                }
              >
                <Icon icon={button.icon} className="text-xl" />
                {button.text}
              </Button>
            ))}
          </div>

          {/* Key Features */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-lg"
              >
                <Icon
                  icon={feature.icon}
                  className="text-3xl text-white mb-4"
                />
                <h3 className="text-white text-lg font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/80 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

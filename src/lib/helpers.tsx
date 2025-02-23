import React from "react";
import { cn } from "./utils";
import { Icon } from "@iconify/react";
interface GlassProps extends React.HTMLProps<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'bordered' | 'floating' | 'minimal';
  effect?: 'none' | 'hover' | 'active';
  gradient?: 'none' | 'blue' | 'purple' | 'cyan' | 'success' | 'warning' | 'danger' | 'neutral';
  pattern?: 'none' | 'dots' | 'circles' | 'waves' | 'grid';
  showPlane?: boolean;
}

export default function Glass({
  children,
  className,
  variant = 'default',
  effect = 'none',
  gradient = 'none',
  pattern = 'grid',
  showPlane = true,
  ...props
}: GlassProps) {
  const variants = {
    default: "bg-white border border-black/5 shadow-xl",
    bordered: "bg-white border-2 border-black/10 shadow-lg",
    floating: "bg-white/90 backdrop-blur-sm shadow-2xl",
    minimal: "bg-white/80 border border-black/5 shadow-sm"
  };

  const effects = {
    none: "",
    hover: "transition-all duration-300 hover:shadow-2xl hover:-translate-y-1",
    active: "transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
  };

  const gradients = {
    none: "",
    blue: "bg-[linear-gradient(to_right,rgba(239,246,255,0.3)_0%,rgba(239,246,255,0.3)_30%,#ffffff_100%)]",
    purple: "bg-[linear-gradient(to_right,rgba(250,245,255,0.3)_0%,rgba(250,245,255,0.3)_30%,#ffffff_100%)]",
    cyan: "bg-[linear-gradient(to_right,rgba(236,254,255,0.3)_0%,rgba(236,254,255,0.3)_30%,#ffffff_100%)]",
    success: "bg-[linear-gradient(to_right,rgba(240,253,244,0.3)_0%,rgba(240,253,244,0.3)_30%,#ffffff_100%)]",
    warning: "bg-[linear-gradient(to_right,rgba(254,252,232,0.3)_0%,rgba(254,252,232,0.3)_30%,#ffffff_100%)]",
    danger: "bg-[linear-gradient(to_right,rgba(254,242,242,0.3)_0%,rgba(254,242,242,0.3)_30%,#ffffff_100%)]",
    neutral: "bg-[linear-gradient(to_right,rgba(249,250,251,0.3)_0%,rgba(249,250,251,0.3)_30%,#ffffff_100%)]"
  };

  return (
    <div
      className={cn(
        "flex flex-col w-full mx-auto py-12 px-12 gap-10 rounded-2xl",
        gradient === 'none' ? variants[variant] : gradients[gradient],
        effects[effect],
        "relative overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Top right decorative elements with fixed positioning */}
      <div className="absolute -top-12 -right-12 w-44 h-44 flex items-center justify-center">
        {/* Circle shape */}
        <div className="absolute inset-0 bg-primary/5 rounded-full" />
        
        {/* Centered plane icon */}
        {showPlane && (
         <Icon icon="mdi:plane" className="w-12 h-12 transform -rotate-45 text-primary/20 animate-pulse relative" />
        )}
      </div>

      {/* Background patterns */}
      {pattern === 'dots' && (
        <div className="absolute inset-0 opacity-[0.2]">
          <div className="absolute inset-0" 
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.1) 1px, transparent 0)',
              backgroundSize: '20px 20px'
            }}
          />
        </div>
      )}

      {pattern === 'circles' && (
        <div className="absolute inset-0 opacity-[0.2]">
          <div className="absolute top-0 left-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
        </div>
      )}

      {pattern === 'waves' && (
        <div className="absolute inset-0 opacity-[0.2]">
          <div className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(45deg, transparent 45%, rgba(0,0,0,0.05) 45%, rgba(0,0,0,0.05) 55%, transparent 55%),
                linear-gradient(-45deg, transparent 45%, rgba(0,0,0,0.05) 45%, rgba(0,0,0,0.05) 55%, transparent 55%)
              `,
              backgroundSize: '20px 20px'
            }}
          />
        </div>
      )}

      {pattern === 'grid' && (
        <div className="absolute inset-0 opacity-[0.2]">
          <div className="absolute inset-0" 
            style={{
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-10">
        {children}
      </div>
    </div>
  );
}

// Usage examples:
// <Glass gradient="blue">
//   Content with left gradient and plane
// </Glass>
//
// <Glass gradient="purple" showPlane={false}>
//   Content without plane icon
// </Glass>

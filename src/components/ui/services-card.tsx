"use client";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

export const ServicesCard = ({
  title,
  description,
  icon,
  ...props
}: {
  title?: string | React.ReactNode;
  description?: string;
  icon?: string;
  onClick?: string;
}) => {
  const {onClick} = props;
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      router.push(onClick);
    }
  };

  return (
    <div className={cn("group relative", onClick && "cursor-pointer")}>
      <div className="relative h-full overflow-hidden rounded-3xl bg-gradient-to-b from-white/90 via-white/80 to-white/40 p-8
                    backdrop-blur-xl backdrop-saturate-150
                    border border-white/20
                    transition-all duration-300 ease-out
                    hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)]
                    dark:from-gray-900/90 dark:via-gray-900/80 dark:to-gray-900/40
                    dark:border-white/[0.08]"
                    onClick={handleClick}
                    >
        
        {/* Background Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/0 via-background/[0.07] to-background/0 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Mesh Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />

        {/* Icon Container */}
        <div className="relative mb-8">
          <div className="relative inline-block">
            {/* Icon Background Blur */}
            <div className="absolute inset-0 bg-background/20 blur-2xl rounded-full transform -translate-y-1/2" />
            
            {/* Icon Circle */}
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl
                          bg-gradient-to-br from-background to-background/80
                          shadow-lg shadow-background/25
                          transform group-hover:scale-110 group-hover:-rotate-6
                          transition-all duration-300 ease-out">
              <Icon 
                icon={icon || "carbon:cloud-service-management"} 
                className="h-7 w-7 text-white transform group-hover:scale-110 transition-transform duration-300" 
              />
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="relative space-y-4">
          {/* Title */}
          <div className="relative">
            {typeof title === "string" ? (
              <h3 className="text-xl font-semibold leading-tight
                         bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900
                         dark:from-white dark:via-gray-100 dark:to-white
                         bg-clip-text text-transparent
                         group-hover:bg-gradient-to-r group-hover:from-background group-hover:to-background/80
                         transition-all duration-300">
                {title}
              </h3>
            ) : (
              title
            )}
          </div>

          {/* Description */}
          <div className="relative">
          <div dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 -mt-6 -mr-6 h-24 w-24 rounded-full 
                     bg-gradient-to-br from-background/30 to-background/30 blur-2xl
                     opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-0 left-0 -mb-6 -ml-6 h-24 w-24 rounded-full 
                     bg-gradient-to-tr from-background/30 to-background/30 blur-2xl
                     opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </div>
  );
};

// Usage Example:
{/* 
<ServicesCard
  icon="carbon:document"
  title="Immigration Services"
  description="Comprehensive immigration services tailored to your needs."
/> 
*/}

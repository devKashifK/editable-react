"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { Link } from "react-router-dom";

export function truncateTextHeading(text, count = 2) {
  const words = text.split(" ");
  return words.slice(0, count).join(" ");
}

export const NewsFeedCard = ({
  image,
  title,
  subTitle,
  date,
  description,
  id,
  slug,
}: {
  image?: string;
  title?: string;
  subTitle?: string;
  date?: string;
  description?: string;
  id?: string;
  slug?: string;
}) => {
  const router = useRouter();
console.log(slug , "checkSlug")
  const handleNavigation = () => {
    if (slug) {
      router.push(`/tin-tuc/${slug}`);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="group relative overflow-hidden rounded-xl border bg-gradient-to-br from-white/95 via-white/90 to-white/85 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.1)]">
        {/* Image Container */}
        <div 
          className="aspect-[16/9] overflow-hidden relative cursor-pointer" 
          onClick={handleNavigation}
        >
          <img
            src={image ? image : getRandomImage()}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            alt={title}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content Container */}
        <div className="flex h-[300px] flex-col p-6 relative">
          {/* Category Tag */}
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-xs font-medium text-background bg-slate-100 rounded-full">
              News
            </span>
          </div>

          {/* Clickable content area */}
          <div 
            className="flex-1 cursor-pointer" 
            onClick={handleNavigation}
          >
            <div className="flex-1">
              <h3 className="mb-3 text-xl font-bold tracking-tight text-slate-900 line-clamp-2 transition-colors duration-300 group-hover:text-background">
                {title}
              </h3>
              {description && (
                <p
                  dangerouslySetInnerHTML={{
                    __html: truncateTextHeading(description, 25),
                  }}
                  className="text-sm leading-relaxed text-slate-600 line-clamp-3"
                />
              )}
            </div>
          </div>

          {/* Footer Section */}
          <div className="mt-6 flex relative z-10 items-center justify-between border-t border-slate-100 pt-6">
            <div className="flex items-center text-sm text-slate-500">
              <Icon icon="carbon:time" className="mr-2 h-4 w-4" />
              <span className="font-medium">{date}</span>
            </div>
            
            <button
              onClick={handleNavigation}
              className="inline-flex items-center gap-2 rounded-full bg-background px-5 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-background/90 hover:gap-3"
            >
              Xem thêm
              <Icon icon="carbon:arrow-right" className="h-4 w-4" />
            </button>
          </div>

          {/* Subtle gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-br from-background/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-background/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>
    </div>
  );
};

function getRandomImage() {
  const images = [
    "/aaa.jpg",
    "/about.png",
    "/alberta.jpg",
    "/british.jpg",
    "/canada.jpg",
    "/cost.jpg",
    "/business.jpg",
    "/experince.jpg",
    "/expressEntry.png",
    "/family.jpg",
    "/federalSkill.jpg",
    "/foru1.png",
    "/foru2.png",
    "immigrate.jpg",
    "immigration.png",
  ];
  return images[Math.floor(Math.random() * images.length)];
}

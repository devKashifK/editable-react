"use client";
import Navbar from "./navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "./button";
import { useMediaByExactTitle } from "./use-media";
export default function HeroDefault({
  backgroundImage,
  title,
  description,
}: {
  title?: string;
  backgroundImage?: string;
  description?: string;
}) {
  const pathName = usePathname();

  const lastPath = pathName.split("/").pop();

  const backgroundImageUrl = useMediaByExactTitle(backgroundImage);

  return (
    <section className="relative min-h-screen bg-white">
      <Navbar defaultStyle={true} />

      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-white" />
        <div 
          className="absolute top-0 right-0 w-[55%] h-full bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${backgroundImageUrl?.data})`,
            clipPath: 'polygon(15% 0, 100% 0%, 100% 100%, 0% 100%)'
          }}
        >
          <div className="absolute inset-0 bg-black/10" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="min-h-[calc(100vh-80px)] flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl py-20"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-4"
            >
              <div className="text-sm text-gray-500">
                <Link href="/" className="hover:text-gray-900 transition-colors duration-200">
                  Trang chủ
                </Link>
                {" "}/{" "}
                <span className="text-gray-900">{lastPath}</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6"
              dangerouslySetInnerHTML={{ 
                __html: title || "Data to enrich your business journey" 
              }}
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-600 mb-8"
            >
              {description || "We help businesses transform their data into actionable insights. Discover how our solutions can drive your success forward."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
               <Button
                asChild
                size="lg"
                className="border-gray-900 bg-background text-white hover:bg-gray-50 hover:text-gray-900"
              >
                <Link href="/ve-icanpr">Về iCanPR</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-gray-900 text-white hover:bg-gray-800"
              >
                <Link href="/lien-he">Liên hệ</Link>
              </Button>
             
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none z-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>
    </section>
  );
}

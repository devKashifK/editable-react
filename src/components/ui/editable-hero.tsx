"use client";
import Navbar from "./navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "./button";
import { ImageUploaderAndPicker } from "./image-picker";
import { useMediaByExactTitle } from "./use-media";

interface EditableHeroProps {
  title?: string;
  description?: string;
  backgroundImage?: string;
  onChange?: (newProps: Partial<EditableHeroProps>) => void;
  editable?: boolean;
}

export function EditableHeroDefault({
  title = "Data to enrich your business journey",
  description = "We help businesses transform their data into actionable insights. Discover how our solutions can drive your success forward.",
  backgroundImage = "/hero-default.jpg",
  onChange,
  editable = false,
}: EditableHeroProps) {
  const pathName = usePathname();
  const lastPath = pathName.split("/").pop();
  const backgroundImageUrl = useMediaByExactTitle(backgroundImage);

  const handleChange = (field: string, value: any) => {
    if (onChange) {
      onChange({ [field]: value });
    }
  };

  return (
    <section className="relative min-h-screen bg-white">
      <Navbar defaultStyle={true} />
          <div className="relative z-[100] ">
              <ImageUploaderAndPicker
                onChange={(newImage) => handleChange("backgroundImage", newImage)}
              />
     </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="min-h-[calc(100vh-80px)] flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl py-20"
          >
            {/* Breadcrumbs */}
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

            {/* Editable Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 outline-none"
              contentEditable={editable}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleChange("title", e.currentTarget.textContent)}
              dangerouslySetInnerHTML={{ __html: title }}
            />

            {/* Editable Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-600 mb-8 outline-none"
              contentEditable={editable}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleChange("description", e.currentTarget.textContent)}
            >
              {description}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                asChild
                size="lg"
                className="bg-gray-900 text-white hover:bg-gray-800"
              >
                <Link href="/contact">Get Started</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-gray-900 text-gray-900 hover:bg-gray-50"
              >
                <Link href="/about">Learn More</Link>
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
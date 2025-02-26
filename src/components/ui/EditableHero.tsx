"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import { Button } from "./custom";
import Navbar from "./navbar";
import { ImageUploaderAndPicker } from "./image-picker";
import { useMediaByExactTitle } from "./use-media";

interface HeroProps {
  backgroundImage?: string;
  title?: string;
  description?: string;
  features?: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

interface EditableHeroProps extends HeroProps {
  onChange?: (newProps: Partial<HeroProps>) => void;
  editable?: boolean;
}

export default function EditableHero({
  backgroundImage = "/hero-33.jpg",
  title = "Hiện Thực Hóa Giấc Mơ Canada Của Bạn",
  description = "Hành trình đến Canada của bạn bắt đầu từ đây. Chúng tôi cung cấp dịch vụ di trú toàn diện được thiết kế riêng cho nhu cầu của bạn, đảm bảo quá trình chuyển đổi suôn sẻ đến cuộc sống mới tại Canada.",
  features = [
    {
      icon: "carbon:document",
      title: "Giải Pháp Di Trú",
      description:
        "Chiến lược di trú được thiết kế riêng cho từng hoàn cảnh cụ thể của bạn",
    },
    {
      icon: "carbon:partnership",
      title: "Kết Nối Việc Làm",
      description: "Kết nối trực tiếp với các nhà tuyển dụng tại Canada",
    },
    {
      icon: "carbon:home",
      title: "Hỗ Trợ Định Cư",
      description: "Hỗ trợ toàn diện cho cuộc sống mới của bạn tại Canada",
    },
  ],
  onChange,
  editable = false,
}: EditableHeroProps) {
  const navigate = useRouter();
  const backgroundImageUrl = useMediaByExactTitle(backgroundImage);

  const handleChange = (field: string, value: any) => {
    if (onChange) {
      onChange({ [field]: value });
    }
  };

  const handleFeatureChange = (index: number, field: string, value: string) => {
    if (onChange && features) {
      const newFeatures = [...features];
      newFeatures[index] = { ...newFeatures[index], [field]: value };
      handleChange("features", newFeatures);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-black">
      {/* Background Image with Overlay */}
      <div className="absolute right-0 top-[100px] z-[10000000000]">
        {editable ? (
            <ImageUploaderAndPicker
              onChange={(newImage) => handleChange("backgroundImage", newImage)}
            />
        ) : (
          <div
            style={{
              backgroundImage: `url("${backgroundImageUrl?.data}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-black/50" />
          </div>
        )}
      </div>

      {/* Navbar */}
      <div className="relative z-20">
        <Navbar type="hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="max-w-3xl pt-20">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 outline-none"
            contentEditable={editable}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleChange("title", e.currentTarget.textContent)}
          >
            {title}
          </h1>

          <div
            className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed outline-none"
            contentEditable={editable}
            suppressContentEditableWarning={true}
            onBlur={(e) =>
              handleChange("description", e.currentTarget.textContent)
            }
          >
            {description}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => navigate.push("/lien-he")}
              className="bg-white text-background hover:bg-white/90 transition-colors px-8 py-4 rounded-lg text-base font-semibold flex items-center gap-2"
            >
              <Icon
                icon="teenyicons:appointments-outline"
                className="text-xl"
              />
              Tư Vấn Miễn Phí
            </Button>

            <Button
              onClick={() => navigate.push("/dich-vu")}
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 transition-colors px-8 py-4 rounded-lg text-base font-semibold flex items-center gap-2"
            >
              <Icon icon="carbon:service" className="text-xl" />
              Dịch Vụ Của Chúng Tôi
            </Button>
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
                <h3
                  className="text-white text-lg font-semibold mb-2 outline-none"
                  contentEditable={editable}
                  suppressContentEditableWarning={true}
                  onBlur={(e) =>
                    handleFeatureChange(
                      index,
                      "title",
                      e.currentTarget.textContent || ""
                    )
                  }
                >
                  {feature.title}
                </h3>
                <p
                  className="text-white/80 text-sm outline-none"
                  contentEditable={editable}
                  suppressContentEditableWarning={true}
                  onBlur={(e) =>
                    handleFeatureChange(
                      index,
                      "description",
                      e.currentTarget.textContent || ""
                    )
                  }
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

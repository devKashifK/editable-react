import React from "react";
import Container from "./container";
import Link from "next/link";
import { Heart, GraduationCap, Briefcase, MapPin } from "lucide-react";
import { Icon } from "@iconify/react/dist/iconify.js";

interface Service {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

interface EditableOurServiceProps {
  services?: Service[];
  onChange: (newProps: Partial<EditableOurServiceProps>) => void;
}

function getGradientClass(index: number) {
  const gradients = [
    "bg-gradient-to-br from-blue-500 to-purple-600",
    "bg-gradient-to-br from-green-500 to-teal-600",
    "bg-gradient-to-br from-yellow-500 to-orange-600",
    "bg-gradient-to-br from-pink-500 to-red-600",
  ];
  return gradients[index % gradients.length];
}

export default function EditableOurService({
  services = [],
  onChange,
}: EditableOurServiceProps) {
  const handleServiceChange = (index: number, newService: Partial<Service>) => {
    const updatedServices = [...services];
    updatedServices[index] = {
      ...updatedServices[index],
      ...newService,
      // Preserve the icon to avoid converting it to an invalid React child
      icon: updatedServices[index].icon,
    };
    onChange({ services: updatedServices });
  };


  console.log(services , "check services");

  return (
    <Container effect="none" className="w-full py-16">
      <div className="container px-4 md:px-6 mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) =>
            onChange({ title: e.currentTarget.textContent || "" })
          }
        >
          Dịch vụ nổi bật của ICanPR
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden group relative"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div
                    className={`w-16 h-16 rounded-lg flex items-center justify-center ${getGradientClass(
                      index
                    )}`}
                  >
                   <Icon icon={service.icon} className="w-16 h-16 text-white" />
                  </div>
                  <h3
                    className="text-xl font-semibold ml-4 outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 rounded px-1"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      handleServiceChange(index, {
                        title: e.currentTarget.textContent || "",
                      })
                    }
                  >
                    {service.title}
                  </h3>
                </div>
                <div
                  className="text-gray-600 outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 rounded px-1"
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    handleServiceChange(index, {
                      description: e.currentTarget.textContent || "",
                    })
                  }
                >
                  {service.description}
                </div>
                <div className="mt-4">
                  <div
                    className="text-blue-600 hover:text-blue-700 outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 rounded px-1"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      handleServiceChange(index, {
                        ctaText: e.currentTarget.textContent || "",
                      })
                    }
                  >
                    {service.ctaText}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

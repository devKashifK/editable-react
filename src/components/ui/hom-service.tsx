import React from "react";
import Container from "./container";
import Title from "./Title";
import { Heart, GraduationCap, Briefcase, MapPin } from "lucide-react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";

// export default function OurService() {
//   return (
//     <Container>
//       <Title title={"Dịch vụ nổi bật của ICanPR"} />
//       <div className="flex flex-col gap-1 lg:flex-row lg:gap-2 ">
//         {ourService.map((item, index) => (
//           <HoverCard
//             className=""
//             title={item.title}
//             description={item.description}
//             key={index}
//           />
//         ))}
//       </div>
//     </Container>
//   );
// }

// const services = [
//   {
//     icon: <MapPin className="h-8 w-8 text-white" />,
//     title: "Định cư Canada",
//     description: "Chọn Canada để định cư là một quyết định thay đổi cuộc đời. Canada nổi tiếng với chất lượng cuộc sống, sự đa dạng văn hóa và hứa hẹn nhiều cơ hội. Hãy cùng tìm kiếm lựa chọn phù hợp nhất cho gia đình bạn."
//   },
//   {
//     icon: <Briefcase className="h-8 w-8 text-white" />,
//     title: "Làm việc tại Canada",
//     description: "Canada với nhiều cơ hội việc làm đa dạng, thúc đẩy sự phát triển nghề nghiệp và trải nghiệm toàn cầu. Là một quốc gia phồn thịnh và thân thiện đang chào đón các chuyên gia có kỹ năng và người lao động thời vụ."
//   },
//   {
//     icon: <GraduationCap className="h-8 w-8 text-white" />,
//     title: "Du học tại Canada",
//     description: "Học tập tại Canada chắc chắn mang đến cho bạn một giáo dục hàng đầu thế giới, sự đa dạng văn hóa phong phú và một lối đi tới tương lai đầy triển vọng, tất cả trong một môi trường thân thiện và mở cửa, đón nhận sự đa dạng."
//   },
//   {
//     icon: <Heart className="h-8 w-8 text-white" />,
//     title: "Bảo Lãnh",
//     description: "Với kiến thức chuyên sâu về luật di trú và quy trình đoàn tụ gia đình tại Canada, chúng tôi cam kết hỗ trợ bạn trong việc kết nối với người thân yêu của mình, tạo nên những khoảnh khắc đáng trân trọng và ấm áp tại Canada."
//   }
// ]

export default function OurService({services = []}) {

  return (
    <Container className="w-full py-24">
      <div className="container mx-auto px-4">
        <Title 
          title="Dịch vụ nổi bật của ICanPR"
          className="mb-20"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {services.map((service) => (
            <Link
              href={service.ctaLink}
              key={service.id}
              className="group relative"
            >
              {/* Card */}
              <div className="relative overflow-hidden rounded-xl bg-white p-8 transition-all duration-500
                            hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]
                            border border-gray-100">
                {/* Icon & Title Section */}
                <div className="flex items-start gap-6 mb-8">
                  {/* Icon Container */}
                  <div className="relative">
                    <div className="w-14 h-14 flex items-center justify-center rounded-xl
                                bg-gray-50 group-hover:bg-background transition-colors duration-300">
                    
                      <Icon icon={service.icon} className="w-10 h-10 text-black" />
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 pt-3 group-hover:text-background transition-colors duration-300">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-8">
                  {service.description}
                </p>

                {/* CTA Link with underline animation */}
                <div className="inline-flex items-center text-gray-600 group-hover:text-background transition-colors duration-300">
                  <span className="relative">
                    <span className="font-medium">{service.ctaText}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-background 
                                 group-hover:w-full transition-all duration-300 ease-in-out" />
                  </span>
                  <svg 
                    className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-all duration-300" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M17 8l4 4m0 0l-4 4m4-4H3" 
                    />
                  </svg>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 h-[200px] w-[200px] bg-gray-50 rounded-full 
                              -translate-y-1/2 translate-x-1/2 group-hover:bg-background/5 
                              transition-colors duration-500 blur-3xl opacity-0 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 h-[200px] w-[200px] bg-gray-50 rounded-full 
                              translate-y-1/2 -translate-x-1/2 group-hover:bg-background/5 
                              transition-colors duration-500 blur-3xl opacity-0 group-hover:opacity-100" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}

const ourService = [
  {
    id: "settle-in-canada",
    icon: <MapPin />,
    title: "Định cư Canada",
    description: "Chọn Canada để định cư là một quyết định thú vị và thay đổi cuộc đời. Canada nổi tiếng với chất lượng cuộc sống, sự đa dạng văn hóa và hứa hẹn nhiều cơ hội. Hãy cùng tìm kiếm lựa chọn định cư phù hợp nhất cho gia đình bạn!",
    ctaText: "Tìm hiểu thêm",
    ctaLink: "/immigration/dinh-cu-canada",
  },
  {
    id: "work-in-canada",
    title: "Làm việc tại Canada",
    icon: <Briefcase />,
    description: "Canada với nhiều cơ hội việc làm đa dạng, thúc đẩy sự phát triển nghề nghiệp và trải nghiệm toàn cầu. Là một quốc gia phồn thịnh và thân thiện đang chào đón các chuyên gia có kỹ năng và người lao động thời vụ.",
    ctaText: "Khám phá cơ hội",
    ctaLink: "/immigration/nhap-canh-nhanh/cong-nhan-lanh-nghe-lien-bang",
  },
  {
    id: "study-in-canada",
    icon: <GraduationCap />,
    title: "Du học tại Canada",
    description: "Học tập tại Canada chắc chắn mang đến cho bạn một giáo dục hàng đầu thế giới, sự đa dạng văn hóa phong phú và một lối đi tới tương lai đầy triển vọng, tất cả trong một môi trường thân thiện và mở cửa, đón nhận sự đa dạng.",
    ctaText: "Tìm hiểu chương trình",
    ctaLink: "/immigration/du-hoc-dinh-cu",
  },
  {
    id: "family-sponsorship",
    icon: <Heart />,
    title: "Bảo Lãnh",
    description: "Với kiến thức chuyên sâu về luật di trú và quy trình đoàn tụ gia đình tại Canada, chúng tôi cam kết hỗ trợ bạn trong việc kết nối và tái hợp với người thân yêu của mình, tạo nên những khoảnh khắc đáng trân trọng và ấm áp tại Canada.",
    ctaText: "Xem thêm chi tiết",
    ctaLink: "/immigration/family-sponsorship",
  },
];

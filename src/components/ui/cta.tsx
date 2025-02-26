"use client";
import React from "react";
import { Button } from "./custom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Title from "./Title";
import Container from "./container";
import Link from "next/link";
import MediaItem from "./media-item";
import { useMediaByExactTitle } from "./use-media";

export default function CTA() {
  return (
    <>
      <Container
        effect="none"
        className="flex flex-col mx-auto  md:flex-row relative"
      >
        <div className="flex gap-4 min-h-screen  mx-auto">
          <div className="flex-1 items-center justify-center grid grid-cols-1 md:grid-cols-2 gap-10  relative ">
            {CtaDetails.map((item, index) => (
              <CtaCard item={item} key={item.id} />
            ))}
          </div>
        </div>
      </Container>
      <Container effect="slide-left" className="flex md:hidden mx-auto">
        <Title
          title={
            <p className="text-2xl md:text-5xl  text-black/50 w-full !text-left">
              Comprehensive solutions for <br /> all your needs!
            </p>
          }
          to={""}
          subtitle={"WHAT ARE YOU LOOKING FOR?"}
          cta={"All Solutions"}
        />
        <div className="flex gap-4 min-h-screen h-max w-[90%] mx-auto pt-80 lg:pt-96 md:py-0">
          <div className="w-full items-center justify-center flex flex-col space-y-96">
            {CtaDetails.slice(0, CtaDetails.length - 1).map((item, index) => (
              <CtaCard2 item={item} key={item.id} flip={true} />
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}

export const CtaCard = ({ item }) => {
  return (
    <div className="flex hover:bg-background group flex-col  bg-content px-4 py-4 border-gray-100 shadow-md  sm:w-[420px] md:w-full h-[517px] md:h-max justify-start items-center transition-all duration-100 ease-in-out">
      <div className="w-full">
        <MediaItem title={item.image} className="h-[250px] lg:h-[370px]" />
      </div>
      <div className="px-8 flex flex-col gap-2 py-5">
        <div className="flex flex-col gap-0">
          <h5 className="text-4xl text-left text-background group-hover:text-white">
            {item.title}
          </h5>
          {/* <p className="text-sm text-left text-black/70">
            {truncateTextHeading(item.subtitle)}
          </p> */}
        </div>
        <p className="text-xs text-left text-black/80 group-hover:text-white">
          {truncateText(item.description)}...{" "}
          <span className="text-black group-hover:text-white">Đọc thêm</span>
        </p>
        <div className="w-full flex justify-end items-end mt-4">
          <Link
            // to={item.href}
            href={item.href}
            className="bg-background group-hover:bg-white group-hover:text-background text-white  py-1 shadow-xl px-4  text-sm w-max"
          >
            Tìm hiểu thêm
          </Link>
        </div>
      </div>
    </div>
  );
};

export const CtaCard2 = ({ item, flip }) => {
  return (
    <div
      className={cn(
        "w-full md:w-[520px] h-[220px] flex md:flex-row flex-col items-center relative ",
        flip ? "justify-end" : "justify-start"
      )}
    >
      <div className="w-full lg:w-[45%] ">
        <img
          src={item.image}
          alt={item.title}
          className={cn(
            "!h-[250px] w-full lg:h-[220px] bg-cover z-10 relative"
          )}
        />
      </div>
      <div
        className={cn(
          "px-8 w-full lg:w-[330px] h-[330px] lg:h-[236px] relative md:absolute lg:-ml-6 shadow-md  z-20 border-gray-100 backdrop-blur-3xl bg-opacity-10 bg-clip-padding backdrop-filter bg-gray-100 flex flex-col gap-2 py-5",
          flip ? "lg:left-2" : "-right-[30%] lg:-right-6"
        )}
      >
        <div className="flex flex-col justify-center r gap-0">
          <h5 className="text-4xl text-left text-highlight">{item.title}</h5>
          {/* <p className="text-sm text-left text-black/70">
            {truncateTextHeading(item.subtitle)}
          </p> */}
        </div>

        <p className="text-xs text-left text-black/80">
          {truncateText(item.description)}...{" "}
          <span className="text-black">Xem thêm</span>
        </p>
        <div className="w-full flex justify-end items-end mt-4">
          <Link
            // to={item.href}
            href={item.href}
            className="bg-background text-white py-1 shadow-xl px-4 rounded-md text-sm w-max"
          >
            Know More
          </Link>
        </div>
      </div>
    </div>
  );
};

export function truncateText(text) {
  const words = text.split(" ");
  return words.slice(0, 35).join(" ");
}
export function truncateTextHeading(text) {
  const words = text.split(" ");
  return words.slice(0, 9).join(" ");
}

const CtaDetails = [
  {
    id: 1,
    image: "Immigration",
    title: "Nhập cư",
    subtitle:
      "Exploring Canada for immigration is an exciting and life-altering choice.",
    labels: ["Express Entry Program", "Family Sponsorship"],
    description:
      "Với việc định cư tại Canada đạt mức cao kỷ lục, bây giờ là thời điểm lý tưởng để bắt đầu hành trình di cư của bạn. Có nhiều con đường để nhập cư vào Canada và đạt được quyền cư trú lâu dài. Mặc dù việc nhập cư vào Canada yêu cầu... ",
    href: "/immigration/dinh-cu-canada",
  },
  {
    id: 2,
    image: "work12",
    title: "Làm việc",
    subtitle:
      "Working in Canada offers a wide array of opportunities for skilled workers from around the world.",
    labels: ["Express Entry", "PR eligibility"],
    description:
      "Canada với nền kinh tế mạnh mẽ, chất lượng cuộc sống cao và xã hội hòa nhập, là điểm đến hấp dẫn cho những ai tìm kiếm sự phát triển nghề nghiệp và tiêu chuẩn sống cao cho gia đình của mình. Tuy nhiên, việc điều hướng quy trình nhập cư và.",
    href: "/immigration/nhap-canh-nhanh/cong-nhan-lanh-nghe-lien-bang",
  },
  {
    id: 3,
    title: "Kinh doanh",
    image: "business",
    subtitle:
      "Đầu tư và xây dựng doanh nghiệp của bạn trong khi đảm bảo quyền thường trú cho gia đình tại Canada. ",
    labels: ["Quebec Investor", "Start Up Visa"],
    description:
      "Các chương trình visa nhập cư doanh nghiệp tại Canada được thiết kế cho những cá nhân mong muốn nhập cư vào Canada để bắt đầu, đầu tư vào hoặc quản lý một doanh nghiệp. Các chương trình này nhằm thúc đẩy tăng trưởng kinh tế và tạo ra việc làm tại Canada.",
    href: "/immigration/viec-lam-dinh-cu",
  },
  {
    id: 4,
    title: "Học tập",
    image: "mom",
    subtitle:
      "Học tập tại Canada mang đến nền giáo dục hàng đầu, trải nghiệm văn hóa đa dạng và cơ hội tuyệt vời cho sự phát triển cá nhân và nghề nghiệp.",
    labels: ["High Quality Education", "Diverse Campuses and Programs"],
    description:
      "Canada nổi tiếng với các cơ sở giáo dục hàng đầu. Nhiều trường đại học và cao đẳng của Canada liên tục đứng trong danh sách những cơ sở giáo dục tốt nhất toàn cầu. Các bằng cấp và chứng chỉ của Canada được công nhận và tôn trọng trên toàn thế giới.",
    href: "/immigration/du-hoc-dinh-cu",
  },

  {
    id: 5,
    title: "Bảo lãnh gia đình",
    image: "family12",
    subtitle:
      "Chương trình cho phép các cá nhân đủ điều kiện bảo lãnh người thân gần gũi của họ để định cư lâu dài tại Canada.",
    labels: ["Sponsoring a spouse or partner", "Sponsoring dependent children"],
    description:
      "Ngoài các chương trình xin visa thông thường, mọi người cũng có thể nộp đơn xin visa hoặc thậm chí định cư vĩnh viễn dưới các chương trình bảo lãnh nhất định, cho phép các cá nhân đủ điều kiện bảo lãnh các thành viên gia đình gần gũi của họ để được định cư vĩnh viễn tại Canada.",
    href: "/immigration/family-sponsorship",
  },

  {
    id: 6,
    image: "not-sure",
    title: "Chưa chắc chắn?",
    subtitle:
      "Cảm thấy không chắc chắn về hành trình di cư của bạn? Đội ngũ dày dạn kinh nghiệm của ICAN sẵn sàng cung cấp hướng dẫn và hỗ trợ chuyên môn cho bạn!",
    labels: ["Why GTR Immigration?", "Reasonable cost guaranteed quality"],
    description:
      "Saskatchewan nổi bật là một tỉnh ở Canada với các chương trình di cư mở, phù hợp với nhiều cá nhân đang tìm kiếm cơ hội định cư tại quốc gia này..",
    href: "/book-appointment",
  },
];

export const CTADefault = ({
  title,
  subtitle,
  image,
  description,
  descriptionClassName,
  ...props
}: {
  title?: string;
  subtitle?: string | React.ReactNode;
  image?: string;
  description?: string | React.ReactNode;
  descriptionClassName?: string;
  onClick?: string;
}) => {
  const navigate = useRouter();
  const imageUrl = useMediaByExactTitle(image);

  return (
    <Container>
      <div
        className="relative overflow-hidden rounded-2xl bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${imageUrl.data})` }}
      >
        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/35 to-black/50"></div>

        {/* Content Container with reduced height */}
        <div className="relative z-[10] px-6 md:px-12 py-16 md:py-20">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-6">
            {/* Title Container */}
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                {title}
              </h2>
              {/* Refined underline */}
              <div className="flex justify-center items-center">
                <div className="w-16 h-[2px] bg-background/80"></div>
              </div>
            </div>

            {/* Subtitle with refined typography */}
            {typeof subtitle === "string" ? (
              <p className="text-lg md:text-xl text-white/90 font-medium tracking-wide">
                {subtitle}
              </p>
            ) : (
              subtitle
            )}

            {/* Description with improved layout */}
          
              <div className={cn(
                "text-base text-white/80 leading-relaxed max-w-2xl mx-auto", 
                descriptionClassName
              )} dangerouslySetInnerHTML={{ __html: description }} />
            

            {/* Refined CTA Button */}
            <Button
              onClick={() => navigate.push(props.onClick || "/lien-he")}
              className="mt-4 px-7 py-4 bg-background/95 hover:bg-background text-white rounded-full transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Icon icon={"mdi:phone"} className="w-4 h-4" />
                  <span className="text-white/95">+84 869967809</span>
                </div>
                <div className="h-4 w-[1px] bg-white/20"></div>
                <span>
                  Đặt lịch hẹn tư vấn miễn phí
                </span>
              </div>
            </Button>
          </div>
        </div>

        {/* Refined Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/30 to-transparent opacity-70"></div>
        <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-[400px] h-[400px] bg-background/5 rounded-full blur-3xl"></div>
      </div>
    </Container>
  );
};

export const CTAWithImage = ({
  subtitle,
  title,
  description,
  ctaAction,
  image,
  flip,
  desClassName,
  ...props
}: {
  subtitle?: string | React.ReactNode;
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  ctaAction?: string | React.ReactNode;
  image: string;
  flip?: boolean;
  link?: string;
  desClassName?: string;
}) => {
  const navigate = useRouter();
  return (
    <Container
      className={cn(
        "flex bg-gradient-to-br from-white/95 via-white/90 to-white/85 backdrop-blur-sm overflow-hidden rounded-[2.5rem] shadow-sm border border-white/20 min-h-[600px] group hover:shadow-3xl transition-all duration-500 py-0",
        flip ? "flex-col lg:flex-row-reverse" : "flex-col lg:flex-row"
      )}
    >
      {/* Image Section */}
      <div className="flex-1 relative overflow-hidden">
        <MediaItem 
          title={image} 
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.03]" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        <div className={cn(
          "absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-700",
          flip ? "from-transparent to-white/10" : "from-white/10 to-transparent"
        )}></div>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col p-12 lg:p-16 justify-center relative backdrop-blur-md bg-white/60">
        {/* Subtitle */}
        {subtitle && (
          <div className="mb-8">
            <div className="inline-flex items-center gap-3">
              <div className="h-px w-10 bg-background"></div>
              <span className="text-sm font-medium text-background/80 uppercase tracking-widest">
                {subtitle}
              </span>
            </div>
          </div>
        )}

        {/* Title */}
        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-8 tracking-tight leading-[1.15]">
          {title}
        </h2>

        {/* Description */}
      
          <div className={cn("prose max-w-xl text-gray-600 mb-10", desClassName)}>
          <div dangerouslySetInnerHTML={{ __html: description }} />
          </div>

        {/* CTA Button */}
          <div className="relative group/btn">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-background to-background/80 rounded-full blur opacity-0 group-hover/btn:opacity-100 transition duration-500"></div>
            <button
              onClick={() => navigate.push(props.onClick || "/lien-he")}
              className="relative flex items-center gap-3 px-8 py-4 bg-background hover:bg-background/90 text-white rounded-full transition-all duration-300 hover:scale-[1.02] text-sm font-medium"
            >
              <span className="transition-all duration-300 group-hover/btn:pr-2">
                {ctaAction}
              </span>
              <Icon 
                icon={"simple-icons:aircanada"} 
                className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" 
              />
            </button>
          </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-background/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-gray-900/5 rounded-full blur-2xl translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      </div>
    </Container>
  );
};

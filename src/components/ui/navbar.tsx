"use client";
import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { Button } from "./custom";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import MobileNavbar from "./mobile-navbar";
import { relative } from "path";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar({ defaultStyle = false, type = "default" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(null);
  const navigate = useRouter();

  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="lg:hidden flex py-2 z-50 relative bg-gray-100 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20 border-gray-100  px-8">
        <MobileNavbar
          config={mobileConfig}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
      <div
        className={cn(
          "hidden md:flex border-b h-24 justify-start items-center",
          "bg-content text-black z-[100000000]",
          isFixed ? "fixed w-full z-[100000000000]" : "relative"
        )}
      >
        <div className="h-full flex justify-center w-[400px] !bg-content items-center px-8 border-r border-background ">
          <img
            src="/logo.png"
            alt="logo"
            className="w-[95%] cursor-pointer"
            onClick={() => navigate.push("/")}
          />
        </div>
        <div className="flex flex-col w-full justify-start items-start h-24">
          <div
            className={cn(
              "w-full flex gap-5 py-2 justify-end items-center border-b border-background/40 px-16"
            )}
          >
            <Link
              href={"/ve-icanpr"}
              className="bg-transparent text-xs font-light flex flex-col gap-0.5 group"
            >
              <span className={"text-[#E54D2E] font-semibold text-[11px]"}>
                VỀ CHÚNG TÔI
              </span>
              <div className="group-hover:bg-background w-full border border-transparent ease-out duration-150"></div>
            </Link>
            <Link
              href={"/lmia-map"}
              className="bg-transparent text-xs font-light flex flex-col gap-0.5 group"
            >
              <span className={"text-[#E54D2E] font-semibold text-[11px]"}>
                BẢN ĐỒ LMIA
              </span>
              <div className="group-hover:bg-background w-full border border-transparent ease-out duration-150"></div>
            </Link>
            <Link
              href={"/cong-viec-nong"}
              className="bg-transparent text-xs font-light flex flex-col gap-0.5 group"
            >
              <span className={"text-[#E54D2E] font-semibold text-[11px]"}>
                {/* CÔNG VIỆC NÓNG */}
                BẢN ĐỒ VIỆC LÀM
              </span>
              <div className="group-hover:bg-background w-full border border-transparent ease-out duration-150"></div>
            </Link>

            <Link
              href={"/tin-tuc"}
              className="bg-transparent text-xs font-light flex flex-col gap-0.5 group"
            >
              <span className={"text-[#E54D2E] font-semibold text-[11px]"}>
                TIN TỨC
              </span>
              <div className="group-hover:bg-background w-full border border-transparent ease-out duration-150"></div>
            </Link>

            {/* <Link
              href="tel:+84869967809"
              className="text-xs flex font-light flex-col gap-0.5 group"
            >
              <span className={"text-[#E54D2E] font-semibold text-[11px]"}>
                TƯ VẤN +84 869967809
              </span>

              <div className="group-hover:bg-background w-full border border-transparent ease-out duration-150"></div>
            </Link>
            <Link
              href={"mailto:tuvan@icanpr.vn"}
              className="text-xs flex font-light flex-col gap-0.5 group"
            >
              <span className={"text-[#E54D2E] font-semibold text-[11px]"}>
                TUVAN@ICANPR.VN
              </span>
              <div className="group-hover:bg-background w-full border border-transparent ease-out duration-150"></div>
            </Link> */}
            <Link
              href={"/immigration/khach-hang-thanh-cong"}
              className="text-xs font-light flex flex-col gap-0.5 group"
            >
              <span className={"text-[#E54D2E] font-semibold text-[11px]"}>
                {/* BẢO ĐẢM */}
                KHÁCH HÀNG THÀNH CÔNG
              </span>
              <div className="group-hover:bg-background w-full border border-transparent ease-out duration-150"></div>
            </Link>
            <Link
              href={"/cong-viec-nong"}
              className="text-xs font-light flex flex-col gap-0.5 group"
            >
              <span className={"text-[#E54D2E] font-semibold text-[11px]"}>
                {/* BẢO ĐẢM */}
                Cong Viec Nong
              </span>
              <div className="group-hover:bg-background w-full border border-transparent ease-out duration-150"></div>
            </Link>

            <>
              <a
                href="https://api.whatsapp.com/send?phone=84869967809"
                target="_blank"
                className="text-xs bg-green-500 text-white px-3 rounded-sm justify-center items-center py-1 flex  gap-2 group w-max -mr-6"
              >
                <Icon icon={"mdi:whatsapp"} className="text-xl" />
              </a>
              <a
                href="https://zalo.me/84869967809"
                target="_blank"
                className="text-xs bg-blue-500 text-white px-3 rounded-sm justify-center items-center py-1 flex  gap-2 group w-max  ml-2"
              >
                <Icon icon={"simple-icons:zalo"} className="text-xl" />
              </a>
            </>
          </div>

          <div className="flex justify-start gap-4 items-center px-0 ml-4 w-full h-20">
            <NavigationMenu>
              <NavigationMenuList className="flex gap-0 py-0">
                {router.map((navItem) => (
                  <NavigationMenuItem
                    key={navItem.path}
                    className="relative min-w-12 !px-0"
                  >
                    {navItem.element ? (
                      <NavigationMenuLink
                        className={cn(
                          "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-highlight focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-highlight data-[state=open]:bg-highlight hover:bg-[#b33d3d] relative group bg-transparent "
                        )}
                      >
                        <Link
                          className={cn(
                            type === "default" &&
                              "text-white  group-hover:text-highlight"
                          )}
                          href={navItem.path}
                        >
                          {navItem.element}
                        </Link>
                      </NavigationMenuLink>
                    ) : (
                      <NavigationMenuTrigger
                        className={cn(
                          "bg-transparent text-[11px]  data-[state=open]:border-b-highlight data-[state=open]:border-b-2 py-0 data-[state=open]:text-highlight  border-r border-white/40  data-[state=open]:bg-transparent focus:border-highlight rounded-none h-[3.15rem] ml-0 font-bold relative"
                        )}
                      >
                        {navItem.path}
                      </NavigationMenuTrigger>
                    )}
                    {navItem.children && (
                      <NavigationMenuContent className="absolute bg-background border-none  rounded-none left-0 px-0 z-[100000000000000000000] h-max max-h-80 overflow-y-scroll overflow-visible">
                        <div className="w-[200px] z-[100000000000000000000] py-2">
                          {renderSubmenus(
                            navItem.children,
                            hoveredPath,
                            setHoveredPath
                          )}
                        </div>
                      </NavigationMenuContent>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* <div className="w-[110px]"></div> */}
      </div>
    </>
  );
}

const renderSubmenus = (submenus, hoveredPath, setHoveredPath) => {
  console.log(submenus, "checkSubMenus");
  return (
    <ul className=" z-[1000000000000000000] overflow-visible">
      {submenus.map((subPage) => (
        <li
          key={subPage.path}
          className="flex text-left w-full  border-highlight border-b last:border-b-0  "
          onMouseEnter={() => setHoveredPath(subPage.path)}
          onMouseLeave={() => setHoveredPath(null)}
        >
          {subPage.children ? (
            <div className="w-full z-[10000]  overflow-visible">
              <div
                className={cn(
                  "flex justify-between cursor-pointer items-center text-left text-sm px-2 w-full text-white rounded-md py-1 relative"
                )}
              >
                <span className="text-white">{subPage.path}</span>
                <Icon icon={"zondicons:cheveron-right"} />
              </div>
              {hoveredPath === subPage.path && (
                <div
                  className={`absolute top-0 left-[200px] z-[10000] w-[300px] bg-background text-left py-0.5 flex flex-col transition-all duration-300 transform ease-out z-1000000000`}
                >
                  {subPage.children.map((item) => (
                    <Link
                      key={item.path}
                      className="text-left hover:bg-[#b33d3d] text-text py-1  text-sm border-b last:border-b-0 px-2 w-full"
                      href={item.path}
                    >
                      <motion.div
                        // whileHover={{
                        //   scale: 1.01,
                        //   backgroundColor: "#b33d3d",
                        //   color: "#fff",
                        // }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="px-3 py-1 "
                      >
                        {item.element}
                      </motion.div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              target={subPage.external ? "_blank" : "_parent"}
              className="text-left hover:bg-[#b33d3d] text-text py-1  text-sm border-b last:border-b-0 px-2 w-full"
              href={subPage.path}
            >
              {subPage.element}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export const mobileConfig = [
  {
    // name: "Home",
    name: "Trang chủ",
    icon: "mdi:home",
    heading: "font-semibold text-green-800",
    pointer: "bg-green-700",
    active: "bg-green-300 border-green-600 text-green-800",
    activeIcon: "text-green-800",
    iconBg: "bg-green-700",
    apis: [
      {
        provider: "internal",
        // name: "Home",
        name: "Trang chủ",

        path: "/",
      },
    ],
  },
  {
    name: "ICANPR",
    icon: "mdi:information-outline",
    heading: "font-semibold text-blue-800",
    pointer: "bg-blue-700",
    active: "bg-blue-300 border-blue-600 text-blue-800",
    activeIcon: "text-blue-800",
    iconBg: "bg-blue-700",
    apis: [
      {
        provider: "internal",
        name: "Về iCanPR",
        path: "/ve-icanpr",
      },
      {
        provider: "internal",
        name: "Đối tác iCanPR",
        path: "/doi-tac-icanpr",
      },
      {
        provider: "internal",
        name: "Liên hệ",
        path: "/lien-he",
      },
    ],
  },
  {
    name: "Express Entry",
    icon: "mdi:airplane-takeoff",
    heading: "font-semibold text-red-800",
    pointer: "bg-red-700",
    active: "bg-red-300 border-red-600 text-red-800",
    activeIcon: "text-red-800",
    iconBg: "bg-red-700",
    apis: [
      {
        provider: "internal",
        name: "Công nhân lành nghề liên bang",
        path: "/immigration/nhap-canh-nhanh/cong-nhan-lanh-nghe-lien-bang",
      },
      {
        provider: "internal",
        name: "Thương mại tay nghề liên bang",
        path: "/immigration/nhap-canh-nhanh/thuong-mai-co-tay-nghe-lien-bang",
      },
      {
        provider: "internal",
        name: "Lớp trải nghiệm Canada",
        path: "/immigration/nhap-canh-nhanh/lop-hoc-trai-nghiem-canada",
      },
      {
        provider: "internal",
        name: "Tính điểm CRS",
        path: "/immigration/nhap-canh-nhanh/tinh-toan-diem-crs",
      },
    ],
  },
  {
    name: "Provincial Nominee Programs",
    icon: "mdi:map-marker-multiple-outline",
    heading: "font-semibold text-purple-800",
    pointer: "bg-purple-700",
    active: "bg-purple-300 border-purple-600 text-purple-800",
    activeIcon: "text-purple-800",
    iconBg: "bg-purple-700",
    apis: [
      {
        provider: "internal",
        name: "Alberta Nhap Cu (AAIP)",
        path: "/de-cu-tinh-bang-pnp/alberta-nhap-cu-aaip",
      },
      {
        provider: "internal",
        name: "British Columbia (BC PNP)",
        path: "/de-cu-tinh-bang-pnp/british-columbia-bcpnp",
      },
      {
        provider: "internal",
        name: "Ontario (OINP)",
        path: "/de-cu-tinh-bang-pnp/ontario-oinp",
      },
      {
        provider: "internal",
        name: "Manitoba (MPNP)",
        path: "/de-cu-tinh-bang-pnp/manitoba-mpnp",
      },
      {
        provider: "internal",
        name: "New Brunswick (NB PNP)",
        path: "/de-cu-tinh-bang-pnp/new-brunswick-nbpnp",
      },
      {
        provider: "internal",
        name: "Nova Scotia (NSNP)",
        path: "/de-cu-tinh-bang-pnp/nova-scotia-nsnp",
      },
      {
        provider: "internal",
        name: "Prince Edward Island (PEI PNP)",
        path: "/de-cu-tinh-bang-pnp/prince-edward-island-peipnp",
      },
      {
        provider: "internal",
        name: "Saskatchewan (SINP)",
        path: "/de-cu-tinh-bang-pnp/saskatchewan-sinp",
      },
      {
        provider: "internal",
        name: "Quebec (PNP)",
        path: "/de-cu-tinh-bang-pnp/quebec",
      },
      {
        provider: "internal",
        name: "Yukon (YNP)",
        path: "/de-cu-tinh-bang-pnp/yukon-ynp",
      },
    ],
  },
  {
    name: "Immigration",
    icon: "mdi:account-question-outline",
    heading: "font-semibold text-red-800",
    pointer: "bg-red-700",
    active: "bg-red-300 border-red-600 text-red-800",
    activeIcon: "text-red-800",
    iconBg: "bg-red-700",
    apis: [
      {
        provider: "internal",
        name: "Việc làm định cư",
        path: "/immigration/viec-lam-dinh-cu",
      },
      {
        provider: "internal",
        name: "Du học - định cư",
        path: "/immigration/du-hoc-dinh-cu",
      },
      {
        provider: "internal",
        name: "Doanh nghiệp C11 Visa",
        path: "/immigration/doanh-nghiep-c11-visa",
      },
      {
        provider: "internal",
        name: "Start Up Visa",
        path: "/immigration/start-up-visa",
      },
      {
        provider: "internal",
        name: "Bảo lãnh gia đình",
        path: "/immigration/bao-lanh-gia-dinh",
      },
      {
        provider: "internal",
        name: "Khách hàng thành công",
        path: "/immigration/khach-hang-thanh-cong",
      },
    ],
  },
  {
    name: "cac-tinh-bang-canada",
    icon: "mdi:briefcase-outline",
    heading: "font-semibold text-brown-800",
    pointer: "bg-brown-700",
    active: "bg-brown-300 border-brown-600 text-brown-800",
    activeIcon: "text-brown-800",
    iconBg: "bg-brown-700",
    apis: [
      {
        provider: "internal",
        name: "Alberta Tinh",
        path: "/cuoc-song-canada/cac-tinh-bang-canada/tinh-alberta",
      },
      {
        provider: "internal",
        name: "British Colombia (BC PNP)",
        path: "/cuoc-song-canada/cac-tinh-bang-canada/brcolumbiaP",
      },
      {
        provider: "internal",
        name: "Manitoba Tinh",
        path: "/cuoc-song-canada/cac-tinh-bang-canada/manitobaP",
      },
      {
        provider: "internal",
        name: "New Brunswick Tinh",
        path: "/cuoc-song-canada/cac-tinh-bang-canada/new-brunswickP",
      },
      {
        provider: "internal",
        name: "Newfoundland and Labrador",
        path: "/cuoc-song-canada/cac-tinh-bang-canada/newfoundland-labradorP",
      },
      {
        provider: "internal",
        name: "Northwest Territories Tinh",
        path: "/cuoc-song-canada/cac-tinh-bang-canada/northwest-territoriesP",
      },
      {
        provider: "internal",
        name: "Nova Scotia Tinh",
        path: "/cuoc-song-canada/cac-tinh-bang-canada/nova-scotiaP",
      },
      {
        provider: "internal",
        name: "Nunavut Tinh",
        path: "/cuoc-song-canada/cac-tinh-bang-canada/nunavutP",
      },
      {
        provider: "internal",
        name: "Ontario Tinh",
        path: "/cuoc-song-canada/cac-tinh-bang-canada/ontarioP",
      },
      {
        provider: "internal",
        name: "Prince Edward Island Tinh",
        path: "/cuoc-song-canada/cac-tinh-bang-canada/prince-edwardP",
      },
      {
        provider: "internal",
        name: "Saskatchewan Tinh",
        path: "/cuoc-song-canada/cac-tinh-bang-canada/ saskatchewanP",
      },
      {
        provider: "internal",
        name: "Yukon Tinh",
        path: "/cuoc-song-canada/cac-tinh-bang-canada/yukonP",
      },
    ],
  },
  {
    name: "cuoc-song-canada",
    icon: "mdi:briefcase-outline",
    heading: "font-semibold text-brown-800",
    pointer: "bg-brown-700",
    active: "bg-brown-300 border-brown-600 text-brown-800",
    activeIcon: "text-brown-800",
    iconBg: "bg-brown-700",
    apis: [
      {
        provider: "internal",
        name: "Môi trường Canada",
        path: "/cuoc-song-canada/moi-truong-canada",
      },
      {
        provider: "internal",
        name: "Văn hóa & tôn giáo",
        path: "/cuoc-song-canada/van-hoa-ton-gaio",
      },
      {
        provider: "internal",
        name: "Giáo dục Canada",
        path: "/cuoc-song-canada/giao-duc-canada",
      },
      {
        provider: "internal",
        name: "Y Tế",
        path: "/cuoc-song-canada/y-te",
      },
      {
        provider: "internal",
        name: "Tỷ giá đô Canada",
        path: "/cuoc-song-canada/ty-gia-do-canada",
      },
      {
        provider: "internal",
        name: "Chính sách thuế",
        path: "/cuoc-song-canada/chinh-sach-thue",
      },
    ],
  },
  {
    name: "thong-tin-huu-ich",
    icon: "mdi:briefcase-outline",
    heading: "font-semibold text-teal-800",
    pointer: "bg-teal-700",
    active: "bg-teal-300 border-teal-600 text-teal-800",
    activeIcon: "text-teal-800",
    iconBg: "bg-teal-700",
    apis: [
      {
        provider: "internal",
        name: "Câu hỏi thường gặp",
        path: "/thong-tin-huu-ich/cau-hoi-thuong-gap",
      },
      {
        provider: "internal",
        name: "Trang web hữu ích",
        path: "/thong-tin-huu-ich/trang-web-huu-ich",
      },
      {
        provider: "internal",
        name: "Thuật ngữ trong di trú",
        path: "/thong-tin-huu-ich/thuat-ngu-trong-di-tru",
      },
      {
        provider: "internal",
        name: "CLB là gì?",
        path: "/thong-tin-huu-ich/CLB-la-gi",
      },
    ],
  },
  {
    name: "Tuyen-dung",
    icon: "mdi:briefcase-check-outline",
    heading: "font-semibold text-orange-800",
    pointer: "bg-orange-700",
    active: "bg-orange-300 border-orange-600 text-orange-800",
    activeIcon: "text-orange-800",
    iconBg: "bg-orange-700",
    apis: [
      {
        provider: "internal",
        name: "Làm việc cho iCanPR",
        path: "/tuyen-dung/lam-viec-cho-icanpr",
      },
      {
        provider: "external",
        name: "Tổng hợp việc làm Canada",
        path: "https://jobs.icanpr.vn/jobs/Careers",
      },
      {
        provider: "external",
        name: "Công nhân trại gà",
        path: "https://icanpr.zohorecruit.com/jobs/Careers/777018000000558001/75119---General-Labour-C%C3%B4ng-nh%C3%A2n-n%C3%B4ng-tr%E1%BA%A1i-g%C3%A0?source=CareerSite",
      },
      {
        provider: "internal",
        name: "Đầu bếp Món Âu",
        path: "/tuyen-dung/dau-bep-mon-au",
      },
    ],
  },

  {
    name: "Công Việc",
    icon: "mdi:file-document-outline",
    heading: "font-semibold text-gray-800",
    pointer: "bg-gray-700",
    active: "bg-gray-300 border-gray-600 text-gray-800",
    activeIcon: "text-gray-800",
    iconBg: "bg-gray-700",
    apis: [
      {
        provider: "internal",
        name: "Công Việc",
        path: "/cong-viec-nong",
      },
    ],
  },

  {
    name: "Việc kinh doanh",
    icon: "mdi:file-document-outline",
    heading: "font-semibold text-gray-800",
    pointer: "bg-gray-700",
    active: "bg-gray-300 border-gray-600 text-gray-800",
    activeIcon: "text-gray-800",
    iconBg: "bg-gray-700",
    apis: [
      {
        provider: "internal",
        name: "Việc kinh doanh",
        path: "/doanh-nghiep",
      },
    ],
  },
  {
    name: "Bảo Lãnh",
    icon: "mdi:file-document-outline",
    heading: "font-semibold text-gray-800",
    pointer: "bg-gray-700",
    active: "bg-gray-300 border-gray-600 text-gray-800",
    activeIcon: "text-gray-800",
    iconBg: "bg-gray-700",
    apis: [
      {
        provider: "internal",
        name: "Bảo Lãnh",
        path: "/bảo-lãnh",
      },
    ],
  },
  {
    name: "Du-học",
    icon: "mdi:file-document-outline",
    heading: "font-semibold text-gray-800",
    pointer: "bg-gray-700",
    active: "bg-gray-300 border-gray-600 text-gray-800",
    activeIcon: "text-gray-800",
    iconBg: "bg-gray-700",
    apis: [
      {
        provider: "internal",
        name: "Du Học",
        path: "/du-học",
      },
    ],
  },
  {
    name: "Cau Hoi",
    icon: "mdi:file-document-outline",
    heading: "font-semibold text-gray-800",
    pointer: "bg-gray-700",
    active: "bg-gray-300 border-gray-600 text-gray-800",
    activeIcon: "text-gray-800",
    iconBg: "bg-gray-700",
    apis: [
      {
        provider: "internal",
        name: "Cau Hoi",
        path: "/thong-tin-huu-ich/cau-hoi-thuong-gap",
      },
    ],
  },
  {
    name: "Tin Tức",
    icon: "mdi:file-document-outline",
    heading: "font-semibold text-gray-800",
    pointer: "bg-gray-700",
    active: "bg-gray-300 border-gray-600 text-gray-800",
    activeIcon: "text-gray-800",
    iconBg: "bg-gray-700",
    apis: [
      {
        provider: "internal",
        name: "Tin Tức",
        path: "/tin-tuc",
      },
    ],
  },
];

const router = [
  {
    path: "ICANPR",
    children: [
      {
        path: "/ve-icanpr",
        element: "Về iCanPR",
        // elemtnt: "About iCanPR",
      },
      {
        path: "/doi-tac-icanpr",
        element: "Đối tác iCanPR",
        // element: "iCanPR Partners",
      },
      {
        path: "/lien-he",
        element: "Liên hệ",
        // element: "Contact",
      },
    ],
  },

  {
    path: "ĐỊNH CƯ CANADA",
    // path: "Định cư Canada",

    children: [
      {
        path: "/immigration/viec-lam-dinh-cu",
        element: "Việc làm định cư",
        // element: "Immigration work",
      },
      {
        path: "/immigration/du-hoc-dinh-cu",
        element: "Du học – định cư",
        // element: "Study abroad - settlement",
      },
      {
        path: "/immigration/doanh-nghiep-c11-visa",
        element: "Doanh nghiệp C11 Visa",
        // element: "C11 Visa Business",
      },
      {
        path: "/immigration/start-up-visa",
        element: "Visa khởi nghiệp",
      },

      {
        path: "Express Entry",
        element: `Nhập cảnh nhanh`,
        children: [
          {
            path: "/immigration/nhap-canh-nhanh/cong-nhan-lanh-nghe-lien-bang",
            element: "Công nhân lành nghề liên bang (FSW)",
          },
          {
            path: "/immigration/nhap-canh-nhanh/thuong-mai-co-tay-nghe-lien-bang",
            element: "Thương mại tay nghề liên bang (FST)",
          },
          {
            path: "/immigration/nhap-canh-nhanh/lop-hoc-trai-nghiem-canada",
            element: "Lớp trải nghiệm Canada (CEC)",
          },
          {
            path: "/immigration/nhap-canh-nhanh/tinh-toan-diem-crs",
            element: "Tính điểm CRS",
          },
        ],
      },
      {
        path: "/immigration/bao-lanh-gia-dinh",
        element: "Bảo lãnh gia đình",
        // element: "Family sponsorship",
      },
      {
        path: "/immigration/khach-hang-thanh-cong",
        element: "Khách hàng thành công",
        // element: "Customer Success",
      },
    ],
  },
  {
    path: "CHƯƠNG TRÌNH ĐỀ CỬ CẤP TỈNH BANG",
    // path: "Đề cử tỉnh bang PNP"
    children: [
      {
        path: "/de-cu-tinh-bang-pnp/alberta-nhap-cu-aaip",
        element: "Alberta Nhap Cu (AAIP)",
      },

      {
        path: "/de-cu-tinh-bang-pnp/british-columbia-bcpnp",
        element: "British Colombia (BC PNP)",
      },
      {
        path: "/de-cu-tinh-bang-pnp/ontario-oinp",
        element: "Ontario (OINP)",
      },

      {
        path: "/de-cu-tinh-bang-pnp/manitoba-mpnp",
        element: "Manitoba (MPNP)",
      },
      {
        path: "/de-cu-tinh-bang-pnp/new-brunswick-nbpnp",
        element: "New Brunswick (NBPNP)",
      },
      // {
      //   path: "/de-cu-tinh-bang-pnp/newfoundland-and-labrador",
      //   element: "Newfoundland and Labrador",
      // },

      // {
      //   path: "/de-cu-tinh-bang-pnp/northwest-territories",
      //   element: "Northwest Territories",
      // },
      {
        path: "/de-cu-tinh-bang-pnp/nova-scotia-nsnp",
        element: "Nova Scotia (NSNP)",
      },
      // {
      //   path: "/de-cu-tinh-bang-pnp/nanuvut",
      //   element: "Nanuvut",
      // },

      {
        path: "/de-cu-tinh-bang-pnp/prince-edward-island-peipnp",
        element: "Prince Edward Island (PEI PNP)",
      },
      {
        path: "/de-cu-tinh-bang-pnp/quebec",
        element: "Quebec",
      },
      {
        path: "/de-cu-tinh-bang-pnp/saskatchewan-sinp",
        element: "Saskatchewan (SINP)",
      },
      {
        path: "/de-cu-tinh-bang-pnp/yukon-ynp",
        element: "Yukon (YNP)",
      },
    ],
  },
  {
    path: "CUỘC SỐNG CANADA",
    // path: "Cuộc sống Canada",
    children: [
      {
        // path: "cac-tinh-bang-canada",
        path: "Các tỉnh bang Canada",
        element: "Các tỉnh bang Canada",
        children: [
          {
            path: "/cuoc-song-canada/cac-tinh-bang-canada/tinh-alberta",
            element: "Alberta (AAIP)",
          },

          {
            path: "/cuoc-song-canada/cac-tinh-bang-canada/brcolumbiaP",
            element: "British Colombia (BC PNP)",
          },

          {
            path: "/cuoc-song-canada/cac-tinh-bang-canada/manitobaP",
            element: "Manitoba (MPNP)",
          },
          {
            path: "/cuoc-song-canada/cac-tinh-bang-canada/new-brunswickP",
            element: "New Brunswick (NBPNP)",
          },
          {
            path: "/cuoc-song-canada/cac-tinh-bang-canada/newfoundland-labradorP",
            element: "Newfoundland and Labrador",
          },

          {
            path: "/cuoc-song-canada/cac-tinh-bang-canada/northwest-territoriesP",
            element: "Northwest Territories",
          },
          {
            path: "/cuoc-song-canada/cac-tinh-bang-canada/nova-scotiaP",
            element: "Nova Scotia (NSNP)",
          },
          {
            path: "/cuoc-song-canada/cac-tinh-bang-canada/nunavutP",
            element: "Nunavut",
          },
          {
            path: "/cuoc-song-canada/cac-tinh-bang-canada/ontarioP",
            element: "Ontario (OINP)",
          },
          {
            path: "/cuoc-song-canada/cac-tinh-bang-canada/prince-edwardP",
            element: "Prince Edward Island (PEI PNP)",
          },
          {
            path: "/cuoc-song-canada/cac-tinh-bang-canada/quebecP",
            element: "Quebec",
          },
          {
            path: "/cuoc-song-canada/cac-tinh-bang-canada/saskatchewanP",
            element: "Saskatchewan (SINP)",
          },
          {
            path: "/cuoc-song-canada/cac-tinh-bang-canada/yukonP",
            element: "Yukon (YNP)",
          },
        ],
      },
      {
        path: "/cuoc-song-canada/moi-truong-canada",
        // element: "Environment Canada",
        element: "Môi Trường Canada",
      },
      {
        path: "/cuoc-song-canada/van-hoa-ton-gaio",
        // element: "Culture & Education",
        element: "Văn hóa & tôn giáo",
      },
      {
        path: "/cuoc-song-canada/y-te",
        // element: "Medical",
        element: "Y Tế",
      },
      {
        path: "/cuoc-song-canada/giao-duc-canada",
        // element: "Canadian Education",
        element: "Giáo dục Canada",
      },
      {
        path: "/cuoc-song-canada/ty-gia-do-canada",
        // element: "Canadian Dollar Exchange Rate",
        element: " Tỷ giá đô Canada",
      },

      {
        path: "/cuoc-song-canada/chinh-sach-thue",
        element: "Chính sách thuế",
        // element: "Chính sách thuế",
      },
    ],
  },

  {
    path: "THÔNG TIN HỮU ÍCH",
    // path: "Thông tin hữu ích",
    children: [
      {
        path: "/thong-tin-huu-ich/cau-hoi-thuong-gap",
        element: "Câu hỏi thường gặp",
        // element: "FAQ",
      },

      {
        path: "/thong-tin-huu-ich/trang-web-huu-ich",
        element: "Trang web hữu ích",
        // element: "Useful Website",
      },

      {
        path: "/thong-tin-huu-ich/thuat-ngu-trong-di-tru",
        element: "Thuật ngữ trong di trú",
        // element: "Immigration terminology",
      },

      {
        path: "/thong-tin-huu-ich/CLB-la-gi",
        element: "CLB là gì? Cách quy đổi điểm đương đương?",
        // element: "What is CLB? How to convert equivalent points?",
      },
    ],
  },
  {
    path: "TUYỂN DỤNG",
    // path:"Tuyển dụng",
    children: [
      {
        path: "/tuyen-dung/lam-viec-cho-icanpr",
        element: "Làm việc cho iCanPR",
        // element: "Work for ICanPR",
      },
      {
        path: "https://jobs.icanpr.vn/jobs/Careers",
        element: "Tổng hợp việc làm Canada",
        external: true,
        // element: "Canada Jobs Summary",
      },
      {
        path: "https://icanpr.zohorecruit.com/jobs/Careers/777018000000558001/75119---General-Labour-C%C3%B4ng-nh%C3%A2n-n%C3%B4ng-tr%E1%BA%A1i-g%C3%A0?source=CareerSite",
        element: "Công nhân trại gà",
        external: true,
        // element: "Chicken farm Worker",
      },
      {
        path: "/tuyen-dung/dau-bep-mon-au",
        element: "Đầu bếp Món Âu",
        // element: "European Chef",
      },
    ],
  },
];

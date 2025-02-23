"use client";
import Container from "@/components/ui/container";
import { CTADefault, CTAWithImage } from "@/components/ui/cta";
import HoverCard from "@/components/ui/hover-card";
import { List, UL } from "@/components/ui/list";
import PageRenderer from "@/components/ui/renderer";
import Title from "@/components/ui/Title";
import TitleWithBottomBorder from "@/components/ui/title-with-bottom-border";
import TitleWithDoubleBorder from "@/components/ui/title-with-double-border";
import Glass from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function About() {
  return <PageRenderer name="ve-icanpr" key="ve-icanpr" />;
}

export const Card = ({ image, title, list, flip }) => {
  return (
    <>
      <Glass
        className={cn(
          "h-[450px] w-[450px] flex flex-col gap-4 items-center relative z-10 mx-0 bg-cover",

          flip ? "justify-end" : "justify-start"
        )}
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="bg-gray-100 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 rounded-2xl border-gray-100  h-full absolute top-0 left-0 w-full"></div>
        {/* <div className="w-[45%] rounded-l-2xl">
        <img
          src={image}
          alt=""
          className={cn(
            "h-[217px] bg-cover z-10 relative",
            flip ? "rounded-r-2xl" : "rounded-l-2xl"
          )}
        />
      </div> */}
        {/* <div
        className={cn(
          "px-8  absolute rounded-2xl -ml-6 shadow-2xl  z-20 border-gray-100 backdrop-blur-3xl bg-opacity-10 bg-clip-padding backdrop-filter bg-gray-100 flex flex-col gap-2 py-5",
          flip ? "left-2" : "-right-6"
        )}
      > */}
      </Glass>
    </>
    // </div>
  );
};

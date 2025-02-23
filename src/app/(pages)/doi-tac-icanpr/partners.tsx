// import NewsShowcase from "../../news.tsx/news-showcase";

// import { getDataBySlug } from "@/components/ui/dynamic-component";
// import { DynamicComponent } from "@/components/ui/dynamic-component";
// import { use } from "react";

// export default function Partners({ slug }) {
//   const pageData = use(getDataBySlug("doi-tac-icanpr"));

//   // Check if pageData and pageData.content are available
//   if (!pageData) return <p>Loading...</p>;
//   if (!pageData.content || !Array.isArray(pageData.content)) {
//     console.error("No content array found in pageData:", pageData); // Log error details
//     return <p>No components to display</p>;
//   }

//   return (
//     <div className="flex flex-col gap-10">
//       {pageData.content.map(
//         (componentData, index) => (
//           console.log(componentData, "componentData"),
//           (<DynamicComponent key={index} data={componentData} />)
//         )
//       )}
//     </div>
//   );
// }

"use client";
import Container from "@/components/ui/container";
import { CTADefault } from "@/components/ui/cta";
import Title from "@/components/ui/Title";
import Glass from "@/lib/helpers";
import React from "react";
import PageRenderer from "@/components/ui/renderer";
export default function Partners() {
  return <PageRenderer name="doi-tac-icanpr" dataSources={{ patnersConfig }} />;
}
const patnersConfig = [
  "Acadia University",
  "Portage College",
  "Acsenda School of Management",
  "Selkirk College",
  "College of Rockies",
  "Seneca College",
  "Conestoga College",
  "St. Clair College",
  "Durham College",
  "Suncrest College",
  "Eton College",
  "Taylor Pro College",
  "Fleming College Toronto",
  "Toronto School of Management",
  "Georgian College",
  "Trent University",
  "Lakeland College",
  "Trinity Western University",
  "Niagara College Toronto",
  "University Canada West",
  "Nipissing University",
  "Wilfrid Laurier University",
  "Northern Lights College",
];

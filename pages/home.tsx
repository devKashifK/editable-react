"use client";
import PageRenderer from "@/components/ui/renderer";

export default function Home() {
  return (
    <PageRenderer name="home" key="home" dataSources={{ provinceConfig }} />
  );
}
const provinceConfig = [
  {
    id: 1,
    image: "/alberta.png",
    title: "Alberta",
    des: "Nổi bật với chương trình Alberta Rural Renewal, mang lại cơ hội xin PR trực tiếp từ Việt Nam cho lao động lành nghề",
    href: "/de-cu-tinh-bang-pnp/alberta-nhap-cu-aaip",
  },
  {
    id: 2,
    image: "/saskatchewan.jpg",
    title: "Saskatchewan",
    des: "Lộ trình Saskatchewan Experience cho phép người lao động xin đề cử tỉnh bang & PR sau 6 tháng làm việc. Xin PR từ Việt Nam với JAL",
    href: "/de-cu-tinh-bang-pnp/saskatchewan-sinp",
  },
  {
    id: 3,
    image: "/atlantic.png",
    title: "Atlantic",
    des: "Lộ trình Atlantic Experience cho phép người lao động xin đề cử tỉnh bang & PR sau 6 tháng làm việc. Xin PR từ Việt Nam với JAL",
    href: "/de-cu-tinh-bang-pnp/atlantic-aipp",
  },

  {
    id: 4,
    image: "/british.jpg",
    title: "British Columbia",
    des: "British Columbia (BC) là một tỉnh bang ở phía tây Canada, nổi tiếng với cảnh quan thiên nhiên tuyệt đẹp và đa dạng. Thủ phủ của tỉnh là Victoria, nằm trên đảo Vancouver, trong khi thành phố lớn nhất là Vancouver, nằm trên đất liền. ",
    href: "/de-cu-tinh-bang-pnp/british-columbia-bcpnp",
  },
  {
    id: 5,
    image: "/ontario.png",
    title: "Ontario",
    des: "Chương trình Đề cử tỉnh bang Ontario (OINP) là chương trình nhập cư chính của tỉnh bang Ontario. Chương trình này nhằm thu hút những người lao động có kỹ năng, doanh nhân và nhà đầu tư đến sinh sống và làm việc tại Ontario, góp phần phát triển nền kinh tế của tỉnh bang.Thông qua chương trình này, những ứng viên được tỉnh bang Ontario đề cử có thể nộp đơn xin thường trú tại Canada.",
    href: "/de-cu-tinh-bang-pnp/ontario-oinp",
  },
  {
    id: 6,
    image: "/manitoba.png",
    title: "Manitoba",
    des: "Chương trình đề cử tỉnh bang Manitoba (MPNP) là chương trình nhập cư chính của tỉnh bang Manitoba. Chương trình này được đưa ra để giúp phát triển nền kinh tế của tỉnh bang, dựa trên nhu cầu kinh tế và thị trường lao động.Thông qua chương trình này, những người nhập cư tương lai với các kỹ năng và kinh nghiệm được tỉnh bang chọn có thể nhận được giấy đề cử tỉnh bang của Manitoba.",
    href: "/de-cu-tinh-bang-pnp/manitoba-mpnp",
  },

  {
    id: 7,
    image: "/newbrunswick.png",
    title: "New Brunswick",
    des: "Chương trình Đề cử Tỉnh bang New Brunswick (NBPNP) nhằm thu hút và giữ chân những người lao động lành nghề, doanh nhân và sinh viên tốt nghiệp có khả năng hội nhập thành công vào thị trường lao động và cộng đồng của tỉnh bang này.Nếu thành công trong việc đăng ký NBPNP, ứng viên sẽ nhận được chứng nhận Đề cử tỉnh bang, chứng nhận này sẽ hỗ trợ cho đơn xin thường trú với Chính phủ Canada.",
    href: "/de-cu-tinh-bang-pnp/new-brunswick-nbpnp",
  },

  {
    id: 8,
    image: "/province/prince/a.png",
    title: "Prince Edward Island",
    des: "Prince Edward Island (Đảo hoàng tử) là một tỉnh bang nhỏ nằm ở phía Đông của Canada. Đây cũng là tỉnh bang nhỏ nhất và cũng xanh nhất của Canada với thiên nhiên tươi đẹp, nước và không khí cực kì trong lành.. Nông nghiệp, ngư nghiệp và du lịch là lĩnh vực phát triển trọng tâm của nền kinh tế đảo hoàng tử Edward",
    href: "/de-cu-tinh-bang-pnp/prince-edward-island-peipnp",
  },
  {
    id: 9,
    image: "/yukon.jpg",
    title: "Yukon",
    des: "Yukon (YNP) là một tỉnh bang nhỏ nằm ở phía Đông của Canada. Đây cũng là tỉnh bang nhỏ nhất và cũng xanh nhất của Canada với thiên nhiên tươi đẹp, nước và không khí cực kì trong lành.. Nông nghiệp, ngư nghiệp và du lịch là lĩnh vực phát triển trọng tâm của nền kinh tế đảo hoàng tử Edward",
    href: "/de-cu-tinh-bang-pnp/yukon-ynp",
  },
  {
    id: 10,
    image: "/province/newfoundland/a.png",
    title: "New Foundland",
    des: "New Foundland là một tỉnh bang nhỏ nằm ở phía Đông của Canada. Đây cũng là tỉnh bang nhỏ nhất và cũng xanh nhất của Canada với thiên nhiên tươi đẹp, nước và không khí cực kì trong lành.. Nông nghiệp, ngư nghiệp và du lịch là lĩnh vực phát triển trọng tâm của nền kinh tế đảo hoàng tử Edward",
    href: "/de-cu-tinh-bang-pnp/new-foundland-nlpnp",
  },
  {
    id: 11,
    image: "/novaScotia.jpg",
    title: "NovaScotia",
    des: "Nova Scotia là một tỉnh bang nhỏ nằm ở phía Đông của Canada. Đây cũng là tỉnh bang nhỏ nhất và cũng xanh nhất của Canada với thiên nhiên tươi đẹp, nước và không khí cực kì trong lành.. Nông nghiệp, ngư nghiệp và du lịch là lĩnh vực phát triển trọng tâm của nền kinh tế đảo hoàng tử Edward",
    href: "/de-cu-tinh-bang-pnp/nova-scotia-nsnp",
  },
  {
    id: 12,
    image: "/province/quebec/a.png",
    title: "Quebec",
    des: "Quebec là một tỉnh bang nhỏ nằm ở phía Đông của Canada. Đây cũng là tỉnh bang nhỏ nhất và cũng xanh nhất của Canada với thiên nhiên tươi đẹp, nước và không khí cực kì trong lành.. Nông nghiệp, ngư nghiệp và du lịch là lĩnh vực phát triển trọng tâm của nền kinh tế đảo hoàng tử Edward",
    href: "/de-cu-tinh-bang-pnp/quebec-qswp",
  },
];

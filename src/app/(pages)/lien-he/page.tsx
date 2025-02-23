"use client";
import PageRenderer from "@/components/ui/renderer";

const EnhancedContact = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-wrap justify-center mt-8">
        <OfficeCard
          country="Canada"
          imageUrl="/bangladesh-earth-map.jpg"
          address="2124 Broad St, Regina, Saskatchewan,Canada S4P 1Y5 (Văn phòng đã đăng ký)"
          phone="+1-855-477-9797"
          email="info@gtrworldwide.com"
        />
        <OfficeCard
          country="Vietnam"
          imageUrl="/vietnam-map.jpg"
          address="Địa chỉ
Tầng 7, 85 Nguyễn Hữu Cầu, phường Tân Định, Quận 1, Tp. Hồ Chí Minh, Việt Nam"
          phone="+84 86996 7809"
          email="tuvan@icanpr.vn"
        />
        <OfficeCard
          country="India"
          imageUrl="/India-map.jpg"
          address="Gurgaon, Haryana, India"
          phone="+91 88612 80099"
          email=""
        />
      </div>
      <ContactForm />
    </div>
  );
};

export default function Page() {
  return <PageRenderer name="lien-he" />;
}

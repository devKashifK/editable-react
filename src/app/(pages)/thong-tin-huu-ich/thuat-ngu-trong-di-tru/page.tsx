import Container from "@/components/ui/container";
import { CTADefault } from "@/components/ui/cta";
import HeroDefault from "@/components/ui/hero-all";
import Title from "@/components/ui/Title";
import Glass from "@/lib/helpers";
import React from "react";

export default function ImmigrationTerms() {
  return (
    <>
    <HeroDefault
    title="Thuật ngữ di trú Canada"
    description="Nhiều người thường quen gọi IRCC là Bộ Di trú, Cục Di trú hay Sở Di trú. Tuy nhiên tên đầy đủ của cơ quan này là Bộ Di Trú, Di Cư và Quốc Tịch Canada, tiếng Anh đầy đủ là Immigration Refugee and Citizenship Canada (IRCC)."
    backgroundImage={JSON.stringify("Agricultural Work.png")}
    />
      <Container>
        <Glass className="flex flex-col gap-8">
          <Title
            title="Thuật ngữ di trú Canada"
            className="text-left lg:items-start"
            descriptionClassName="lg:text-left"
            description="Canada là một trong những điểm đến định cư phổ biến và hấp dẫn trên thế giới, thu hút hàng nghìn người muốn tìm kiếm cơ hội mới và chất lượng cuộc sống tốt hơn. Tuy nhiên, trước khi bắt đầu hành trình định cư của mình, việc hiểu rõ về những thuật ngữ quan trọng trong di trú là điều hết sức cần thiết. Sau đây là một số thuật ngữ di trú Canada mà bạn nên biết để có một trải nghiệm định cư suôn sẻ."
          />

          <Title
            className="text-left lg:items-start"
            descriptionClassName="lg:text-left"
            title="1. IRCC - Bộ Di trú, Tị Nạn và Quốc Tịch Canada"
            description="IRCC, viết tắt của 'Immigration, Refugees, and Citizenship Canada,' là Bộ Di trú, Tị Nạn và Quốc Tịch Canada. Đây là một tổ chức chính phủ liên bang của Canada, được thành lập để tạo điều kiện thuận lợi cho người nhập cư đến Canada, bảo vệ người tị nạn và cung cấp chương trình hỗ trợ cho người mới đến Canada để định cư."
          />

          <Title
            className="text-left lg:items-start"
            descriptionClassName="lg:text-left"
            title="2. RCIC - Chuyên gia tư vấn di trú Canada"
            description="RCIC là viết tắt của 'Regulated Canadian Immigration Consultant,' là người có giấy phép hành nghề tư vấn di trú Canada được cấp bởi Liên Đoàn Tư Vấn Di Trú CICC. RCIC sẽ đại diện cho bạn là đương đơn sẽ đánh giá đơn xin Visa của bạn và nộp thay cho bạn."
          />

          <Title
            className="text-left lg:items-start"
            descriptionClassName="lg:text-left"
            title="3. CICC - Liên Đoàn Tư Vấn Di Trú"
            description="CICC là viết tắt của 'The College of Immigration and Citizenship Consultants,' một tổ chức chịu trách nhiệm cấp giấy phép và quản lý các Chuyên gia tư vấn di trú và quốc tịch Canada với mục tiêu lợi ích của công chúng."
          />

          <Title
            className="text-left lg:items-start"
            descriptionClassName="lg:text-left"
            title="4. PR"
            description="PR (Permanent Residency) là tình trạng cư trú vĩnh viễn tại Canada, cho phép bạn sống và làm việc mà không cần phải có Visa. Để đạt được PR, có nhiều con đường khác nhau như Express Entry, Provincial Nominee Program (PNP) và các chương trình khác."
          />

          <Title
            className="text-left lg:items-start"
            descriptionClassName="lg:text-left"
            title="5. CRS"
            description="CRS là từ viết tắt của 'Comprehensive Ranking System,' hay Hệ thống Xếp hạng Toàn diện. Đây là một phần quan trọng của chương trình Kỹ năng Định cư Liên bang của Canada. Hệ thống này được sử dụng để đánh giá và xếp hạng ứng viên dựa trên nhiều yếu tố như tuổi, trình độ học vấn, kinh nghiệm làm việc, điểm số tiếng Anh hoặc tiếng Pháp và các yếu tố khác."
          />

          <Title
            className="text-left lg:items-start"
            descriptionClassName="lg:text-left"
            title="6. LMIA"
            description="LMIA là viết tắt của 'Labour Market Impact Assessment,' nghĩa là Đánh giá Tác động đến Thị trường lao động. Đây là chương trình quản lý lao động của chính phủ Canada, đánh giá khả năng của nhà tuyển dụng Canada trong việc tuyển dụng nhân viên nước ngoài."
          />

          <Title
            className="text-left lg:items-start"
            descriptionClassName="lg:text-left"
            title="7. PNP"
            description="PNP (Provincial Nominee Program) là một chương trình cho phép các tỉnh và vùng lãnh thổ của Canada tuyển chọn người định cư dựa trên nhu cầu cụ thể của họ. Điều này tạo cơ hội cho những người có kỹ năng và kinh nghiệm phù hợp với nhu cầu lao động địa phương."
          />

          <Title
            className="text-left lg:items-start"
            descriptionClassName="lg:text-left"
            title="8. JAL"
            description="Job Approval Letter (JAL) là một phần quan trọng của Saskatchewan Immigration Nominee Program (SINP). Đây là thư thống báo chính thức về việc công việc của bạn đã được chấp nhận cho đề cử tại tỉnh bang Saskatchewan."
          />

          <Title
            className="text-left lg:items-start"
            descriptionClassName="lg:text-left"
            title="9. CLB"
            description="Canadian Language Benchmarks (CLB) là một hệ thống đánh giá tiếng Anh được sử dụng rộng rãi tại Canada. Bao gồm 12 cấp độ, CLB đo lường trình độ tiếng Anh từ cấp độ 1 đến cấp độ 12."
          />

          <Title
            className="text-left lg:items-start"
            descriptionClassName="lg:text-left"
            title="10. ITA"
            description="ITA là viết tắt của 'Invitation to Apply,' một bước quan trọng trong quá trình định cư tại Canada. Khi bạn đăng ký tham gia chương trình Di dân Thường trú Canada (Express Entry) và được xếp hạng trong Comprehensive Ranking System (CRS), bạn có thể nhận được một ITA từ Cục Di trú Canada (IRCC)."
          />

          <Title
            className="text-left lg:items-start"
            descriptionClassName="lg:text-left"
            title="11. ECA"
            description="ECA, hay Đánh Giá Bằng Cấp Học Vấn, là bước quan trọng đối với nhiều chương trình định cư tại Canada, đặc biệt là những chương trình dành cho những người di cư có bằng cấp học vấn."
          />

          <Title
            className="text-left lg:items-start"
            descriptionClassName="lg:text-left"
            title="12. SINP"
            description="SINP là chương trình định cư do tỉnh Saskatchewan quản lý, được liên kết chặt chẽ với chương trình định cư của chính phủ Canada. Thiết kế nhằm thu hút những người có kỹ năng và kinh nghiệm cần thiết."
          />

          <Title
            className="text-left lg:items-start"
            descriptionClassName="lg:text-left"
            title="13. Express Entry"
            description="Express Entry là hệ thống quản lý đầu vào cho các chương trình kinh tế di động của Canada. Đây là một cách nhanh chóng và hiệu quả để nhập cảnh và định cư, dựa trên điểm số tích lũy thông qua các yếu tố như kinh nghiệm làm việc, trình độ học vấn, và khả năng ngôn ngữ."
          />

          <Title
            className="text-left lg:items-start"
            descriptionClassName="lg:text-left"
            title="14. FSTP"
            description="FSTP là chương trình dành cho những người làm việc trong các ngành nghề thủ công chuyên môn tại Canada. Nghề nghiệp như thợ hồ, thợ điện, thợ sửa chữa ô tô, thợ hàn, thợ sắt, thợ ống nước, thợ xây dựng đều thuộc phạm vi của chương trình này."
          />

          <Title
            className="text-left lg:items-start"
            descriptionClassName="lg:text-left"
            title="15. FSWP"
            description="FSWP là chương trình dành cho lao động chuyên nghiệp với trình độ học vấn và kinh nghiệm làm việc cao. Để tham gia, bạn cần đáp ứng các tiêu chí về tiếng Anh hoặc tiếng Pháp, có ít nhất 1 năm kinh nghiệm làm việc chuyên môn và tuân thủ các yêu cầu khác của IRCC."
          />
        </Glass>
      </Container>
      <CTADefault
        title="Chúng tôi có thể giúp bạn"
        subtitle={
            "iCan PR hiểu rằng di trú/ định cư tại Canada là một hành trình nhiều thay đổi và thách thức. Mục tiêu và nhiệm vụ của chúng tôi trở thành đối tác đáng tin cậy của bạn trong hành trình này. Chúng tôi mong muốn giúp bạn hiện thực hóa ước mơ định cư Canada, sẳn sàng chào đón những cơ hội mới tại đây."
        }
        image={JSON.stringify("service.jpg")}
      />
    </>
  );
}

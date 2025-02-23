"use client";
import { ContactForm } from "@/app/(pages)/lien-he/contact";
import Container from "@/components/ui/container";
import Title from "@/components/ui/Title";
import Glass from "@/lib/helpers";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import CountUp from "react-countup";

export default function BookAppointment() {
  return (
    <div className="mb-10">
      <Container>
        <Title
          title={
            "Tại sao việc chọn cơ quan nhập cư Saskatchewan và nhà tư vấn ở Saskatchewan là quan trọng?"
          }
          subtitle={"Saskatchewan nổi bật là một tỉnh của Canada."}
          description={
            <div className="flex flex-col gap-4">
              <p className="text-left">
                Saskatchewan nổi bật là một tỉnh ở Canada có môi trường mở
                chương trình nhập cư phù hợp với nhiều cá nhân đang tìm cách
                khẳng định mình ở trong nước.
              </p>
              <p className="text-left">
                Với nền kinh tế đa dạng, cộng đồng thân thiện và nguồn lực dồi
                dào cơ hội cho người lao động lành nghề, doanh nhân và nhà đầu
                tư, Saskatchewan đã trở thành điểm đến hấp dẫn cho người nhập
                cư. Tuy nhiên, điều hướng quá trình nhập cư ở Saskatchewan đòi
                hỏi phải có kế hoạch cẩn thận và chuyên môn. Đây là nơi vai trò
                của nhà tư vấn nhập cư Saskatchewan trở nên chủ yếu. Những nhà
                tư vấn này chuyên tìm hiểu các con đường nhập cư độc đáo do tỉnh
                cung cấp, chẳng hạn như Chương trình Đề cử Người nhập cư
                Saskatchewan (SINP) và có thể cung cấp hướng dẫn phù hợp cho
                những cá nhân muốn đến Saskatchewan ngôi nhà mới của họ.
              </p>
              <p className="text-left">
                Với vô số lựa chọn có sẵn và sự phức tạp của quy trình nộp đơn,
                lựa chọn nơi nhập cư phù hợp chuyên gia tư vấn ở Saskatchewan là
                điều tối quan trọng để đảm bảo một quá trình suôn sẻ và hành
                trình nhập cư thành công. Với kiến ​​thức của họ về Chính sách
                nhập cư của Saskatchewan, nhu cầu thị trường lao động, và sự
                năng động của cộng đồng, những nhà tư vấn này đóng vai trò nòng
                cốt trong giúp các cá nhân thực hiện được nguyện vọng định cư và
                phát triển mạnh ở Saskatchewan.
              </p>
            </div>
          }
        />
      </Container>
      <Container>
        <Glass
          className="flex-col  gap-8 py-20 justify-center items-center bg-cover bg-center relative"
          style={{
            backgroundImage: `url(/immigration.png)`,
          }}
        >
          <div className="bg-gray-100 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 rounded-2xl border-gray-100  h-full absolute top-0 left-0 w-full"></div>

          <div className="md:flex-row flex-col flex z-10 gap-20 justify-start items-start">
            <div className="flex w-full md:flex-1 justify-center items-center  flex-col gap-4 text-white/60">
              <Icon
                icon={"mdi:checkbox-marked-outline"}
                className="text-5xl cursor-pointer  rounded-full py-2 px-2"
              />
              <div className="flex gap-2 justify-center items-center">
                <CountUp
                  enableScrollSpy={true}
                  end={100}
                  className="text-6xl"
                />
                <span className="text-4xl">+</span>
              </div>
              <span className="uppercase text-lg font-primary tracking-widest">
                visa thành công vào năm 2023
              </span>
            </div>
            <div className="flex w-full md:flex-1 justify-center items-center  flex-col gap-4 text-white/60">
              <Icon
                icon={"icon-park-outline:message-success"}
                className="text-5xl cursor-pointer  rounded-full py-2 px-2"
              />

              <div className="flex gap-2 justify-center items-center">
                <CountUp enableScrollSpy={true} end={14} className="text-6xl" />
              </div>
              <span className="uppercase text-lg font-primary tracking-widest">
                Visa khởi nghiệp thành công
              </span>
            </div>
            <div className="flex w-full md:flex-1 justify-center items-center  flex-col gap-4 text-white/60">
              <Icon
                icon={"cil:happy"}
                className="text-5xl cursor-pointer  rounded-full py-2 px-2"
              />
              <div className="flex gap-2 justify-center items-center">
                <CountUp enableScrollSpy={true} end={95} className="text-6xl" />
                <span className="text-4xl"> %</span>
              </div>

              <span className="uppercase text-lg font-primary tracking-widest">
                khách hàng hạnh phúc
              </span>
            </div>
            <div className="flex w-full md:flex-1 justify-center items-center  flex-col gap-4 text-white/60">
              <Icon
                icon={"game-icons:trophy-cup"}
                className="text-5xl cursor-pointer rounded-full py-2 px-2"
              />
              <div className="flex gap-2 flex-col  justify-center items-center">
                <CountUp enableScrollSpy={true} end={3} className="text-6xl" />
              </div>
              <span className="uppercase text-lg font-primary tracking-widest">
                Nhà tư vấn
              </span>
            </div>
          </div>
        </Glass>
      </Container>
      <Container>
        <Title
          title={
            "Làm cách nào để kiểm tra xem nhà tư vấn của tôi có phải là RCIC không?"
          }
          description={
            <div className="flex flex-col gap-4">
              <p className="text-left">
                Xác minh xem nhà tư vấn của bạn có phải là người Canada đã đăng
                ký hay không Tư vấn Nhập cư (RCIC) là rất quan trọng để đảm bảo
                rằng bạn đang nhận được hướng dẫn từ một người có trình độ và
                được ủy quyền chuyên nghiệp. Đây là cách bạn có thể kiểm tra xem
                nhà tư vấn của bạn có là một RCIC. Bằng cách làm theo các bước
                sau và xác minh trạng thái đăng ký của nhà tư vấn với ICCRC, bạn
                có thể đảm bảo rằng bạn đang làm việc với RCIC hợp pháp và được
                ủy quyền người có đủ điều kiện để cung cấp lời khuyên về nhập cư
                và đại diện.
              </p>
              <div className="text-left">
                <p className="text-left font-primary tracking-widest text-2xl text-red-900">
                  Truy cập trang web ICCRC:
                </p>
                <p>
                  Trường Cao đẳng Tư vấn Nhập cư và Quốc tịch là cơ quan quản lý
                  giám sát RCIC.
                  <a
                    className="text-sky-400 hover:underline"
                    href="https://www.college-ic.ca"
                  >
                    Truy cập trang web chính thức của họ
                  </a>
                </p>
              </div>
              <div className="text-left">
                <p className="text-left font-primary tracking-widest text-2xl text-red-900">
                  Tìm kiếm Cơ quan đăng ký trực tuyến:
                </p>
                <p>
                  Trên trang web, hãy điều hướng đến phần “Tìm nơi nhập cư phần
                  chuyên nghiệp”. Tại đây, bạn có thể tìm kiếm tư vấn theo tên
                  hoặc số đăng ký.
                </p>
              </div>
              <div className="text-left">
                <p className="text-left font-primary tracking-widest text-2xl text-red-900">
                  Xác minh trạng thái đăng ký:
                </p>
                <p>
                  Nhập tên hoặc số đăng ký của nhà tư vấn của bạn vào thanh tìm
                  kiếm và bấm vào nút tìm kiếm. Kết quả tìm kiếm sẽ hiển thị
                  trạng thái đăng ký của nhà tư vấn, bao gồm liệu họ có phải là
                  RCIC ở trạng thái tốt hay không đã có những biện pháp kỷ luật
                  đối với họ.
                </p>
              </div>
              <div className="text-left">
                <p className="text-left font-primary tracking-widest text-2xl text-red-900">
                  Đánh giá chi tiết:
                </p>
                <p>
                  Khi bạn đã tìm thấy nhà tư vấn của mình trong kết quả tìm
                  kiếm, xem lại các chi tiết được cung cấp để đảm bảo chúng khớp
                  với thông tin bạn có. Hãy chú ý đến việc đăng ký của họ trạng
                  thái, số đăng ký và bất kỳ thông tin bổ sung nào cung cấp.
                </p>
              </div>
              <div className="text-left">
                <p className="text-left font-primary tracking-widest text-2xl text-red-900">
                  Liên hệ với Trường Cao đẳng Di trú và Quốc tịch Nhà tư vấn:
                </p>
                <p>
                  Nếu bạn có bất kỳ nghi ngờ hoặc lo ngại nào về tính xác thực
                  của đăng ký tư vấn của bạn, bạn có thể liên hệ trực tiếp với
                  ICCRC để xác minh hoặc làm rõ thêm.
                </p>
              </div>
            </div>
          }
        />
      </Container>
      <Container>
        <Glass className="flex flex-col gap-4 px-10">
          <Title title={"Why GTR Immigration?"} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-2 max-w-7xl mx-auto">
            {/* {appointment.map((feature, index) => (
              <Feature key={feature.title} {...feature} index={index} />
            ))} */}
          </div>
        </Glass>
      </Container>
      <Container>
        <Glass className="px-10">
          <Title
            title={"Tư vấn viên nhập cư có thể làm gì?"}
            description={
              <div className="flex flex-col gap-6">
                <p className="text-left">
                  Các nhà tư vấn nhập cư cung cấp một loạt các dịch vụ để hỗ trợ
                  khách hàng trong suốt quá trình nhập cư. Một số chìa khóa vai
                  trò của họ bao gồm:
                </p>
                <ul className="flex flex-col gap-6">
                  <li>
                    <p className="text-left font-primary tracking-widest text-2xl text-red-900">
                      Đánh giá và đủ điều kiện
                    </p>
                    <p className="text-left">
                      Nhà tư vấn đánh giá khách hàng; đủ điều kiện cho khác nhau
                      các chương trình nhập cư và cung cấp lời khuyên cá nhân
                      dựa trên về hoàn cảnh cá nhân.
                    </p>
                  </li>
                  <li>
                    <p className="text-left font-primary tracking-widest text-2xl text-red-900">
                      Chuẩn bị hồ sơ
                    </p>
                    <p className="text-left">
                      Chuyên viên tư vấn hỗ trợ hoàn thiện và nộp hồ sơ đơn xin
                      nhập cư, đảm bảo tất cả các tài liệu cần thiết chính xác
                      và nộp đúng thời hạn.
                    </p>
                  </li>
                  <li>
                    <p className="text-left font-primary tracking-widest text-2xl text-red-900">
                      Đại diện và Vận động
                    </p>
                    <p className="text-left">
                      Chuyên gia tư vấn đại diện cho khách hàng trong giao tiếp
                      với cơ quan nhập cư, thay mặt họ vận động và giải quyết
                      bất kỳ mối quan tâm hoặc thắc mắc nào.
                    </p>
                  </li>
                  <li>
                    <p className="text-left font-primary tracking-widest text-2xl text-red-900">
                      Hỗ trợ sau nhập cư
                    </p>
                    <p className="text-left">
                      Các nhà tư vấn cung cấp hỗ trợ và hướng dẫn ngay cả sau
                      khi phê duyệt nhập cư, hỗ trợ giải quyết, có được các tài
                      liệu cần thiết và định hướng cuộc sống ở Canada.
                    </p>
                  </li>
                </ul>
              </div>
            }
          />
        </Glass>
      </Container>

      <ContactForm />
    </div>
  );
}

// export const appointment = [
//   {
//     id: 1,
//     title: "Government of Canada Licensed",
//     description:
//       "We are authorized to legally represent our clients&apos; files, working directly with the Immigration Department of Canada and the Government of Canada. Our RCIC experts ensure that our clients&apos; files are processed accurately, legally, and securely.",
//     icon: (
//       <Icon
//         icon="material-symbols:person-apron"
//         className="text-6xl w-[50px]"
//       />
//     ),
//   },
//   {
//     id: 2,
//     title: "Proven High Success Rate",
//     description:
//       "This is achieved through a personalized strategy for each of our clients. Each file is analyzed specifically, identifying strengths and weaknesses that need to be addressed. Our wealth of experience helps us anticipate and provide proactive solutions to shorten processing times and ensure success.",
//     icon: (
//       <Icon
//         icon="material-symbols-light:qr-code-2-rounded"
//         className="text-6xl w-[50px]"
//       />
//     ),
//   },
//   {
//     id: 3,
//     title: "Years Of Experience",
//     description:
//       "GreenTech Resource Worldwide Canada is a Canada-based company led by Immigration Expert Mr. Manoj Goswami, the founder and CEO of the company. With an educational background and over 20 years of working experience in Canada, he and his team have a deep understanding of the labor market, culture, and a profound knowledge of Canadian Immigration and Citizenship laws.",
//     icon: <Icon icon="oui:ml-regression-job" className="text-6xl w-[50px]" />,
//   },
//   {
//     id: 4,
//     title: "Reasonable cost guaranteed quality",
//     description:
//       "At GreenTech Resource Worldwide Canada, we offer high-quality immigration services at affordable rates, ensuring your journey towards a new beginning is both accessible and excellent. We have transparent refund policy, emphasizing our commitment to your satisfaction. Your dreams of a new life are well within your reach with GreenTech Resource Worldwide Canada by your side.",
//     icon: (
//       <Icon
//         icon="streamline:quality-education-solid"
//         className="text-6xl w-[50px]"
//       />
//     ),
//   },
// ];

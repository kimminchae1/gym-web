import TextButton from "../Button/TextButton";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="Footer">
      <div className="footer_policy">
        <TextButton text={"이용약관"} />
        <TextButton text={"개인정보처리방침"} />
        <TextButton text={"고객센터"} />
      </div>

      <div className="footer_title">짐 케어 헬스&PT 일산 탄현점</div>

      <address className="footer_info">
        <div>대표 : ㅇㅇㅇ</div>
        <div>사업자등록번호 : 123-45-67890</div>
        <div>주소 : 경기 일산 --------------</div>
      </address>

      <div className="footer_contact">
        <div>대표전화 : 111-111</div>
        <div>이메일 : 11@11</div>
      </div>
    </footer>
  );
};

export default Footer;

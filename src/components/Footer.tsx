import FooterColumn from "./FooterColumn";
import { footerLinks } from "../consts/index";
import "./Footer.css";

const Footer = () => (
  <section className="flexStart footer bg-gray-100 p-8">
    <div className="flex flex-col gap-12 w-full">
      <div className="flex flex-wrap gap-12 justify-between">
        <div className="flex items-start flex-col max-w-[300px]">
          <p className="text-start text-md font-normal mt-5">
            "FLearn: Unleash Your Expertise, Elevate Learning, and Inspire
            Success."
          </p>
        </div>

        {footerLinks.map((column, index) => (
          <FooterColumn key={index} title={column.title} links={column.links} />
        ))}
      </div>
    </div>

    <div className="flexCenter footer_copyright mt-1">
      <p>&copy; 2024 FLearn. All rights reserved</p>
    </div>
  </section>
);

export default Footer;

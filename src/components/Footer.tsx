import FooterColumn from "./FooterColumn";
import { footerLinks } from "../consts/index";

const Footer = () => (
  <section className="flexStart footer">
    <div className="flex flex-col w-full gap-12">
      <div className="flex justify-between w-full items-start">
        <div className="flex items-start flex-col">
          <p className="text-start text-md font-normal mt-5 max-w-xs">
            "FLearn: Unleash Your Expertise, Elevate Learning, and Inspire Success."
          </p>
        </div>

        <div className="flex gap-x-24">
          {footerLinks.map((column, index) => (
            <FooterColumn key={index} title={column.title} links={column.links} />
          ))}
        </div>
      </div>
    </div>

    <div className="flexCenter footer_copyright">
      <p>&copy; 2024 FLearn. All rights reserved</p>
    </div>
  </section>
);

export default Footer;

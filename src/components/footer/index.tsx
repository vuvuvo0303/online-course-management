import React from "react";
import FooterColumn from "./FooterColumn";
import { footerLinks } from "../../consts";

const Footer: React.FC = () => (
  <footer className="flex flex-col w-full bg-[#f0f0f0] p-8">
    <section className="flex flex-col w-full mb-auto">
      <div className="flex flex-col w-full gap-12">
        <div className="flex flex-col md:flex-row justify-between w-full items-start">
          <div className="flex items-start flex-col mb-4 md:mb-0">
            <p className="text-left text-md font-normal mt-2.5 max-w-xs">
              "FLearn: Unleash Your Expertise, Elevate Learning, and Inspire
              Success."
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-x-0 md:gap-x-24">
            {footerLinks.map((column, index) => (
              <FooterColumn
                key={index}
                title={column.title}
                links={column.links}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
    <div className="flex justify-center mt-auto">
      <p>&copy; 2024 FLearn. All rights reserved</p>
    </div>
  </footer>
);

export default Footer;

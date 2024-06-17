
import FooterColumn from './FooterColumn';
import { footerLinks } from '../../consts/index';

const Footer: React.FC = () => (
  <section className="flex flex-col justify-start bg-[#f0f0f0] p-8">
    <div className="flex flex-col w-full gap-12">
      <div className="flex justify-between w-full items-start">
        <div className="flex items-start flex-col">
          <p className="text-left text-md font-normal mt-2.5 max-w-xs">
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
    <div className="flex justify-center mt-0.5">
      <p>&copy; 2024 FLearn. All rights reserved</p>
    </div>
  </section>
);

export default Footer;

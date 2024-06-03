import FooterColumn from './FooterColumn';
import { footerLinks } from '../consts/index';

const Footer = () => (
    <section className="flexStart footer">
        <div className="flex flex-col gap-12 w-full">
            <div className="flex items-start flex-col">
                <h1>FLearn</h1>

                <p className="text-start text-sm font-normal mt-5 max-w-xs">
                    FLearn is the world&apos;s leading community for creatives to share, grow, and get hired.
                </p>
            </div>
            <div className="flex flex-wrap gap-12">
                <FooterColumn title={footerLinks[0].title} links={footerLinks[0].links} />

                <div className="flex-1 flex flex-col gap-4">
                    <FooterColumn title={footerLinks[1].title} links={footerLinks[1].links} />
                    <FooterColumn title={footerLinks[2].title} links={footerLinks[2].links} />
                </div>

                <FooterColumn title={footerLinks[3].title} links={footerLinks[3].links} />

                <div className="flex-1 flex flex-col gap-4">
                    <FooterColumn title={footerLinks[4].title} links={footerLinks[4].links} />
                    <FooterColumn title={footerLinks[5].title} links={footerLinks[5].links} />
                </div>

                <FooterColumn title={footerLinks[6].title} links={footerLinks[6].links} />
            </div>
        </div>

        <div className="flexCenter footer_copyright">
            <p>@ 2024 FLearn. All rights reserved</p>
        </div>
    </section>
);

export default Footer;

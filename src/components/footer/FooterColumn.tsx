import React from "react";

type FooterLink = {
  name: string;
  url: string;
};

type FooterColumnProps = {
  title: string;
  links: Array<FooterLink>;
};

const FooterColumn: React.FC<FooterColumnProps> = ({ title, links }) => (
  <div className="flex flex-col w-full md:flex-col mr-5">
    <h3 className="font-semibold text-lg mb-4">{title}</h3>
    <ul className="list-none mt-4">
      {links.map((link, index) => (
        <li key={index} className="mb-2">
          <a
            href={link.url}
            className="text-base font-medium text-gray-600 hover:underline"
          >
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default FooterColumn;

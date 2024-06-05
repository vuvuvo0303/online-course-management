import React from "react";

interface FooterColumnProps {
  title: string;
  links: { name: string; url: string }[];
}

const FooterColumn: React.FC<FooterColumnProps> = ({ title, links }) => (
  <div className="flex flex-col">
    <h4 className="font-bold">{title}</h4>
    <ul className="list-none mt-4">
      {links.map((link, index) => (
        <li key={index} className="mb-2">
          <a href={link.url} className="text-sm text-gray-600 hover:underline">
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default FooterColumn;

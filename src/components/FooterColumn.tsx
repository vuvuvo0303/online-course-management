
import { Link } from 'react-router-dom';

type FooterLink = {
    name: string;
    url: string;
};

type FooterColumnProps = {
    title: string;
    links: Array<FooterLink>;
};

const FooterColumn: React.FC<FooterColumnProps> = ({ title, links }) => {
    return (
        <div className='footer-column'>
            <h4 className='font-semibold'>{title}</h4>
            <ul className='flex flex-col gap-2 font-normal'>
                {links.map(link => (
                    <li key={link.name}>
                        <Link to={link.url}>{link.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FooterColumn;

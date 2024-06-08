import React, { ReactNode } from 'react';
import { sidebarPolicies } from '../../consts/index';
import styles from './terms.module.css';
import { useLocation } from 'react-router-dom';

interface TermsLayoutProps {
    children: ReactNode;
}

const TermsLayout: React.FC<TermsLayoutProps> = ({ children }) => {
    const location = useLocation();

    return (
        <div className='flex flex-1'>
            <div className='flex-1 min-w-1 flex'>
                <div className={styles.documentation_desktop_nav}>
                    <div className='py-6 px-0 sticky top-0'>
                        <ul className='py-[0.8rem] px-0 m-0 max-w-none'>
                            {sidebarPolicies.map(policy => (
                                <li key={policy.id} className='mt-0 pl-0'>
                                    <a
                                        href={policy.link}
                                        className={`${location.pathname === policy.link ? styles.active : styles.notActive} py-[0.8rem] px-[2.4rem] flex items-start w-full h-auto text-left`}
                                    >
                                        <div className='flex-1 min-w-[1px] min-h-9'>{policy.name}</div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className='flex-1'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default TermsLayout;

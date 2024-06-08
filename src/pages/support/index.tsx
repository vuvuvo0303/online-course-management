import React, { useState } from 'react';
import styles from './support.module.css';
import { faq_student, faq_instructor, topic_student, topic_instructor } from '../../consts/index';

const Support = () => {
    const [activeTabs, setActivesTabs] = useState('learner');

    const handleTabChange = (tab: string) => {
        setActivesTabs(tab);
    }

    return (
        <div className='overflow-hidden bg-white max-w-5xl my-0 mx-auto'>
            <div className='pt-14 my-0 mx-auto w-full'>
                <div className="relative float-left px-[0.9375rem] w-full">
                    <ul className="block my-0 mx-auto text-center">
                        <li className="inline-block float-none">
                            <a
                                className={activeTabs === 'learner' ? styles.active : styles.notActive}
                                href='#student-content'
                                onClick={() => handleTabChange('learner')}
                            >
                                Learner
                            </a>
                        </li>

                        <li className="inline-block float-none">
                            <a
                                className={activeTabs === 'instructor' ? styles.active : styles.notActive}
                                href='#instructor-content'
                                onClick={() => handleTabChange('instructor')}
                            >
                                Instructor
                            </a>
                        </li>
                    </ul>

                    <div className='mb-0 pb-12 w-full'>
                        <div
                            id='student-content'
                            className={`pt-14 block float-none w-full outline-none px-0 py-[0.9375rem] ${activeTabs === 'learner' ? '' : 'hidden'}`}
                        >
                            <h2 className='mt-0 font-bold mb-7 text-2xl'>Frequently Asked Questions</h2>
                            <ul className={styles.faq_grid}>
                                {faq_student.map(faq => (
                                    <li key={faq.id}>
                                        <a href={faq.link} className='active:text-[#5624d0] bg-transparent'>
                                            <div className={styles.wrap}>
                                                <p className={styles.wrap_p}>{faq.name}</p>
                                            </div>
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            <h2 className='mb-7 text-2xl font-bold mt-10'>Select a Topic to Search for Help</h2>
                            <ul className={styles.faq_grid}>
                                {topic_student.map(topic => (
                                    <a href={topic.link}>
                                        <div className={styles.topic_wrap}>
                                            <img className='m-auto' src={topic.img} alt="" />
                                            <p className={styles.reg}>{topic.name}</p>
                                            <p className={styles.small}>{topic.description}</p>
                                        </div>
                                    </a>
                                ))}
                            </ul>
                        </div>
                        <div
                            id='instructor-content'
                            className={`pt-14 block float-none w-full outline-none px-0 py-[0.9375rem] ${activeTabs === 'instructor' ? '' : 'hidden'}`}
                        >
                            <h2 className='mt-0 mb-7 text-2xl font-bold'>Frequently Asked Questions</h2>
                            <ul className={styles.faq_grid}>
                                {faq_instructor.map(faq => (
                                    <li key={faq.id}>
                                        <a href={faq.link} className='active:text-[#5624d0] bg-transparent'>
                                            <div className={styles.wrap}>
                                                <p className={styles.wrap_p}>{faq.name}</p>
                                            </div>
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            <h2 className='mb-7 text-2xl font-bold mt-10'>Select a Topic to Search for Help</h2>
                            <ul className={styles.faq_grid}>
                                {topic_instructor.map(topic => (
                                    <a href={topic.link}>
                                        <div className={styles.topic_wrap}>
                                            <img className='m-auto' src={topic.img} alt="" />
                                            <p className={styles.reg}>{topic.name}</p>
                                            <p className={styles.small}>{topic.description}</p>
                                        </div>
                                    </a>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Support;

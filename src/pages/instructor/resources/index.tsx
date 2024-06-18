import React from 'react';
import { Link } from 'react-router-dom';
import { MessageFilled, QuestionCircleFilled, ReadFilled } from '@ant-design/icons';
import styles from './resources.module.css';

const InstructorResources: React.FC = () => {
    return (
        <div className={styles.instructor_responsive_container}>
            <div>
                <h1 className={`mt-[1.8rem] lg:mx-0 ml-[-2.8rem] mb-[3.2rem] ${styles.heading} `}>Resources</h1>
                <div className={`flex mt-0 ml-[-5.4rem] xl:mr-[-13.4rem] mr-[-9.4rem] mb-[-4.8rem] flex-wrap ${styles.inner_container}`}>
                    <div className={styles.info_wrapper}>
                        <Link to="https://www.udemy.com/udemy-teach-hub/" target='_blank' className={styles.info_title}>
                            <ReadFilled className={styles.icon} />
                            <h3 className={styles.h3_heading}>Teaching Center</h3>
                            <div className={styles.description}>
                                Find articles on FLearn teaching - from course creation to marketing.
                            </div>
                        </Link>
                    </div>
                    <div className={styles.info_wrapper}>
                        <Link to="https://community.udemy.com/" target='_blank' className={styles.info_title}>
                            <MessageFilled className={styles.icon} />
                            <h3 className={styles.h3_heading}>Instructor Community</h3>
                            <div className={styles.description}>
                                Share your progress and ask other instructors questions in our community.
                            </div>
                        </Link>
                    </div>
                    <div className={styles.info_wrapper}>
                        <Link to="https://support.udemy.com/hc/en-us?type=instructor" target='_blank' className={styles.info_title}>
                            <QuestionCircleFilled className={styles.icon} />
                            <h3 className={styles.h3_heading}>Help and Support</h3>
                            <div className={styles.description}>
                                Can't find what you need? Our support team is happy to help.
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorResources;

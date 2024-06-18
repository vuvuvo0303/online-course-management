import React from 'react';
import { Link } from 'react-router-dom';
import { MoneyCollectFilled, UpCircleOutlined, VideoCameraOutlined } from '@ant-design/icons';
import styles from './tools.module.css';

const InstructorTools: React.FC = () => {
    return (
        <div className={styles.instructor_responsive_container}>
            <div>
                <h1 className={`mt-[1.8rem] lg:mx-0 ml-[-2.8rem] mb-[3.2rem] ${styles.heading} `}>Tools</h1>
                <div className={`flex mt-0 ml-[-5.4rem] xl:mr-[-13.4rem] mr-[-9.4rem] mb-[-4.8rem] flex-wrap ${styles.inner_container}`}>
                    <div className={styles.info_wrapper}>
                        <Link to="https://www.udemy.com/udemy-teach-hub/" target='_blank' className={styles.info_title}>
                            <VideoCameraOutlined className={styles.icon} />
                            <h3 className={styles.h3_heading}>Test Video</h3>
                            <div className={styles.description}>
                                Get free feedback from FLearn video experts on your audio, video, and delivery.
                            </div>
                        </Link>
                    </div>
                    <div className={styles.info_wrapper}>
                        <Link to="https://community.udemy.com/" target='_blank' className={styles.info_title}>
                            <UpCircleOutlined className={styles.icon} />
                            <h3 className={styles.h3_heading}>Marketplace Insights</h3>
                            <div className={styles.description}>
                                Get FLearn-wide market data to create successful courses.
                            </div>
                        </Link>
                    </div>
                    <div className={styles.info_wrapper}>
                        <Link to="https://support.udemy.com/hc/en-us?type=instructor" target='_blank' className={styles.info_title}>
                            <MoneyCollectFilled className={styles.icon} />
                            <h3 className={styles.h3_heading}>Bulk coupon creation</h3>
                            <div className={styles.description}>
                                Create multiple coupons at once via CSV upload.
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorTools;

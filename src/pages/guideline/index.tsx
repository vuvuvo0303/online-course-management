
import styles from './guideline.module.css'
import ScrollToTopButton from '../../components/ScrollToTopButton'
import TermsLayout from '../../layout/terms/TermsLayout'
import { DislikeOutlined, LikeOutlined } from '@ant-design/icons'
const Guidelines = () => {

    return (
        <TermsLayout>
            <div className='px-0 mx-10 sm:px-10 relative'>
                <div className='w-full'>
                    <h1 className={`${styles.title} text-2xl sm:text-4xl`}>Q&A: Rules and Guidelines</h1>
                    <p className='p_line_height mt-3'>
                        The Q&A serves as a forum where students can engage each other and the instructor in conversations about the course content, and instructors can reinforce material that's been covered.
                    </p>

                    <br />

                    <h3 className='main_h3' style={{ marginTop: '0.3rem', marginBottom: '1rem' }}>Instructors – Detailed Guidelines</h3>

                    <ul style={{ listStyleType: 'disc' }} className='pl-5 my-5 mr-0 ml-5'>
                        <li>DO encourage your students to interact with each other.</li>
                        <li className={styles.guideline_li}>DO answer questions politely and in a timely manner.</li>
                        <li className={styles.guideline_li}>DON’T post rude, aggressive, or threatening comments.</li>
                        <li className={styles.guideline_li}>DON’T use the Q&A for promotion; posting coupon codes, promotional external links, links to other FLearn courses, any sort of marketing messages or references to the same are prohibited.</li>
                        <li className={styles.guideline_li}>DON’T ask for or post personal information about students.</li>
                    </ul>

                    <h3 className='main_h3' style={{ marginTop: '2.3rem', marginBottom: '1rem' }}>Students – Detailed Guidelines</h3>

                    <ul style={{ listStyleType: 'disc' }} className='pl-5 my-5 mr-0 ml-5'>
                        <li className={styles.guideline_li}>DO ask and answer questions politely.</li>
                        <li className={styles.guideline_li}>DO engage in discussions with students and the instructor.</li>
                        <li className={styles.guideline_li}>DON’T post rude, aggressive, or threatening comments.</li>
                    </ul>

                    <h3 className='main_h3' style={{ marginTop: '2.3rem', marginBottom: '1rem' }}>Escalation Policy</h3>

                    <p className='p_line_height mt-3'>
                        Learn what happens when there is a violation of our policies&nbsp;
                        <a href="/terms/policy" className={styles.link_to}>here</a>
                    </p>

                </div>
                <footer className='my-5'>
                    <div className='flexBetween pb-5'></div>
                    <div className='py-5 px-0'>
                        <span className='font-bold text-lg'>Was this article helpful?</span>
                        <div className='mt-4 mx-0 mb-1'>
                            <LikeOutlined className={styles.icon} />
                            <DislikeOutlined className={`${styles.icon} ml-2`} />
                        </div>
                    </div>
                </footer>
                <ScrollToTopButton />
            </div>
        </TermsLayout>

    )
}

export default Guidelines   
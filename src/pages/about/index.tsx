import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import styles from './about.module.css'; // Import CSS module

const About = () => {
    return (
        <div className={styles.aboutContainer}>
            <div className='container mx-auto'>
                <div className='bg-indigo-300'>
                    <Row>
                        <Col span={6}>
                            <div>
                                <img className='h-100 w-100' src="https://th.bing.com/th/id/OIG1.AGaZbxlA_0MPJqC3KzeN?w=270&h=270&c=6&r=0&o=5&pid=ImgGn" alt="logo" />
                            </div>
                        </Col>
                        <Col span={18} style={{ fontFamily: "Suisse Works" }} className="flex items-center justify-center">
                            <h1>Welcome to the place where dreams come true</h1>
                        </Col>
                    </Row>
                </div>
                <div className={`${styles.checkNews} flex items-center justify-center`}>
                    <Link to={"/"}>Check out our latest company news!</Link>
                </div>
                <div className={styles.skill}>
                    <h1 className='text-center'>Skills are the key to unlocking potential</h1>
                    <p className='text-center storyteller_desc'>Whether you want to learn a new skill, train your teams, or share what you know with the world, you’re in the right place. As a leader in online learning, we’re here to help you achieve your goals and transform your life.</p>
                </div>
                <div>
                    <Row className={`${styles.join} grid grid-cols-1   md:grid-cols-3 gap-24`}>
                        <div className={`${styles.work} flex flex-col`}>
                            <h1>Work with us</h1>
                            <p className='storyteller_desc'>At Flearn, we’re all learners and instructors. We live out our values every day to create a culture that is diverse, inclusive, and committed to helping employees thrive.</p>
                            <div className='flex-grow'></div>
                            <div className={`${styles.ColorLink} ${styles.red}`}>
                                <Link id='red' to={"/"}>Join our team</Link>
                            </div>
                        </div>
                        <div className={`${styles.research} flex flex-col`}>
                            <h1>See our research</h1>
                            <p className='storyteller_desc'>We’re committed to improving lives through learning. Dig into our original research to learn about the forces that are shaping the modern workplace.</p>
                            <div className='flex-grow'></div>
                            <div className={`${styles.ColorLink} ${styles.blue}`}>
                                <Link id='blue' to={"/"}>Learn more</Link>
                            </div>
                        </div>
                        <div className={`${styles.blog} flex flex-col`}>
                            <h1>Read our blog</h1>
                            <p className='storyteller_desc'>Want to know what we’ve been up to lately? Check out the Flearn blog to get the scoop on the latest news, ideas and projects, and more.</p>
                            <div className='flex-grow'></div>
                            <div className={`${styles.ColorLink} ${styles.purple}`}>
                                <Link id='purple' to={"/blog"}>Read now</Link>
                            </div>
                        </div>
                    </Row>
                </div>
            </div>
            <div className={styles.info}>
                <strong><h1 className='text-center'>Creating impact around the world</h1></strong>
                <p className='text-center storyteller_desc'>With our global catalog spanning the latest skills and topics, people and organizations everywhere are able to adapt to change and thrive.</p>
                <div className={styles.infoRow}>
                    <Row className='container mx-auto text-lg'>
                        <Col span={6} className={`${styles.col} grid-rows-2 gap`}>
                            <div className={styles.row1}>70M+</div>
                            <div className={styles.row2}>Learners</div>
                        </Col>
                        <Col span={6} className={`${styles.col} grid-rows-2`}>
                            <div className={styles.row1}>75K++</div>
                            <div className={styles.row2}>Instructors</div>
                        </Col>
                        <Col span={6} className={`${styles.col} grid-rows-2`}>
                            <div className={styles.row1}>220K++</div>
                            <div className={styles.row2}>Courses</div>
                        </Col>
                        <Col span={6} className={`${styles.col} grid-rows-2`}>
                            <div className={styles.row1}>970M++</div>
                            <div className={styles.row2}>Course enrollments</div>
                        </Col>
                    </Row>
                    <Row className='container mx-auto text-lg'>
                        <Col span={12} className={`${styles.col} grid-rows-2`}>
                            <div className={styles.row1}>74</div>
                            <div className={styles.row2}>Languages</div>
                        </Col>
                        <Col span={12} className={`${styles.col} grid-rows-2`}>
                            <div className={styles.row1}>16K+</div>
                            <div className={styles.row2}>Enterprise customers</div>
                        </Col>
                    </Row>
                </div>
            </div >
            <div className={`container mx-auto ${styles.infoOrganizations} storyteller_desc`}>
                <p>We help organizations of all types and sizes prepare for the path ahead — wherever it leads. Our curated collection of business and technical courses help companies, governments, and nonprofits go further by placing learning at the center of their strategies.</p>
            </div>
            <div className='container mx-auto mb-10'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
                    <div className='storyteller_desc'>Flearn fit us like a glove. Their team curates fresh, up-to-date courses from their marketplace and makes them available to customers.</div>
                    <div className='storyteller_desc'>In total, it was a big success, I would get emails about what a fantastic resource it was.</div>
                    <div className='storyteller_desc'>Flearn responds to the needs of the business in an agile and global manner. It’s truly the best solution for our employees and their careers.</div>
                </div>
            </div>
        </div>
    );
};

export default About;

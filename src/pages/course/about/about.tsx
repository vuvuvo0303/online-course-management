import { Row, Col } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import "./aboutcourse.css"


const About = () => {
    return (
        <div className='about-course'>
            <div className='container mx-auto '>
                <div className='bg-indigo-300'>
                    <Row>
                        <Col span={6} ><div >
                            <img className=' h-100 w-100 ...' src="https://th.bing.com/th/id/OIG1.AGaZbxlA_0MPJqC3KzeN?w=270&h=270&c=6&r=0&o=5&pid=ImgGn" alt="logo" />
                        </div></Col>
                        <Col span={18} style={{ fontFamily: "Suisse Works" }} className="flex items-center justify-center"><h1>Welcome to the place where dreams come true</h1></Col>
                    </Row>
                </div>
                <div className='checkNews flex items-center justify-center' >
                    <Link to={"/home"}>Check out our latest company news!</Link>
                </div>
                <div className='skill'>
                    <h1 className='text-center'>"The Web Developer Bootcamp" is a popular online course</h1>
                    <p className='text-center storyteller_desc'>It's known for its comprehensive curriculum and practical approach to learning web development. The course is often available on platforms like Udemy and is taught by experienced instructors.</p>
                </div>
                <div>
                    <Row className="join grid grid-cols-3 gap-24">

                        <div className='work'>
                            <h1>Hands-On Exercises</h1>
                            <p className='storyteller_desc'>Practical exercises and coding challenges to reinforce learning.</p>


                        </div>
                        <div className='research'>
                            <h1>Project-Based Learning</h1>
                            <p className='storyteller_desc'>Emphasizes building real-world projects to apply the concepts learned.</p>

                        </div>
                        <div className='blog'>
                            <h1>Instructor-Led Videos</h1>
                            <p className='storyteller_desc'> High-quality video lectures that explain concepts in detail.</p>

                        </div>
                    </Row>
                    <Row className='grid grid-cols-3 gap-24'>
                        <Col>
                            <div className='ColorLink red' >
                                <Link id='red' to={"/"} >Join our team</Link>
                            </div>
                        </Col>
                        <Col>
                            <div className='ColorLink blue' >
                                <Link id='blue' to={"/"} >Learn more</Link>
                            </div>
                        </Col>
                        <Col>
                            <div className='ColorLink purple'>
                                <Link id='purple' to={"/blog"} >Read now</Link>
                            </div>
                        </Col>
                    </Row>
                </div>

            </div>
            <div className='info'>
                <strong><h1 className='text-center'>Typical Modules</h1></strong>
                <p className='text-center storyteller_desc'>Covers both front-end and back-end development, including HTML, CSS, JavaScript, Node.js, Express.js, MongoDB, and more.
                </p>
                <div className='infoRow'>
                    <Row className='container mx-auto text-lg'>
                        <Col span={6} className='col  grid-rows-2 gap' >
                            <CheckCircleOutlined />
                            <div className="row1">HTML5</div>
                        </Col>
                        <Col span={6} className='col  grid-rows-2 ' >
                            <CheckCircleOutlined />
                            <div className="row1">CSS3</div>
                        </Col>
                        <Col span={6} className='col  grid-rows-2 ' >
                            <CheckCircleOutlined />
                            <div className="row1">REST</div>
                        </Col>
                        <Col span={6} className='col  grid-rows-2' >
                            <CheckCircleOutlined />
                            <div className="row1">ExpressJS</div>
                        </Col>
                        <Col span={6} className='col  grid-rows-2 ' >
                            <CheckCircleOutlined />
                            <div className="row1">jQuery</div>
                        </Col>
                        <Col span={6} className='col  grid-rows-2' >
                            <CheckCircleOutlined />
                            <div className="row1">NodeJS</div>
                        </Col>
                        <Col span={6} className='col  grid-rows-2 ' >
                            <CheckCircleOutlined />
                            <div className="row1">NPM</div>
                        </Col>
                        <Col span={6} className='col  grid-rows-2' >
                            <CheckCircleOutlined />
                            <div className="row1">MongoDB</div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};

export default About;
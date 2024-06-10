import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/CustomButton";
import { DollarOutlined, ExpandAltOutlined, GlobalOutlined } from "@ant-design/icons";

const InstructorPage: React.FC = () => {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate("/createCourse");
    };

    return (
        <>
            <section>
                <div className="flex items-center gap-24">
                    <div className="flex-1 flex flex-col gap-12 relative bg-cover xl:h-[30rem] lg:h-[25rem] md:h-80 h-40" style={{ backgroundImage: "url('https://s.udemycdn.com/teaching/billboard-desktop-2x-v4.jpg')" }}>
                        <div className="lg:mt-[8.5rem] md:mt-10 md:ml-16 w-full lg:w-1/2 px-4">
                            <h1 className="instructor_title">Start teaching with us</h1>
                            <p className="instructor_desc mb-3">Become an instructor and change people's lives, including your own</p>
                            <CustomButton width="48" title="Be an instructor" containerStyles="bg-blue-500" handleClick={handleStart} />
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <h1 className="main_h1 text-center pt-10">There are so many reasons to start</h1>
                <div className="w-full max-w-[134rem] mx-auto px-4">
                    <div className="flex flex-col sm:flex-row my-10 mx-0 pb-10 px-0 gap-8">
                        <div className="flex-1">
                            <div className="flexCenter flex-col gap-3">
                                <ExpandAltOutlined className="icon_size" />
                                <h4 className="ud_h4">Updated and constantly expanding</h4>
                                <p className="text-center">FLearn offers up-to-date courses, covering a wide variety of topics that are in great demand such as technology, business, personal development, and more.</p>
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="flexCenter flex-col gap-3">
                                <GlobalOutlined className="icon_size" />
                                <h4 className="ud_h4">Practical expertise</h4>
                                <p className="text-center">Our faculty members are thought leaders and field experts with hands-on experience and a passion for sharing knowledge with others.</p>
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="flexCenter flex-col gap-3">
                                <DollarOutlined className="icon_size" />
                                <h4 className="ud_h4">Affordable price</h4>
                                <p className="text-center">FLearn makes it easy for everyone to access the global knowledge base. We believe that knowledge is for everyone, and that's why we value knowledge for everyone, too.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <hr className="custom_hr" />

            <section>
                <div className="md:ml-24 md:mr-24 px-4 sm:px-0">
                    <div className="flex flex-col md:flex-row gap-24">
                        <div className="flex-1 flex mt-12 flex-col gap-7">
                            <h1 className="font-bold">Who Are We?</h1>
                            <p className="storyteller_desc">
                                We are a global educational platform committed to empowering individuals through knowledge. Our mission is to provide accessible and high-quality education to learners all over the world. With a strong community of passionate educators, we strive to make learning an enriching and enjoyable experience.
                            </p>
                            <p className="storyteller_desc">
                                Our instructors are industry experts and thought leaders who bring real-world experience and insights to their teaching. They are committed to providing engaging and practical learning experiences that help students achieve their personal and professional goals. We continuously support our instructors with resources and tools to ensure they can deliver the best possible educational content.
                            </p>
                        </div>
                        <div className="vertical_line hidden md:block"></div>
                        <div className="flex-1 flex mt-12 flex-col gap-7">
                            <h1 className="font-bold">Become an Instructor</h1>
                            <p className="storyteller_desc">
                                Are you passionate about sharing your knowledge and expertise with a global audience? Join our community of instructors and make a difference in the lives of millions of students worldwide. As an instructor, you'll have the opportunity to:
                                <br /><br />
                                - Inspire and educate students in over 150 countries
                                <br />
                                - Share your unique insights and professional experiences
                                <br />
                                - Earn income while doing what you love
                                <br />
                                - Collaborate with other educators and industry experts
                                <br />
                                <br />
                                Our platform provides all the tools and support you need to create engaging and impactful courses. Whether you're an expert in technology, business, art, or any other field, we welcome you to join us in our mission to make education accessible and effective for everyone.
                            </p>
                            <CustomButton title="Join Us Now" />
                        </div>
                    </div>
                </div>
            </section>

            <hr className="custom_hr" />

            <section>
                <div className="bg-blue-400 text-white ">
                    <div className="flexEvenly flex-wrap p-0 w-full max-w-[134rem] mr-auto ml-auto">
                        <div className="max-w-[27.8rem] py-6 px-10 text-center">
                            <div className="main_h1">62 million</div>
                            <p>Students</p>
                        </div>

                        <div className="max-w-[27.8rem] py-6 px-10 text-center">
                            <div className="main_h1">Over 75</div>
                            <p>Languages</p>
                        </div>

                        <div className="max-w-[27.8rem] py-6 px-10 text-center">
                            <div className="main_h1">830 million</div>
                            <p>Enrollments</p>
                        </div>

                        <div className="max-w-[27.8rem] py-6 px-10 text-center">
                            <div className="main_h1">Over 150</div>
                            <p>Countries</p>
                        </div>

                        <div className="max-w-[27.8rem] py-6 px-10 text-center">
                            <div className="main_h1">Over 15,000</div>
                            <p>Companies</p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="w-full max-w-[134rem] mx-auto px-4 sm:px-10">
                    <h4 className="ud_h text-center">Frequently Asked Questions About Instructor Programs</h4>
                    <div className="faq_container">
                        <ul className="max-w-[80rem] m-0 p-0">
                            <li className="mb-12 pl-0">
                                <h5 className="faq_h5">How much money can I earn?</h5>
                                <p>
                                    We have competitive commissions. The more you promote, the more money you make.
                                </p>
                            </li>
                            <li className="mb-12 pl-0">
                                <h5 className="faq_h5">What content do I promote?</h5>
                                <p>
                                    That's up to you! You're the one who chooses which courses to promote and which links or banners to use.
                                </p>
                            </li>
                            <li className="mb-12 pl-0">
                                <h5 className="faq_h5">Am I entitled to special promotions and discounts?</h5>
                                <p>
                                    As an Instructor, you have the right to exclusive publisher promotions as well as view unique content.
                                </p>
                            </li>
                            <li className="mb-12 pl-0">
                                <h5 className="faq_h5">How long does it take for me to become an Instructor?</h5>
                                <p>
                                    Apply today and we will review your application within 3 to 4 business days.
                                </p>
                            </li>
                            <li className="mb-12 pl-0">
                                <p>
                                    If you have any further questions, please visit <a href="/terms" className="text-[#5624d0] underline">FLearn Terms Help Center</a>.
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="bg-white-transparent">
                <div className="w-full max-w-[134rem] mx-auto py-20 px-4 sm:px-10 flex flex-col justify-center items-center">
                    <h2 className="main_h1 mx-auto">Become an instructor today</h2>
                    <p className="mt-6 mx-auto mb-10 main_p">Join one of the world's largest online learning marketplaces.</p>
                    <CustomButton title="Be an instructor" containerStyles="bg-blue-400" handleClick={handleStart} />
                </div>
            </section>
        </>
    );
}

export default InstructorPage;

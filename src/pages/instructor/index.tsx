import CustomButton from "../../components/CustomButton"

const InstructorPage = () => {
    const handleStart = () => {

    }
    return (
        <>
            <section>
                <div className="flex items-center gap-24">
                    <div className="flex-1 flex flex-col gap-12 relative bg-cover xl:h-[30rem] lg:h-[25rem] md:h-80 h-40" style={{ backgroundImage: "url('https://s.udemycdn.com/teaching/billboard-desktop-2x-v4.jpg')" }}>
                        <div className="lg:mt-[8.5rem] md:mt-10 md:ml-16 w-1/2">
                            <h1 className="instructor_title">Start teaching with us</h1>
                            <p className="instructor_desc mb-3">Become an instructor and change people's lives, including your own</p>
                            <CustomButton width="48" title="Be an instructor" containerStyles="bg-blue-500" handleClick={handleStart} />
                        </div>

                    </div>
                </div>
            </section>

            <section>
                <div className="w-full max-w-[134rem] mx-auto px-10">
                    <div className="flex my-10 mx-0 py-10 px-0">
                        <div className="mr-8 flex-1">
                            <div>
                                <h4 className="ud_h">Updated and constantly expanding</h4>
                                <p>FLearn offers up-to-date courses, covering a wide variety of topics that are in great demand such as technology, business, personal development, and more.</p>
                            </div>
                        </div>
                        <div className="mr-8 flex-1">
                            <div>
                                <h4 className="ud_h">Practical expertise</h4>
                                <p>Our faculty members are thought leaders and field experts with hands-on experience and a passion for sharing knowledge with others.</p>
                            </div>
                        </div>
                        <div className="flex-1">
                            <div>
                                <h4 className="ud_h">Affordable price</h4>
                                <p>FLearn makes it easy for everyone to access the global knowledge base. We believe that knowledge is for everyone, and that's why we value knowledge for everyone, too.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <hr className="custom_hr" />
            <section>
                <div className="md:ml-24 md:mr-24">
                    <div className="flex gap-24">
                        <div className="flex-1 flex mt-12 flex-col gap-7">
                            <h1 className="">Who Are We?</h1>
                            <p className="storyteller_desc">
                                We are a global educational platform committed to empowering individuals through knowledge. Our mission is to provide accessible and high-quality education to learners all over the world. With a strong community of passionate educators, we strive to make learning an enriching and enjoyable experience.
                            </p>
                            <p className="storyteller_desc">
                                Our instructors are industry experts and thought leaders who bring real-world experience and insights to their teaching. They are committed to providing engaging and practical learning experiences that help students achieve their personal and professional goals. We continuously support our instructors with resources and tools to ensure they can deliver the best possible educational content.
                            </p>
                        </div>
                        <div className="vertical_line"></div>
                        <div className="flex-1 flex mt-12 flex-col gap-7">
                            <h1 className="">Become an Instructor</h1>
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
                            <div className="heading_xxl">62 millions</div>
                            <p>Students</p>
                        </div>

                        <div className="max-w-[27.8rem] py-6 px-10 text-center">
                            <div className="heading_xxl">Over 75</div>
                            <p>Languages</p>
                        </div>

                        <div className="max-w-[27.8rem] py-6 px-10 text-center">
                            <div className="heading_xxl">830 millions</div>
                            <p>Enrollment</p>
                        </div>

                        <div className="max-w-[27.8rem] py-6 px-10 text-center">
                            <div className="heading_xxl">Over 150</div>
                            <p>Country</p>
                        </div>

                        <div className="max-w-[27.8rem] py-6 px-10 text-center">
                            <div className="heading_xxl">Over 15000</div>
                            <p>Companies</p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="w-full max-w-[134rem] mx-auto px-10">
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
                <div className="w-full max-w-[134rem] mx-auto py-36 px-10 flex flex-col justify-center items-center">
                    <h2 className="heading_xxl mx-auto">Become an instructor today</h2>
                    <p className="mt-6 mx-auto mb-10 text_xl">Join one of the world's largest online learning marketplaces.</p>
                    <CustomButton title="Be an instructor" containerStyles="bg-blue-400" handleClick={handleStart} />
                </div>
            </section>
        </>


    )
}

export default InstructorPage

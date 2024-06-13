import { HeartFilled, StarFilled, StarOutlined } from "@ant-design/icons"
import styles from './wishlistCard.module.css'

const WishListCard = () => {
    return (
        <div className={styles.course_card}>
            <div className='relative'>
                <div className={styles.course_cart_medium}>
                    <div className={styles.image_container}>
                        <img src="https://img-c.udemycdn.com/course/480x270/1565838_e54e_18.jpg" width={240} height={135} alt="" className={styles.img} />
                    </div>
                    <div className={styles.img_overlay}></div>
                </div>
                <div className='w-full text-[#2d2f31] whitespace-nowrap min-w-[1px]'>
                    <div className='my-[0.4rem]'>
                        <div>
                            <h3 className={styles.course_card_title}>
                                <a className={styles.link_to_course} href="https://www.udemy.com/course/the-complete-web-development-bootcamp/">The Complete 2024 Web Development Bootcamp</a>
                            </h3>
                        </div>
                    </div>
                    <div className={styles.course_card_author}>
                        <div className={styles.instructor_name}>
                            Stephane Maarek | AWS Certified Cloud Practitioner,Solutions Architect,Developer
                        </div>
                    </div>
                    <div className={`${styles.description_container} md:mr-10 lg:mr-0`}>
                        <div className='flex mb-[.4rem] items-center flex-wrap'>
                            <span className='inline-flex items-center'>
                                <span className={styles.point}>4.0</span>
                                <StarFilled className='text-yellow-400' />
                                <StarFilled className='text-yellow-400' />
                                <StarFilled className='text-yellow-400' />
                                <StarFilled className='text-yellow-400' />
                                <StarOutlined />
                            </span>
                            <span className={styles.enrollment_quantity}>(225,245)</span>
                        </div>
                        <div className={`mb-[.4rem] lg:block flex flex-nowrap items-center`}>
                            <div className={styles.course_details_container}>
                                <span>27.5 total hours</span>
                                <div className={styles.bullet}></div>
                                <span>397 lectures</span>
                            </div>
                            <div className="mb-[.4rem]">
                                <div className={styles.base_price_container}>
                                    <div className={styles.base_price_text}>
                                        <span>₫249,000</span>
                                    </div>
                                    <div className={styles.discount_price_container}>
                                        <div>
                                            <span>
                                                <s>
                                                    <span>₫1,599,000</span>
                                                </s>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="mb-[.2rem]">
                            <div className="gap-x-[.8rem] gap-y-[.4rem]">
                                <div className={styles.badges}>
                                    Bestseller
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className={styles.love_icon}>
                        <HeartFilled />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WishListCard
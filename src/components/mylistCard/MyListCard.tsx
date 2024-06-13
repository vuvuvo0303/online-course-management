import { StarFilled, StarOutlined } from "@ant-design/icons"
import styles from './mylistCard.module.css'

const MyListCard = () => {
    return (
        <div className={styles.course_card}>
            <div className='relative'>
                <div className={styles.course_cart_medium}>
                    <div className={styles.image_container}>
                        <img src="https://img-c.udemycdn.com/course/480x270/2196488_8fc7_10.jpg" width={240} height={135} alt="" className={styles.img} />
                    </div>
                    <div className={styles.img_overlay}></div>
                </div>
                <div className='w-full text-[#2d2f31] whitespace-nowrap min-w-[1px]'>
                    <div className='my-[0.4rem]'>
                        <div>
                            <h3 className={styles.course_card_title}>
                                <a className={styles.link_to_course} href="https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/">Ultimate AWS Certified Solutions Architect Associate SAA-C03</a>
                            </h3>
                        </div>
                    </div>
                    <div className={styles.course_card_author}>
                        <div className={styles.instructor_name}>
                            Stephane Maarek | AWS Certified Cloud Practitioner,Solutions Architect,Developer
                        </div>
                    </div>
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
                    <div className='mb-[.4rem] flex flex-wrap items-center'>
                        <div className={styles.course_details_container}>
                            <span>27.5 total hours</span>
                            <div className={styles.bullet}></div>
                            <span>397 lectures</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyListCard
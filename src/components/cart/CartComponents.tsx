import styles from './cartComponents.module.css'
import {Rate} from "antd";
import {paths} from "../../consts/index.ts";
const CartComponents = () => {

    return (
        <div className={styles.shopping_wrapper}>
            <div className={styles.item_container}>
                <div className={styles.image_area}>
                    <div className={styles.image_wrapper}>
                        <img src="https://img-b.udemycdn.com/course/480x270/567828_67d0.jpg" alt="" loading='lazy' className={styles.item_image} />
                    </div>
                </div>
                <div className={styles.item_header}>
                    <h3 className={styles.h3_cart_title}>
                        <a href="https://www.udemy.com/course/complete-python-bootcamp/" className='text-[#2d2f31] md:'>The Complete Python Bootcamp From Zero to Hero in Python</a>
                    </h3>
                    <div className={styles.course_instructor}>
                        <span className={styles.instructor_list}>By Jose Portilla and 1 other</span>
                    </div>
                </div>
                <div className={styles.item_rating}>
                    <span className={styles.star_rating}>
                       <Rate disabled defaultValue={4.5} style={{ fontSize: '12px' }} /> 4.5 (1,488)
                    </span>
                    <span className={styles.rating_quantity}>(300,946 ratings)</span>
                </div>
                <div className={styles.item_meta}>
                    <span className='flex flex-wrap items-center'>58.5 total hours</span>
                    <div className={styles.bullet}></div>
                    <span className='flex flex-wrap items-center'>636 lectures</span>
                    <div className={styles.bullet}></div>
                    <span className='flex flex-wrap items-center'>All Levels</span>
                </div>
                <div className={styles.item_vertical}>
                    {
                        location.pathname.includes(paths.STUDENT_CART) && (
                            <>
                                <button type='button' className={styles.button}>
                                    <span>Remove</span>
                                </button>
                                <button type='button' className={styles.button}>
                                    <span>Save for later</span>
                                </button>
                            </>
                        )
                    }
                </div>
                <div className={styles.price_container}>
                    <div className={styles.all_price}>
                        <div className={styles.base_price}>
                            <span>₫349,000</span>
                        </div>
                        <div className={styles.discount_price}>
                            <div>
                                <span>
                                    <s>
                                        <span>₫2,199,000</span>
                                    </s>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartComponents
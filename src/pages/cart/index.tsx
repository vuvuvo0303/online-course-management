import { CloseOutlined } from '@ant-design/icons'
import styles from './cart.module.css'
const Cart: React.FC = () => {
    return (
        <div className="py-0 px-[4.8rem] mb-[6.4rem] max-w-[134rem] my-0 mx-auto">
            <h1 className="mt-10 main_h1">Course Cart</h1>
            <div className="mt-8">
                <h3 className={styles.h3_cart_title}>1 Course in Cart</h3>
                <div className="flex-1 flex mt-0">
                    <div>
                        <ul className="min-w-full m-0 p-0">
                            <div className={styles.shopping_wrapper}>
                                <div className={styles.item_container}>
                                    <div className={styles.image_area}>
                                        <div className={styles.image_wrapper}>
                                            <img src="https://img-b.udemycdn.com/course/480x270/567828_67d0.jpg" alt="" loading='lazy' className={styles.item_image} />
                                        </div>
                                    </div>
                                    <div className={styles.item_header}>
                                        <h3 className={styles.h3_cart_title}>
                                            <a href="https://www.udemy.com/course/complete-python-bootcamp/" className='text-[#2d2f31]'>The Complete Python Bootcamp From Zero to Hero in Python</a>
                                        </h3>
                                        <div className={styles.course_instructor}>
                                            <span className={styles.instructor_list}>By Jose Portilla and 1 other</span>
                                        </div>
                                    </div>
                                    <div className={styles.item_rating}>
                                        <span className={styles.star_rating}>
                                            <span className={styles.point}>4.6</span>
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
                                        <button type='button' className={styles.button}>
                                            <span>Remove</span>
                                        </button>
                                        <button type='button' className={styles.button}>
                                            <span>Save for later</span>
                                        </button>
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
                            <div className={styles.shopping_wrapper}>
                                <div className={styles.item_container}>
                                    <div className={styles.image_area}>
                                        <div className={styles.image_wrapper}>
                                            <img src="https://img-b.udemycdn.com/course/480x270/567828_67d0.jpg" alt="" loading='lazy' className={styles.item_image} />
                                        </div>
                                    </div>
                                    <div className={styles.item_header}>
                                        <h3 className={styles.h3_cart_title}>
                                            <a href="https://www.udemy.com/course/complete-python-bootcamp/" className='text-[#2d2f31]'>The Complete Python Bootcamp From Zero to Hero in Python</a>
                                        </h3>
                                        <div className={styles.course_instructor}>
                                            <span className={styles.instructor_list}>By Jose Portilla and 1 other</span>
                                        </div>
                                    </div>
                                    <div className={styles.item_rating}>
                                        <span className={styles.star_rating}>
                                            <span className={styles.point}>4.6</span>
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
                                        <button type='button' className={styles.button}>
                                            <span>Remove</span>
                                        </button>
                                        <button type='button' className={styles.button}>
                                            <span>Save for later</span>
                                        </button>
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
                        </ul>
                    </div>

                    <div className={styles.cart_checkout}>
                        <div className={styles.total_price}>
                            <div className={styles.total_checkout_container}>
                                <div className={styles.total_price_label}>Total:</div>
                                <div className={styles.base_price_heading}>
                                    <span>₫349,000</span>
                                </div>
                                <div className={styles.discount_price_checkout}>
                                    <div>
                                        <s>
                                            <span>₫3,598,000</span>
                                        </s>
                                    </div>
                                </div>
                                <div className={styles.discount_price_checkout}>
                                    <div>
                                        <span>83% off</span>
                                    </div>
                                </div>
                            </div>
                            <button className={styles.checkout_button}>Checkout</button>
                        </div>
                        <div className={styles.redeem_coupon}>
                            <div>
                                <div className='flex flex-col'></div>
                                <p className={styles.redeem_title}>Promotions</p>
                                <div className='mb-3 text-[#6a6f73]'>
                                    <div className={styles.redeem_coupon_code}>
                                        <div className={styles.redeem_coupon_text}>
                                            <ul>
                                                <li className='py-15 pr-15 pl-2 text-xs'>
                                                    <b>ST21MT61124</b> is applied
                                                </li>
                                            </ul>
                                        </div>
                                        <CloseOutlined className='mr-2' />
                                    </div>
                                </div>
                                <div className='max-w-none min-w-[18rem]'>
                                    <div className='flex'>
                                        <input type="text" className={styles.text_input} placeholder='Enter coupon' />
                                        <button className={styles.apply_coupon_button}>
                                            <span>Apply</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Cart
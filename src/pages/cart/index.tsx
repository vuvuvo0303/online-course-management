import { CloseOutlined } from '@ant-design/icons'
import styles from './cart.module.css'
import { CartComponents } from '../../components'
import { Link } from 'react-router-dom'
const Cart: React.FC = () => {
    return (
        <div className="py-0 md:px-[4.8rem] px-4 mb-[4.4rem] max-w-[134rem] my-0 mx-auto">
            <h1 className="mt-10 main_h1">Course Cart</h1>
            <div className="mt-8">
                <h3 className={styles.h3_cart_title}>1 Course in Cart</h3>
                <div className="flex-1 lg:flex mt-0">
                    <div>
                        <ul className="min-w-full m-0 p-0">
                            <CartComponents />
                            <CartComponents />
                            <CartComponents />

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
                            <Link to="/checkout">
                                <button className={styles.checkout_button}>Checkout now</button>
                            </Link>
                        </div>
                        <div className={styles.redeem_coupon}>
                            <div>
                                <div className='flex flex-col'></div>
                                <p className={styles.redeem_title}>Promotions</p>
                                <div className='mb-3 text-[#6a6f73]'>
                                    <div className={styles.redeem_coupon_code}>
                                        <div className={styles.redeem_coupon_text}>
                                            <ul>
                                                <li className='py-15 pl-2 text-xs'>
                                                    <b>ST21MT61124</b> is applied
                                                </li>
                                            </ul>
                                        </div>
                                        <CloseOutlined className='mr-2 text-[#2d2f31]' />
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

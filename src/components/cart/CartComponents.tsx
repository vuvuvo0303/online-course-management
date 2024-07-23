import styles from './cartComponents.module.css';
import { Checkbox, Col, Form, Row, Tag } from "antd";
import { getColorCart, imgCourse, paths } from "../../consts/index.ts";

import CustomButton from '../../components/CustomButton.tsx';
import { Link } from 'react-router-dom';
import { Cart } from '../../models';

interface CartComponentsProps {
    totalCourse: number;
    cartsNew: Cart[];
    cartsCancel: Cart[];
    totalMoney: number;
    totalCost: number;
    handleCheckoutNow: () => void;
    onChangeCheckBox: (cart: Cart) => void;
    handleDeleteCart: (cart_id: string) => void
    cartsWaitingPaid: Cart[];
}

const CartComponents: React.FC<CartComponentsProps>
    = ({ totalCourse, cartsNew, cartsCancel, onChangeCheckBox, handleDeleteCart}) => {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14, offset: 5 },
            },
        };

        return (
            <div className={`${styles.shopping_wrapper}`} style={{ minWidth: "768px" }}>
                <h3 className={styles.h3_cart_title}>{totalCourse} Courses in Cart</h3>
                <Form {...formItemLayout} initialValues={{}}>
                    {cartsNew.length === 0 && cartsCancel.length === 0 ? (
                        <div className={styles.empty_cart_container}>
                            <img width={200} height={200} alt='empty-cart-display' src='https://s.udemycdn.com/browse_components/flyout/empty-shopping-cart-v2-2x.jpg' />
                            <p className='text-lg mb-4'>Your cart is empty. Keep shopping to find a course!</p>
                            <Link to={paths.HOME}>
                                <CustomButton title='Keep Shopping' containerStyles='bg-purple-500' />
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div>
                                <Row className='border p-5 mt-10' gutter={10}>
                                    <Col className='font-bold text-center' span={6}>Course</Col>
                                    <Col span={6}></Col>
                                    <Col className='font-bold' span={6}>Discount</Col>
                                    <Col className='font-bold' span={6}>
                                        <Row>
                                            <Col span={12}>Total</Col>
                                            <Col span={12}>Action</Col>
                                        </Row>
                                    </Col>
                                </Row>
                                {cartsNew.map((cart) => (
                                    <div style={{ minWidth: "768px" }} key={cart._id}>
                                        <Row className='border my-5' gutter={10}>
                                            <Col span={6}>
                                                <Row>
                                                    <Col span={4} className="flex items-center justify-center">
                                                        <Checkbox onChange={() => onChangeCheckBox(cart)}></Checkbox>
                                                    </Col>
                                                    <Col span={20}>
                                                        <img src={imgCourse} alt="Course" />
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col className='' span={6}>
                                                <Tag className='mt-8 text-center' color={getColorCart(cart.status)}> {cart.status}</Tag>
                                                <p className='mt-2 font-bold '>{cart.course_name}</p>
                                                <div className='mt-2'>
                                                    <p>{cart.cart_no}</p>
                                                </div>
                                            </Col>
                                            <Col span={6}>
                                                <div className='mt-12'>
                                                    <p>Discount: {cart.discount}%</p>
                                                    <p>Cost: {cart.price}</p>
                                                </div>
                                            </Col>
                                            <Col span={6}>
                                                <Row className='mt-12'>
                                                    <Col span={12}>
                                                        <p>Price:</p>
                                                        <p>{cart.price_paid}</p>
                                                    </Col>
                                                    <Col span={12}>
                                                        <p onClick={() => handleDeleteCart(cart._id)} className=' text-red-500 cursor-pointer'>Delete</p>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </div>
                                ))}
                                {cartsCancel.map((cart) => (
                                    <div style={{ minWidth: "768px" }} key={cart._id}>
                                        <Row className='border my-5' gutter={10}>
                                            <Col span={6}>
                                                <img src={imgCourse} alt="Course" />
                                            </Col>
                                            <Col className='' span={6}>
                                                <Tag className='mt-8 text-center' color={getColorCart(cart.status)}> {cart.status}</Tag>
                                                <p className='mt-2 font-bold '>{cart.course_name}</p>
                                                <p className='mt-2'><span className='font-bold'>Cart no:</span>{cart.cart_no}</p>
                                                <Checkbox onChange={() => onChangeCheckBox(cart)}>Checkbox</Checkbox>
                                            </Col>
                                            <Col span={6}>
                                                <p className='pt-12'>Discount: {cart.discount}%</p>
                                                <p>{cart.price}</p>
                                            </Col>
                                            <Col span={6}>
                                                <Row>
                                                    <Col span={12}>
                                                        <p className='pt-12'>Total:</p>
                                                        <p>{cart.price_paid}</p>
                                                    </Col>
                                                    <Col span={12}>
                                                        <p onClick={() => handleDeleteCart(cart._id)} className='pt-12 text-red-500 cursor-pointer'>Delete</p>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </div>
                                ))}
                            </div>
                            
                        </>
                    )}
                </Form>
            </div>
        );
    };

export default CartComponents;

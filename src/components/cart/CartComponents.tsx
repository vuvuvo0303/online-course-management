import styles from './cartComponents.module.css';
import { Checkbox, Col, Form, Row, Tag } from "antd";
import { getColorCart, imgCourse, paths } from "../../consts/index.ts";
import { deleteCart, displayCart, updateStatusCart } from '../../services/cart.ts';
import { useEffect, useState } from 'react';
import { Cart } from '../../models';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/CustomButton.tsx';
import { Link } from 'react-router-dom';

const CartComponents = () => {

    const [cartNew, setCartNew] = useState<Cart[]>([]);
    const [cartCancel, setCartCancel] = useState<Cart[]>([]);
    const [totalMoney, setTotalMoney] = useState<number>(0);
    const [totalCost, setTotalCost] = useState<number>(0);
    const [totalCourse, setTotalCourse] = useState<number>(0);
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [cartsChecked, setCartsChecked] = useState<Cart[]>([]);
    const [indexCartChecked, setIndexCartChecked] = useState<number>(0);

    const getCartNew = async () => {
        const response = await displayCart("new");
        if (response) {
            setCartNew(response);
            setLoading(false);
        }
    };

    const getCartCancel = async () => {
        const response = await displayCart("cancel");
        if (response) {
            setCartCancel(response);
            setLoading(false);
        }
    };

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            getCartNew();
            getCartCancel();
        }
    }, [token]);

    if (loading) {
        return <p className='text-center'>Loading ...</p>;
    }

    const handleDeleteCart = async (cart_id: string) => {
        await deleteCart(cart_id);
        getCartNew();
        getCartCancel();
    };

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

    const handlePlus = (cart: Cart[]) => {
        let total = 0;
        let totalCost = 0;
        for (let index = 0; index < cart.length; index++) {
            total += cart[index].price_paid;
            totalCost += cart[index].price;
        }
        setTotalMoney(total);
        setTotalCourse(cart.length);
        setTotalCost(totalCost);
    };

    const onChange = (cart: Cart) => {
        let index = indexCartChecked;
        let foundCartId = cartsChecked.find(cartId => cartId === cart);
        let newArray: Cart[] = [];
        if (foundCartId) {
            newArray = cartsChecked.filter(item => item !== foundCartId);
            index--;
            setIndexCartChecked(index);
        } else {
            if (indexCartChecked === 0) {
                newArray[indexCartChecked] = cart;
                cartsChecked[index] = cart;
                index++;
                setIndexCartChecked(index);
            } else if (indexCartChecked >= 1) {
                newArray[indexCartChecked] = cart;
                cartsChecked[index] = cart;
                index++;
                setIndexCartChecked(index);
            }
        }
        if (foundCartId) {
            setCartsChecked(newArray);
            handlePlus(newArray);
            foundCartId = undefined;
        } else {
            setCartsChecked(cartsChecked);
            handlePlus(cartsChecked);
        }
    };

    const handleCheckoutNow = async () => {
        for (const element of cartsChecked) {
            await updateStatusCart("waiting_paid", element._id, element.cart_no);
        }
        navigate(paths.STUDENT_CHECKOUT);
    };

    return (
        <div className={`${styles.shopping_wrapper}`} style={{ minWidth: "768px" }}>
            <h3 className={styles.h3_cart_title}>{totalCourse} Courses in Cart</h3>
            <Form {...formItemLayout} initialValues={{}}>
                {cartNew.length === 0 && cartCancel.length === 0 ? (
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
                            {cartNew.map((cart) => (
                                <div style={{ minWidth: "768px" }} key={cart._id}>
                                    <Row className='border my-5' gutter={10}>
                                        <Col span={6}>
                                            <Row>
                                                <Col span={4} className="flex items-center justify-center">
                                                    <Checkbox onChange={() => onChange(cart)}></Checkbox>
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
                            {cartCancel.map((cart) => (
                                <div style={{ minWidth: "768px" }} key={cart._id}>
                                    <Row className='border my-5' gutter={10}>
                                        <Col span={6}>
                                            <img src={imgCourse} alt="Course" />
                                        </Col>
                                        <Col className='' span={6}>
                                            <Tag className='mt-8 text-center' color={getColorCart(cart.status)}> {cart.status}</Tag>
                                            <p className='mt-2 font-bold '>{cart.course_name}</p>
                                            <p className='mt-2'><span className='font-bold'>Cart no:</span>{cart.cart_no}</p>
                                            <Checkbox onChange={() => onChange(cart)}>Checkbox</Checkbox>
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
                        <div className={styles.cart_checkout}>
                            <div className={styles.total_price}>
                                <div className={styles.total_checkout_container}>
                                    <div className={styles.total_price_label}>Total:</div>
                                    <div className={styles.base_price_heading}>
                                        <span>₫{totalMoney}</span>
                                    </div>
                                    <div className={styles.discount_price_checkout}>
                                        <div>
                                            <s>
                                                <span>₫{totalCost}</span>
                                            </s>
                                        </div>
                                    </div>
                                    <div className={styles.discount_price_checkout}>
                                    </div>
                                </div>
                                <button onClick={handleCheckoutNow} className={styles.checkout_button}>Checkout now</button>
                            </div>
                        </div>
                    </>
                )}
            </Form>
        </div>
    );
};

export default CartComponents;

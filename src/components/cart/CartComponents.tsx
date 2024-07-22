import styles from './cartComponents.module.css'
import { Checkbox, Col, Form, Row, Tag } from "antd";
import { getColorCart, imgCourse } from "../../consts/index.ts";
import { deleteCart, displayCart, updateStatusCart } from '../../services/cart.ts';
import { useEffect, useState } from 'react';
import { Cart } from '../../models';
import { useNavigate } from 'react-router-dom';

const CartComponents = () => {

    const [cartNew, setCartNew] = useState<Cart[]>([]);
    const [cartCancel, setCartCanCel] = useState<Cart[]>([]);
    const [totalMoney, setTotalMoney] = useState<number>(0);
    const [totalCost, setTotalCost] = useState<number>(0);
    const [totalCourse, setTotalCourse] = useState<number>(0);
    // const [course, setCourse] = useState<Course>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [cartsChecked, setCartsChecked] = useState<Cart[]>([])
    const [indexCartChecked, setindexCartChecked] = useState<number>(0)

    const getCartNew = async () => {
        const res = await displayCart("new");
        if (res) {
            setCartNew(res);
            setLoading(false)
        }
    }

    const getCartCancel = async () => {
        const res = await displayCart("cancel");
        if (res) {
            setCartCanCel(res);
            setLoading(false)
        }
    }
    const token = localStorage.getItem("token")

    useEffect(() => {
        if (token) {
            getCartNew();
            getCartCancel();
        }
    }, [token])

    if (loading) {
        return (
            <p className='text-center'>Loading ...</p>
        )
    }

    // fetch course to get image
    // const fetchCourse = async (keyword: string, category_id: string) => {
    //     const res = await fetchCoursesByClient(keyword, category_id);
    //     setCourse(res)
    // }

    const handleDeleteCart = async (cart_id: string) => {
        await deleteCart(cart_id);
        getCartNew();
        getCartCancel();
    }
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
    const array: Cart[] = []
    // caculte total price, cost and course when user checked cart
    const handlePlus = (cart: Cart[]) => {
        let total = 0;
        let totalCost = 0;
        for (let index = 0; index < cart.length; index++) {
            total += cart[index].price_paid;
            totalCost += cart[index].price
        }
        setTotalMoney(total);
        setTotalCourse(cart.length);
        setTotalCost(totalCost);
    }

    const onChange = (cart: Cart) => {
        let index = indexCartChecked;
        console.log(`checked = ${cart}`);
        console.log("check index: ", index);
        let foungCart_id = cartsChecked.find(cartId => cartId === cart)
        console.log("foungCart_id: ", foungCart_id);
        let newArray: Cart[] = []
        // check cartId is exsist in cartsChecked
        if (foungCart_id) {
            // if cartId exsisted -> delete 
            newArray = cartsChecked.filter(item => item !== foungCart_id);
            console.log("newArray: ", newArray);
            index--;
            setindexCartChecked(index);
        } else {
            if (indexCartChecked === 0) {
                array[indexCartChecked] = cart;
                cartsChecked[index] = cart
                index++;
                setindexCartChecked(index);
            } else if (indexCartChecked >= 1) {
                array[indexCartChecked] = cart;
                cartsChecked[index] = cart
                index++;
                setindexCartChecked(index);
            }
        }
        //
        if (foungCart_id) {
            setCartsChecked(newArray);
            handlePlus(newArray)
            foungCart_id = undefined
        } else {
            setCartsChecked(cartsChecked);
            handlePlus(cartsChecked)
        }

    };
    console.log("check cartsChecked:", cartsChecked);

    const handleCheckoutNow = async () => {
        for (const element of cartsChecked) {
            console.log("element: ", element);
            const res = await updateStatusCart("waiting_paid", element._id, element.cart_no);
            console.log("handleCheckoutNow: ", res);
        }
        navigate("/checkout")
    };


    return (
        <div className={`${styles.shopping_wrapper}`} style={{ minWidth: "768px" }}>
            <h3 className={styles.h3_cart_title}>{totalCourse} Courses in Cart</h3>
            <Form {...formItemLayout} initialValues={{}}>
                <div >
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
                    {
                        cartNew.map((cart) => {
                            return (
                                <div style={{ minWidth: "768px" }}>
                                    <Row className='border my-5' gutter={10}>
                                        <Col span={6}>
                                            <img src={imgCourse} />
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
                                                    <p >{cart.price_paid}</p>
                                                </Col>
                                                <Col span={12}>
                                                    <p onClick={() => handleDeleteCart(cart._id)} className='pt-12 text-red-500'>Delete</p>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>

                                </div>
                            )
                        })
                    }
                    {
                        cartCancel.map((cart) => {
                            return (
                                <div style={{ minWidth: "768px" }}>
                                    <Row className='border my-5' gutter={10}>
                                        <Col span={6}>
                                            <img src={imgCourse} />
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
                                                    <p >{cart.price_paid}</p>
                                                </Col>
                                                <Col span={12}>
                                                    <p onClick={() => handleDeleteCart(cart._id)} className='pt-12 text-red-500'>Delete</p>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>

                                </div>
                            )
                        })
                    }
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
                                {/* <div>
                                <span>83% off</span>
                            </div> */}
                            </div>
                        </div>
                        <button onClick={handleCheckoutNow} className={styles.checkout_button}>Checkout now</button>
                    </div>
                </div>
            </Form>
        </div>
    )
}

export default CartComponents
import styles from './cartComponents.module.css';
import { Checkbox, Col, Form, Row, Tag } from "antd";
import { getColorCart } from "../../consts";
import { formItemLayout } from '../../layout/form';
import { CartComponentsProps } from '../../models/Cart';
import { formatCurrency } from '../../utils';


const CartComponents: React.FC<CartComponentsProps>
    = ({ cartsNew, cartsCancel, onChangeCheckBox, handleDeleteCart }) => {
        return (
            <div className={`${styles.shopping_wrapper}`} style={{ minWidth: "768px" }}>
                <Form {...formItemLayout} initialValues={{}}>
                    {!cartsNew && !cartsCancel ? (
                        <>
                        </>
                    ) : (
                        <>
                            {cartsNew && (
                                <div style={{ minWidth: "768px" }} key={cartsNew._id}>
                                    <Row className='border ' gutter={10}>
                                        <Col span={6}>
                                            <Row>
                                                <Col span={4} className="flex items-center justify-center">
                                                    <Checkbox onChange={() => onChangeCheckBox(cartsNew)}></Checkbox>
                                                </Col>
                                                <Col span={20}>
                                                    <img src={cartsNew.course_image} alt="Course" />
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col className='' span={6}>
                                            <p className='mt-10 font-bold '>{cartsNew.course_name}</p>
                                            <div className='mt-2'>
                                                <p>{cartsNew.cart_no}</p>
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <div className='mt-12'>
                                                <p>Discount: {cartsNew.discount}%</p>
                                                <p>Cost: {formatCurrency(cartsNew.price)}</p>
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <Row className='mt-12'>
                                                <Col span={12}>
                                                    <p>Price:</p>
                                                    <p>{formatCurrency(cartsNew.price_paid)}</p>
                                                </Col>
                                                <Col span={12}>
                                                    <p onClick={() => handleDeleteCart(cartsNew._id)} className=' text-red-500 cursor-pointer'>Delete</p>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                            )}
                            {cartsCancel && (
                                <div style={{ minWidth: "768px" }} key={cartsCancel._id}>
                                    <Row className='border my-5' gutter={10}>
                                        <Col span={6}>
                                            <img src={cartsNew?.course_image} alt="Course" />
                                        </Col>
                                        <Col className='' span={6}>
                                            <Tag className='mt-8 text-center' color={getColorCart(cartsCancel.status)}> {cartsCancel.status}</Tag>
                                            <p className='mt-2 font-bold '>{cartsCancel.course_name}</p>
                                            <p className='mt-2'><span className='font-bold'>Cart no:</span>{cartsCancel.cart_no}</p>
                                            <Checkbox onChange={() => onChangeCheckBox(cartsCancel)}>Checkbox</Checkbox>
                                        </Col>
                                        <Col span={6}>
                                            <p className='pt-12'>Discount: {cartsCancel.discount}%</p>
                                            <p>{formatCurrency(cartsCancel.price)}</p>
                                        </Col>
                                        <Col span={6}>
                                            <Row>
                                                <Col span={12}>
                                                    <p className='pt-12'>Total:</p>
                                                    <p>{formatCurrency(cartsCancel.price_paid)}</p>
                                                </Col>
                                                <Col span={12}>
                                                    <p onClick={() => handleDeleteCart(cartsCancel._id)} className='pt-12 text-red-500 cursor-pointer'>Delete</p>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                            )}
                        </>
                    )}
                </Form>
            </div>
        );
    };

export default CartComponents;
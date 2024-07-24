import React, { useState, useEffect } from "react";
import { Radio, Input, Form, Row, Col, Tag, message } from "antd";
import { ToastContainer } from "react-toastify";

import { getColorCart, paths } from "../../consts";
import styles from "./checkout.module.css";
import { Cart } from "../../models";
import { getCarts, updateStatusCart } from '../../services';
import { useNavigate } from "react-router-dom";
import { User } from "../../models/User";
import { Link } from "react-router-dom";
import CustomButton from "../../components/CustomButton";

const Checkout: React.FC = () => {
  // const [payment, setPayment] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [form] = Form.useForm();
  // const [course, setCourse] = useState<Course[]>([]);
  // const [courseImage, setCourseImage] = useState<string>("");
  const [user, setUser] = useState<User>();
  const [carts, setCarts] = useState<Cart[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);
  const paymentMethods = [
    { label: "Credit Card", value: "credit_card" },
    { label: "PayPal", value: "paypal" },
    { label: "Bank Transfer", value: "bank_transfer" },
  ];

  const navigate = useNavigate();
  useEffect(() => {
    getCart();
    //fetchPaymentDetails();
    // fetchCourseDetails();
    loadUserFromLocalStorage();
  }, []);

  const getCart = async () => {
    setLoading(true)
    const res = await getCarts("waiting_paid");
    if (res) {
      let total = 0;
      let totalCost = 0;
      setCarts(res);
      console.log("res: ", res);
      for (let index = 0; index < res.length; index++) {
        total += res[index].price_paid;
        totalCost += res[index].price
      }
      setTotalPrice(total);
      setTotalCost(totalCost);
      setLoading(false)
    }
  }

  const loadUserFromLocalStorage = () => {
    const userString = localStorage.getItem("user");
    if (userString) {
      setUser(JSON.parse(userString));
    }
  };

  const handleCancelPayment = async () => {
    for (const element of carts) {
      console.log("element: ", element);
      const res = await updateStatusCart("cancel", element._id, element.cart_no);
      console.log("handlePayment: ", res);
    }
    message.success("Cancel Checkout Successfully")
    navigate(paths.STUDENT_CART)
  }
  const handlePayment = async () => {
    if (!paymentMethod) {
      message.error("Please select a payment method.");
      return;
    }
    form
      .validateFields()
      .then(async () => {
        setLoading(true);
        try {
          for (const element of carts) {
            await updateStatusCart("completed", element._id, element.cart_no);
          }
          await new Promise((resolve) => setTimeout(resolve, 2000));
          setLoading(false);
          message.success("Payment successful!");
          navigate(paths.STUDENT_PURCHASE)
        } catch (error) {
          setLoading(false);
          message.error("Payment failed. Please try again later.");
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  if (loading) {
    return (
      <p>Loading ...</p>
    );
  }

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.detailsContainer}>
        <h1 className={`${styles.title} font-playfair`}>Checkout</h1>
        <div className={styles.paymentDetails}>
          <div className={styles.paymentDetailsContent}>
            <ToastContainer />
            <h2 className={`${styles.sectionTitle}`}>
              <strong>Billing Details</strong>
            </h2>
            <div className={styles.description}>
              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <p className={styles.detailLabel}>
                    <strong>Student Name:</strong>
                  </p>
                  <p className={styles.detailValue}>{user && user.name}</p>
                </div>
                <div className={styles.detailItem}>
                  <p className={styles.detailLabel}>
                    <strong>Email:</strong>
                  </p>
                  <p className={styles.detailValue}>{user && user.email}</p>
                </div>
                {
                  // payment && 
                  (
                    <>
                      <div className={styles.detailItem}>
                        <p className={styles.detailLabel}>
                          <strong>Date:</strong>
                        </p>
                        <p className={styles.detailValue}>
                          22/07/2024
                          {/* { format(new Date(payment.createdDate), "dd/MM/yyyy")} */}
                        </p>
                      </div>
                      <div className={styles.detailItem}>
                        <p className={styles.detailLabel}>
                          <strong>Total Price:</strong>
                        </p>
                        <p className={styles.detailValue}>{totalPrice.toLocaleString("vi-VN",{style:"currency",currency:"VND"})}</p>
                      </div>
                    </>

                  )}
              </div>
            </div>
            <div >
              {
                carts.length > 0 ?
                  (
                    <Row className='border p-5 mt-10' gutter={10}>
                      <Col className='font-bold text-center' span={6}>Course</Col>
                      <Col span={6}></Col>
                      <Col className='font-bold' span={6}>Discount</Col>
                      <Col className='font-bold' span={6}>
                        <p>Total</p>
                      </Col>
                    </Row>
                  )
                  : (
                    <>
                      <div className={styles.empty_cart_container}>
                        <img width={200} height={200} alt='empty-cart-display' src='https://s.udemycdn.com/browse_components/flyout/empty-shopping-cart-v2-2x.jpg' />
                        <p className='text-lg mb-4'>You must check in at least 1 course in the cart before click on checkout</p>
                        <Link to={paths.HOME}>
                          <CustomButton handleClick={handlePayment} title='Keep Shopping' containerStyles='bg-purple-500' />
                        </Link>
                      </div>
                    </>
                  )
              }
              {
                carts.map((cart) => {
                  return (
                    <div style={{ minWidth: "768px" }}>
                      <Row className='border my-5' gutter={10}>
                        <Col span={6}>
                          <img src={"data:image/png;base64,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"} />
                        </Col>
                        <Col className='' span={6}>
                          <Tag className='mt-8 text-center' color={getColorCart(cart.status)}>
                            {cart.status === "waiting_paid" ? "waiting paid" : cart.status}</Tag>
                          <p className='mt-2 font-bold '>{cart.course_name}</p>
                          <p className='mt-2'><span className='font-bold'>Cart no:</span>{cart.cart_no}</p>

                        </Col>
                        <Col span={6}>
                          <p className='pt-12'>{cart.price.toLocaleString("vi-VN",{style:"currency",currency:"VND"})}</p>
                          <p>Discount: {cart.discount}%</p>
                        </Col>

                        <Col span={6}>
                          <Row>
                            <Col span={12}>
                              <p className='pt-12'>Total:</p>
                              <p >{cart.price_paid.toLocaleString("vi-VN",{style:"currency",currency:"VND"})}</p>
                            </Col>
                          </Row>
                        </Col>
                      </Row>

                    </div>
                  )
                })
              }

            </div>
            {carts.length > 0 &&
              <div className={styles.paymentMethod}>
                <h2 className={styles.sectionTitle}>
                  <strong>Payment Method</strong>
                </h2>
                <Radio.Group
                  options={paymentMethods}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  value={paymentMethod}
                  className={styles.radioGroup}
                />
                {paymentMethod && (
                  <Form
                    form={form}
                    layout="vertical"
                    className={styles.paymentForm}
                  >
                    {paymentMethod === "credit_card" && (
                      <>
                        <Form.Item
                          name="cardNumber"
                          label="Card Number"
                          rules={[
                            {
                              required: true,
                              message: "Please input your card number!",
                            },
                          ]}
                        >
                          <Input placeholder="1234 5678 9012 3456" />
                        </Form.Item>
                        <Form.Item
                          name="cardExpiry"
                          label="Expiry Date"
                          rules={[
                            {
                              required: true,
                              message: "Please input your card expiry date!",
                            },
                          ]}
                        >
                          <Input placeholder="MM/YY" />
                        </Form.Item>
                        <Form.Item
                          name="cardCVC"
                          label="CVC"
                          rules={[
                            {
                              required: true,
                              message: "Please input your card CVC!",
                            },
                          ]}
                        >
                          <Input placeholder="123" />
                        </Form.Item>
                      </>
                    )}
                    {paymentMethod === "paypal" && (
                      <Form.Item
                        name="paypalEmail"
                        label="PayPal Email"
                        rules={[
                          {
                            required: true,
                            message: "Please input your PayPal email!",
                          },
                        ]}
                      >
                        <Input placeholder="example@paypal.com" />
                      </Form.Item>
                    )}
                    {paymentMethod === "bank_transfer" && (
                      <>
                        <Form.Item
                          name="bankName"
                          label="Bank Name"
                          rules={[
                            {
                              required: true,
                              message: "Please input your bank name!",
                            },
                          ]}
                        >
                          <Input placeholder="Bank Name" />
                        </Form.Item>
                        <Form.Item
                          name="accountNumber"
                          label="Account Number"
                          rules={[
                            {
                              required: true,
                              message: "Please input your account number!",
                            },
                          ]}
                        >
                          <Input placeholder="1234567890" />
                        </Form.Item>
                        <Form.Item
                          name="routingNumber"
                          label="Routing Number"
                          rules={[
                            {
                              required: true,
                              message: "Please input your routing number!",
                            },
                          ]}
                        >
                          <Input placeholder="123456789" />
                        </Form.Item>
                      </>
                    )}
                  </Form>
                )}
              </div>
            }
            {/* {course && (
              <div>
                <h2 className={styles.sectionTitle}>
                  <strong>Order Details</strong>
                </h2>
                <div className={styles.courseDetails}>
                  <div className={styles.courseImage}>
                    <img src={courseImage} />
                  </div>
                  <div className={styles.description}>
                    <p>
                      <strong>Course Name:</strong>
                    </p>
                    <p>
                      <strong>Description:</strong>
                    </p>
                    <p>
                      <strong>Price:</strong> 0
                    </p>
                  </div>
                </div>
              </div>
            )} */}
          </div>
        </div>
      </div>
      <div className={styles.summary}>
        {
          carts.length > 0 &&
          <div onClick={handleCancelPayment} className="float-right mt-10 mr-10 text-purple-500 cursor-pointer">
            Cancel
          </div>
        }
        <h2 className={styles.summaryTitle}>
          <strong>Summary</strong>
        </h2>
        <div className={styles.summaryDescription}>
          <p>
            <strong>Original Price:</strong> {totalCost.toLocaleString("vi-VN",{style:"currency",currency:"VND"})}
          </p>
          <p>
            <strong>Discount:</strong> 0
          </p>
          <hr style={{ width: "250px" }} />
          <p>
            <strong>Total:</strong> {totalPrice.toLocaleString("vi-VN",{style:"currency",currency:"VND"})}
          </p>
        </div>
        <div className={styles.confirm}>
          <p className={styles.terms}>
            By completing your purchase you agree to these{" "}
            <span
              className="text-blue-600 underline"
              style={{ cursor: "pointer" }}
              onClick={() =>
                window.open("/terms", "_blank", "noopener,noreferrer")
              }
            >
              Terms of Service
            </span>
            .
          </p>

          <div >
            {carts.length > 0 ?
              (
                <>
                  <div className="mt-10">
                    <CustomButton handleClick={handlePayment} title='Complete Checkout' containerStyles='bg-purple-500' />
                  </div>
                </>
              ) :
              (
                <>
                </>
              )}
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default Checkout;

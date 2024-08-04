import React, { useState, useEffect } from "react";
import { Radio, Input, Form, Row, Col, message } from "antd";
import { ToastContainer } from "react-toastify";

import { paths } from "../../consts";
import styles from "./checkout.module.css";
import { Cart } from "../../models";
import { getCarts, getUserFromLocalStorage, updateStatusCart } from '../../services';
import { useNavigate } from "react-router-dom";
import { User } from "../../models/User";
import { Link } from "react-router-dom";
import CustomButton from "../../components/CustomButton";
import LoadingComponent from "../../components/loading";
import { formatCurrency } from "../../utils";
const Checkout: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [form] = Form.useForm();
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
    loadUserFromLocalStorage();
  }, []);

  const getCart = async () => {
    setLoading(true)
    const res = await getCarts("waiting_paid");
    if (res) {
      let total = 0;
      let totalCost = 0;
      setCarts(res);
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

  const userInfo = getUserFromLocalStorage();
  const userRole = userInfo?.role;

  const handleCancelPayment = async () => {
    for (const element of carts) {
      await updateStatusCart("cancel", element._id, element.cart_no);
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
          if(userRole === "student"){
            navigate(paths.STUDENT_PURCHASE)
          }else{
            navigate("/instructor/purchase")
          }
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
    return (<>
      <LoadingComponent />
    </>)
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
                        <p className={styles.detailValue}>{formatCurrency(totalPrice)}</p>
                      </div>
                    </>

                  )}
              </div>
            </div>
            <div >
              {
                carts.length > 0 ?
                  (
                    // <Row className='border p-5 mt-10' gutter={10}>
                    //   <Col className='font-bold text-center' span={6}>Course</Col>
                    //   <Col span={6}></Col>
                    //   <Col className='font-bold' span={6}>Discount</Col>
                    //   <Col className='font-bold' span={6}>
                    //     <p>Total</p>
                    //   </Col>
                    // </Row>
                    <></>
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
                          <img src={cart.course_image} />
                        </Col>
                        <Col className='' span={6}>
                          <p className='mt-5 font-bold '>{cart.course_name}</p>
                          <p className='mt-2'><span className='font-bold'>Cart no:</span>{cart.cart_no}</p>

                        </Col>
                        <Col span={6}>
                          <p className='pt-12'>{formatCurrency(cart.price)}</p>
                          <p>Discount: {cart.discount}%</p>
                        </Col>

                        <Col span={6}>
                          <Row>
                            <Col span={12}>
                              <p className='pt-12'>Total:</p>
                              <p >{formatCurrency(cart.price_paid)}</p>
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
            <strong>Original Price:</strong> {formatCurrency(totalCost)}
          </p>
          <p>
            <strong>Discount:</strong> 0
          </p>
          <hr style={{ width: "250px" }} />
          <p>
            <strong>Total:</strong> {formatCurrency(totalPrice)}
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

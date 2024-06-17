import React, { useState, useEffect } from "react";
import { Button, Spin, message, Radio, Input, Form } from "antd";
import { API_PAYMENT_URL, API_COURSES_URL } from "../../consts";
import styles from "./checkout.module.css";

const Checkout: React.FC = () => {
  const [payment, setPayment] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [form] = Form.useForm();
  const [course, setCourse] = useState<any>(null);
  const [courseImage, setCourseImage] = useState<string>("");
  const [user, setUser] = useState<any>({});

  const paymentMethods = [
    { label: "Credit Card", value: "credit_card" },
    { label: "PayPal", value: "paypal" },
    { label: "Bank Transfer", value: "bank_transfer" },
  ];

  useEffect(() => {
    fetchPaymentDetails();
    fetchCourseDetails();
    loadUserFromLocalStorage();
  }, []);

  const fetchPaymentDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_PAYMENT_URL);
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          const paymentData = data[0];
          const createdDateUTC = new Date(
            paymentData.createdDate
          ).toUTCString();
          paymentData.createdDate = createdDateUTC;
          setPayment(paymentData);
        } else {
          message.error("No payment found.");
        }
      } else {
        message.error("Failed to fetch payment details.");
      }
    } catch (error) {
      console.error("Error fetching payment details:", error);
      message.error("Error fetching payment details.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCourseDetails = async () => {
    try {
      const response = await fetch(API_COURSES_URL);
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          const firstCourse = data[0];
          setCourse(firstCourse);
          setCourseImage(firstCourse.courseImgUrl);
        } else {
          message.error("No course found.");
        }
      } else {
        message.error("Failed to fetch course details.");
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
      message.error("Error fetching course details.");
    }
  };

  const loadUserFromLocalStorage = () => {
    const userString = localStorage.getItem("user");
    if (userString) {
      setUser(JSON.parse(userString));
    }
  };

  const handlePayment = async () => {
    if (!paymentMethod) {
      message.error("Please select a payment method.");
      return;
    }
    form
      .validateFields()
      .then(async (values) => {
        setLoading(true);
        try {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          setLoading(false);
          message.success("Payment successful!");
        } catch (error) {
          console.error("Payment failed:", error);
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
      <div className={styles.loadingContainer}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.detailsContainer}>
        <h1 className={`${styles.title} font-playfair`}>Checkout</h1>
        <div className={styles.paymentDetails}>
          <div className={styles.paymentDetailsContent}>
            <h2 className={`${styles.sectionTitle}`}>
              <strong>Billing Details</strong>
            </h2>
            <div className={styles.description}>
              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <p className={styles.detailLabel}>
                    <strong>Student Name:</strong>
                  </p>
                  <p className={styles.detailValue}>{user && user.fullName}</p>
                </div>
                <div className={styles.detailItem}>
                  <p className={styles.detailLabel}>
                    <strong>Email:</strong>
                  </p>
                  <p className={styles.detailValue}>{user && user.email}</p>
                </div>
                {payment && (
                  <>
                    <div className={styles.detailItem}>
                      <p className={styles.detailLabel}>
                        <strong>Date:</strong>
                      </p>
                      <p className={styles.detailValue}>
                        {payment.createdDate}
                      </p>
                    </div>
                    <div className={styles.detailItem}>
                      <p className={styles.detailLabel}>
                        <strong>Total Price:</strong>
                      </p>
                      <p className={styles.detailValue}>0</p>
                    </div>
                  </>
                )}
              </div>
            </div>
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
            {course && (
              <div>
                <h2 className={styles.sectionTitle}>
                  <strong>Order Details</strong>
                </h2>
                <div className={styles.courseDetails}>
                  <div className={styles.courseImage}>
                    <img src={courseImage} alt={course.title} />
                  </div>
                  <div className={styles.description}>
                    <p>
                      <strong>Course Name:</strong> {course.title}
                    </p>
                    <p>
                      <strong>Description:</strong> {course.description}
                    </p>
                    <p>
                      <strong>Price:</strong> 0
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.summary}>
        <h2 className={styles.summaryTitle}>
          <strong>Summary</strong>
        </h2>
        <div className={styles.summaryDescription}>
          <p>
            <strong>Original Price:</strong> 0
          </p>
          <p>
            <strong>Discount:</strong> 0
          </p>
          <hr style={{ width: "250px" }} />
          <p>
            <strong>Total:</strong> 0
          </p>
        </div>
        <div className={styles.confirm}>
          <p className={styles.terms}>
            By completing your purchase you agree to these{" "}
            <div
              className="text-blue-600 underline"
              style={{ cursor: "pointer" }}
              onClick={() =>
                window.open("/terms", "_blank", "noopener,noreferrer")
              }
            >
              Terms of Service
            </div>
            .
          </p>
          <Button
            type="primary"
            className={styles.payButton}
            onClick={handlePayment}
            loading={loading}
            disabled={loading}
          >
            {loading ? "Processing..." : "Complete Checkout"}
          </Button>
        </div>{" "}
      </div>
    </div>
  );
};

export default Checkout;

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './paymentHistory.module.css';
import PaymentCourses from './courses';
import PaymentSubscriptions from './Subscriptions';
import PaymentRefunds from './refunds';
import { Payment } from '../../../models';
import { Space, Table, Tag } from 'antd';

const columns = [
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Created Date',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'completed' ? 'green' : 'volcano'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Enrollment ID',
      dataIndex: 'enrollmentId',
      key: 'enrollmentId',
    }
  ];

const PaymentHistory = () => {
    const [selectComponent, setSelectComponent] = useState("default");
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await fetch('https://665fbf245425580055b0b23d.mockapi.io/payments'); // Thay thế URL bằng API của bạn
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPayments(data);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("An unknown error occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);

    const renderComponent = () => {
        switch (selectComponent) {
            case "refunds":
                return <PaymentRefunds />
            case "subscriptions":
                return <PaymentSubscriptions />
            default:
                return <PaymentCourses />
        }
    }

    if (loading) {
        return <p className={styles.loading}>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="container mx-auto mt-10">
            <h1>Payment History</h1>
            <div className={styles.paymentBar}>
                <div>
                    <button onClick={() => setSelectComponent("courses")}>
                        Courses
                    </button>
                </div>
                <div>
                    <button onClick={() => setSelectComponent("subscriptions")}>
                        Subscriptions
                    </button>
                </div>
                <div>
                    <button onClick={() => setSelectComponent("refunds")}>
                        Refunds
                    </button>
                </div>
            </div>
            {renderComponent()}
            <Table columns={columns} dataSource={payments} rowKey="paymentId" />
           
        </div>
    );
};

export default PaymentHistory;

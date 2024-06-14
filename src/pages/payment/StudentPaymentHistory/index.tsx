import { useEffect, useState } from 'react';
import styles from '../paymentHistory.module.css';
import PaymentCourses from '../courses';
import PaymentSubscriptions from '../Subscriptions';
import PaymentRefunds from '../refunds';
import { Payment } from '../../../models';
import { Table, Tabs, TabsProps, Tag } from 'antd';

const columns = [
    {
        title: 'No',
        dataIndex: 'paymentId',
        key: 'paymentId',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
    },
    {
        title: 'Created Date',
        dataIndex: 'createdDate',
        key: 'createdDate',
        render: (date: string) => new Date(date).toLocaleDateString(),
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
        render: (status: string) => (
            <Tag color={status === 'completed' ? 'green' : 'volcano'}>
                {status.toUpperCase()}
            </Tag>
        ),
    },
    {
        title: 'Enrollment ID',
        dataIndex: 'enrollmentId',
        key: 'enrollmentId',
    }
];

const StudentPaymentHistory: React.FC = () => {
    const [selectComponent, setSelectComponent] = useState("courses");
    const [payment, setPayments] = useState<Payment | null >(null); // Sử dụng `Payment | null` thay vì `Payment[]`
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPayments = async () => {
            const userData = localStorage.getItem('user');
            if (!userData) {
                setError("User data not found in local storage");
                setLoading(false);
                return;
            }
    
            const user = JSON.parse(userData);
            const userId = user?.userId;
            if (!userId) {
                setError("User ID not found in user data");
                setLoading(false);
                return;
            }
    
            try {
                const response = await fetch(`https://665fbf245425580055b0b23d.mockapi.io/payments`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                
                // Lọc danh sách thanh toán chỉ lấy những thanh toán có userId tương ứng
                const filteredPayments = data.filter((payment: Payment) => payment.userId === userId);
                
                setPayments(filteredPayments);
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
                return <PaymentRefunds />;
            case "subscriptions":
                return <PaymentSubscriptions />;
            default:
                return <PaymentCourses />;
        }
    };

    if (loading) {
        return <p className={styles.loading}>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const onChange = (key: string) => {
        setSelectComponent(key);
    };

    const items: TabsProps['items'] = [
        {
            key: 'courses',
            label: 'Courses'
        },
        {
            key: 'subscriptions',
            label: 'Subscriptions',
        },
        {
            key: 'refunds',
            label: 'Refunds',
        },
    ];

    return (
        <div className="container mx-auto mt-10">
            <h1>Payment History</h1>
            <Tabs defaultActiveKey="courses" onChange={onChange}>
                {items.map(item => (
                    <Tabs.TabPane key={item.key} tab={item.label} />
                ))}
            </Tabs>
            <Table columns={columns} dataSource={payment} rowKey="paymentId" /> {/* Sử dụng `payment ? [payment] : []` để đảm bảo chỉ có một đối tượng trong dataSource */}
            {renderComponent()}
        </div>
    );
};

export default StudentPaymentHistory;

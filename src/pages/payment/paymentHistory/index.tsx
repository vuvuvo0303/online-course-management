import { useEffect, useState } from 'react';
import styles from '../paymentHistory.module.css';
import PaymentCourses from '../courses';
import PaymentSubscriptions from '../Subscriptions';
import PaymentRefunds from '../refunds';
import { Payment } from '../../../models';
import { Table, Tabs, TabsProps, Tag } from 'antd';

const columns = [
    {
        title: 'User ID',
        dataIndex: 'userId',
        key: 'userId',
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

const PaymentHistory: React.FC = () => {
    const [selectComponent, setSelectComponent] = useState("default");
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await fetch('https://665fbf245425580055b0b23d.mockapi.io/payments');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPayments(data);
                console.log("check setPayments(data): ", setPayments(data))
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
    

const onChange = (key: string) => {
    setSelectComponent(key)
}
const items: TabsProps['items'] = [
    {
        key: 'courses',
        label: 'Tab 1'       
    },
    {
        key: 'subscriptions',
        label: 'Tab 2',
    },
    {
        key: 'refunds',
        label: 'Tab 3',
    },
];
return (
    <div className="container mx-auto mt-10">
        <h1>Payment History</h1>
        <Tabs defaultActiveKey="courses" items={items} onChange={onChange} />
    
        <Table columns={columns} dataSource={payments} rowKey="paymentId" />
        {renderComponent()}
    </div>
);
};

export default PaymentHistory;

import { Button, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { Payment } from "../../../../models";
import axios from "axios";
import { User } from "../../../../models/User";

const ManagePaymentRefund = () => {
    const userString = localStorage.getItem("user");
    const user: User = userString ? JSON.parse(userString) : null;
    const role = user?.role;

    const handleSetStatusRefund = async (paymentId: string) => {
        const findCourse = payments.find(payment => payment.paymentId === paymentId);
        if (findCourse) {
            findCourse.status = "REFUND";
            try {
                const res = await axios.put(`https://665fbf245425580055b0b23d.mockapi.io/payments/${findCourse.paymentId}`, findCourse);
                console.log("check res: ", res)
                setPayments([...payments]); // Force re-render
            } catch (error) {
                console.log("Error: ", error);
                setError("An error occurred while processing the refund.");
            }
        }
    };

    const renderRequest = (paymentId: string, record: Payment) => {
        if (role === "instructor") {
            if (record.status === "WAITING FOR REFUND") {
                return (
                    <div>
                        <Button onClick={() => handleSetStatusRefund(paymentId)} type="primary">Accept Request</Button>
                    </div>
                );
            } else {
                return (
                    <div>
                        <Tag color="orange">REFUND COMPLETED</Tag>
                    </div>
                );
            }
        } else {
            if (record.status === "WAITING FOR REFUND") {
                return (
                    <div>
                        <Tag color="orange">INSTRUCTOR IS PROCESSING</Tag>
                    </div>
                );
            } else {
                return (
                    <div>
                        <Tag color="orange">REFUND COMPLETED</Tag>
                    </div>
                );
            }
        }
    };

    const columns = [
        {
            title: 'User ID',
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: 'Course ID',
            dataIndex: 'courseId',
            key: 'courseId',
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
            title: 'Enrollment ID',
            dataIndex: 'enrollmentId',
            key: 'enrollmentId',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Tag color={
                    status === 'WAITING FOR REFUND' ? 'orange' :
                        status === 'REFUND' ? 'blue' :
                            'default' // Default color for unmatched statuses
                }>
                    {status.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Request',
            dataIndex: 'paymentId',
            key: 'paymentId',
            render: renderRequest,
        }
    ];

    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [userId, setUserId] = useState<string>('');

    useEffect(() => {
        const userString = localStorage.getItem("user");
        const user: User = userString ? JSON.parse(userString) : null;
        setUserId(user?.userId);
        console.log("check userId: ", userId);

    }, []);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get<Payment[]>('https://665fbf245425580055b0b23d.mockapi.io/payments');
                if (response) {
                    setPayments(response.data.filter(payment => payment.userId ===  userId && (payment.status === "REFUND" || payment.status === "WAITING FOR REFUND")));
                }
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
    }, [userId]);

    if (loading) {
        return <p className="loading">Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <Table columns={columns} dataSource={payments} rowKey="paymentId" />
        </div>
    );
};

export default ManagePaymentRefund;

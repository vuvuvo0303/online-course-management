import { Button, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { Payment } from "../../../../models";
import axios from "axios";
import { User } from "../../../../models/User";

const ManagePaymentRefund = () => {
    const userString = localStorage.getItem("user");
    const user: User = userString ? JSON.parse(userString) : null;
    const role = user?.role;
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
            title: 'Request',
            dataIndex: 'courseId',
            key: 'courseId',
            render: (courseId: string, record: Payment) => (
                role === "Instructor" ?
                    record.status === "PENDING REFUND" ?
                        (<div>
                            <Button onClick={() => handleSetStatusRefund(courseId)} type="primary">Accept Request</Button>
                        </div>)
                        : (
                            <div><Tag color="orange">REFUND COMPLETED</Tag></div>

                        )
                        : record.status === "PENDING REFUND" ?
                        (
                            <div><Tag color="orange">INSTRUCTOR IS PROCESSING</Tag></div>

                        ) :
                        <div><Tag color="orange">REFUND COMPLETED</Tag></div>

            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Tag color={
                    status === 'PENDING REFUND' ? 'orange' :
                        status === 'REFUND' ? 'blue' :
                            'default' // Màu mặc định khi không trùng khớp
                }>
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

    const handleSetStatusRefund = async (courseId: string) => {
        const findCourse = payments.find(payment => payment.courseId === courseId);
        if (findCourse) {
            findCourse.status = "REFUND";
            try {
                await axios.put(`https://665fbf245425580055b0b23d.mockapi.io/payments/${findCourse.paymentId}`, findCourse);
                setPayments([...payments]); // Force re-render
            } catch (error) {
                console.log("Error: ", error);
                setError("An error occurred while processing the refund.");
            }
        }
    };

    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get<Payment[]>('https://665fbf245425580055b0b23d.mockapi.io/payments');
                if (response) {
                    setPayments(response.data.filter(payment => payment.status === "REFUND" || payment.status === "PENDING REFUND"));
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
    }, []);


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
    )
}

export default ManagePaymentRefund;
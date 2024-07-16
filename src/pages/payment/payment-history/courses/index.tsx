import { Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { Payment } from "../../../../models";
import { User } from "../../../../models/User";
import axios from "axios";

const ManagePaymentCourse = () => {
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
                <Tag color={
                    status === 'COMPLETED' ? 'green' :
                        status === 'REJECTED' ? 'red' :
                            status === 'PENDING' ? 'gold' :
                                status === "WAITING FOR REFUND"
                                    ? "orange" :
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

    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [userId, setUserId] = useState<string>('');

    useEffect(() => {
        const userString = localStorage.getItem("user");
        const user: User = userString ? JSON.parse(userString) : null;
        setUserId(user?._id);
        console.log("check userId: ", userId);

    }, []);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get<Payment[]>('https://665fbf245425580055b0b23d.mockapi.io/payments');
                if (response) {
                    setPayments(response.data.filter(payment => payment.userId === userId));
                    console.log("check p: ", response)
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
        return <p className="loading text-center">Loading...</p>;
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
export default ManagePaymentCourse;
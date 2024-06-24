import { Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { Payment } from "../../../../models";
import axios from "axios";

const ManagePaymentRefund = ()=>{
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

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get<Payment[]>('https://665fbf245425580055b0b23d.mockapi.io/payments');
                if (response) {
                    setPayments(response.data.filter(payment =>payment.status === "REFUND"));
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

    return(
        <div>
             <Table columns={columns} dataSource={payments} rowKey="paymentId" />
        </div>
    )
}

export default ManagePaymentRefund;
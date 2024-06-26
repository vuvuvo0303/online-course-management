
import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Tag } from "antd";
import { Payment } from "../../../../models";

const PaymentRefunds = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);



  const columns = [
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag
          color={
            status === "WAITING FOR REFUND"
              ? "orange"
              : status === "REFUND"
                ? "blue"
                : "default"
          }
        >
          {status ? status.toUpperCase() : "UNKNOWN"}
        </Tag>
      ),
    },
    {
      title: "Enrollment ID",
      dataIndex: "enrollmentId",
      key: "enrollmentId",
    },
  ];
  useEffect(() => {
    const fetchPayments = async () => {
      const userData = localStorage.getItem("user");
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
        const res = await axios.get<Payment[]>(`https://665fbf245425580055b0b23d.mockapi.io/payments`);
        if (res) {
          setPayments(res.data.filter(payment => payment.userId === userId && (payment.status === "REFUND" || payment.status === "WAITING FOR REFUND")));
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
    <div className="container mx-auto mt-10">


      <Table columns={columns} dataSource={payments || []} rowKey="paymentId" />
    </div>
  );
}

export default PaymentRefunds;
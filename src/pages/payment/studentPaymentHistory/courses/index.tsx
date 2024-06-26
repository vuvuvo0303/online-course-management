

import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Table, Tag } from "antd";
import { Payment } from "../../../../models";
const PaymentCourses: React.FC = () => {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState<string>('');
    const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  
    const showModal = (courseId: string) => {
      setModalText("Do you want to request a refund for this course?");
      setSelectedCourseId(courseId);
      setOpen(true);
    };
  
    const handleCancel = () => {
      console.log('Clicked cancel button');
      setOpen(false);
    };
  
    const handleOk = async () => {
      if (selectedCourseId) {
        setModalText('Refunding...');
        setConfirmLoading(true);
        await handleSetStatusPendingRefund(selectedCourseId);
        setConfirmLoading(false);
        setOpen(false);
      }
    };
    
    const handleSetStatusPendingRefund = async (courseId: string) => {
      const findCourse = payments.find(payment => payment.courseId === courseId);
      if (findCourse) {
        findCourse.status = "WAITING FOR REFUND";
        try {
          await axios.put(`https://665fbf245425580055b0b23d.mockapi.io/payments/${findCourse.paymentId}`, findCourse);
          setPayments([...payments]); // Force re-render
        } catch (error) {
          console.log("Error: ", error);
          setError("An error occurred while processing the refund.");
        }
      }
    };

   
  
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
        title: "Course Price",
        dataIndex: "coursePrice",
        key: "coursePrice",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status: string) => (
          <Tag
            color={
              status === "COMPLETED"
                ? "green"
                : status === "REJECTED"
                  ? "red"
                  : status === "PENDING"
                    ? "gold"
                    : status === "WAITING FOR REFUND"
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
      {
        title: "Action",
        key: "action",
        render: (record: Payment) => (
          <>
            {
              record.status === "COMPLETED" ?
                <Button type="primary" onClick={() => showModal(record.courseId)}>
                  Refund Course
                </Button>
                : null
            }
          </>
        ),
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
            setPayments(res.data.filter(payment => payment.userId === userId && payment.status !== "REFUND"));
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
        
        <Modal
          title="Refund Course"
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <p>{modalText}</p>
        </Modal>
      </div>
    );
  
}

export default PaymentCourses;
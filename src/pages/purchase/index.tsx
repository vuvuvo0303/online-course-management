import { Purchase } from "../../models";
import { useEffect, useState } from "react";
import { getItemsByStudent } from "../../services";
import LoadingComponent from "../../components/loading";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Table, TableProps } from "antd";

const StudenManagePurchase = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const getPurchasesByStudent = async () => {
    const response = await getItemsByStudent("", "", "", "", 1, 100);
    setPurchases(response);
    setLoading(false);
  };

  useEffect(() => {
    getPurchasesByStudent();
  }, []);

  if (loading) {
    return (<>
      <LoadingComponent />
    </>)
  }

  const columns: TableProps<Purchase>["columns"] = [
    {
      title: "Purchase No",
      dataIndex: "purchase_no",
      key: "purchase_no",
      width: "20%",
    },
    {
      title: "Course Name",
      dataIndex: "course_name",
      key: "course_name",
    },
    {
      title: "Instructor Name",
      dataIndex: "instructor_name",
      key: "instructor_name",
      width: "18%",
      render: (instructor_name: string, record: Purchase) => (
        <div onClick={() => navigateToUser(record.instructor_id)} className="text-blue-500 cursor-pointer">
          {instructor_name}
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",

      render: (price: number) => <>{price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</>,
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (discount: number) => `${discount}%`,
    },
    {
      title: "Price paid",
      dataIndex: "price_paid",
      key: 'price_paid',
            render:(price_paid:number)=> <>{price_paid.toLocaleString("vi-VN",{style:"currency",currency:"VND"})}</>
    },
    {
      title: "Created Date",
      dataIndex: "created_at",
      key: "created_at",
      width: "10%",
      render: (created_at: string) => format(new Date(created_at), "dd/MM/yyyy"),
    },
  ];

  const navigateToUser = (instructor_id: string) => {
    navigate(`/user/${instructor_id}`);
  };

  return (
    <div className="container mx-auto px-10">
      <h1 className="text-center my-10">Manage Purchased</h1>
      <Table rowKey={(record: Purchase) => record._id} dataSource={purchases} columns={columns} />
    </div>
  );
};

export default StudenManagePurchase;

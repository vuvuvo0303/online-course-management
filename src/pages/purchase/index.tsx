import { Purchase } from "../../models";
import { useEffect, useState } from "react";
import { getItemsByStudent, getUserFromLocalStorage } from "../../services";
import LoadingComponent from "../../components/loading";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Pagination, Table, TablePaginationConfig, TableProps } from "antd";
import { formatCurrency } from "../../utils";
import { PaginationProps } from "antd/lib";

const StudentManagePurchase = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const getPurchasesByStudent = async () => {
    const response = await getItemsByStudent("", "", "", "", 1, 10);
    setPurchases(response.data.pageData);
    setPagination({
      ...pagination,
      total: response.data.pageInfo.totalItems,
      current: response.data.pageInfo.pageNum,
      pageSize: response.data.pageInfo.pageSize,
    });
    setLoading(false);
  };

  useEffect(() => {
    getPurchasesByStudent();
  }, [pagination.pageSize, pagination.current]);

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

      render: (price: number) => <>{formatCurrency(price)}</>,
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
      render: (price_paid: number) => <>{formatCurrency(price_paid)}</>
    },
    {
      title: "Created Date",
      dataIndex: "created_at",
      key: "created_at",
      width: "10%",
      render: (created_at: string) => format(new Date(created_at), "dd/MM/yyyy"),
    },
  ];

  const user = getUserFromLocalStorage();
  const userRole = user.role;
  const navigateToUser = (instructor_id: string) => {
   if(userRole === "instructor"){
    navigate(`/instructor/user/${instructor_id}`);
   }else{
    navigate(`/user/${instructor_id}`);
   }
  };
  const handleTableChange = (pagination: PaginationProps) => {
    const newPagination: { current: number; pageSize: number; total: number } = {
      current: pagination.current ?? 1,
      pageSize: pagination.pageSize ?? 10,
      total: pagination.total ?? 0,
    };

    setPagination(newPagination);
  };

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPagination({ ...pagination, current: page, pageSize });
  };
  return (
    <div className="container mx-auto px-10">
      <h1 className="text-center my-10">Manage Purchased</h1>
      <Table rowKey={(record: Purchase) => record._id} dataSource={purchases} columns={columns} pagination={false} onChange={handleTableChange} />
      <div className="flex justify-end py-8">
        <Pagination
          total={pagination.total}
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
          current={pagination.current}
          pageSize={pagination.pageSize}
          onChange={handlePaginationChange}
          showSizeChanger
        />
      </div>
    </div>
  );
};

export default StudentManagePurchase;

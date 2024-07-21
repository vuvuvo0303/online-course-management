import { Avatar, Breadcrumb, Table, TableProps, Tag } from "antd";
import { API_GET_ITEMS_BY_ADMIN } from "../../../consts/index";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import { HomeOutlined } from "@ant-design/icons";

interface PurchaseData {
  _id: string;
  purchase_no: string;
  status: string;
  price_paid: number;
  price: number;
  discount: number;
  cart_id: string;
  course_id: string;
  student_id: string;
  instructor_id: string;
  created_at: string;
  is_deleted: boolean;
  cart_no: string;
  course_name: string;
  student_name: string;
  instructor_name: string;
}

const ManageAllPurchase = () => {
  const [dataSource, setDataSource] = useState<PurchaseData[]>([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

  const columns: TableProps<PurchaseData>["columns"] = [
    {
      title: "Course Name",
      dataIndex: "course_name",
      key: "course_name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Instructor's Name",
      dataIndex: "instructor_name",
      key: "instructor_name",
    },{
        title: "Student's Name",
        dataIndex: "student_name",
        key: "student__name",
      },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status: string) => (
          <Tag color={
            status === "new" ? "blue" :
            status === "request_paid" ? "orange" :
            status === "completed" ? "green" :
            "default"
          }>
            {status}
          </Tag>
        ),
      },
    {
      title: "Created Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: string) => format(new Date(created_at), "dd/MM/yyyy", { locale: vi }),
      width: "10%",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => {
        return price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
      },
    },
    { title: "Discount", dataIndex: "discount", key: "discount", render: (discount: number) => <>{discount}%</> },
    {
      title: "Price Paid",
      dataIndex: "price_paid",
      key: "price_paid",
      render: (price_Paid: number) => {
        return price_Paid.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
      },
    },
  ];

  const fetchPurchase = useCallback(async () => {
    try {
      const response = await axiosInstance.post(API_GET_ITEMS_BY_ADMIN, {
        searchCondition: {
          purchase_no: "",
          cart_no: "",
          course_id: "",
          status: "",
          is_delete: false,
        },
        pageInfo: {
          pageNum: pagination.current,
          pageSize: pagination.pageSize,
        },
      });

      console.log("API Response:", response.data);

      if (response.data && response.data.pageData) {
        const { pageData, pageInfo } = response.data;
        setDataSource(pageData);
        setPagination({
          current: pageInfo.pageNum,
          pageSize: pageInfo.pageSize,
          total: pageInfo.totalItems,
        });
      } else {
    
    
        setDataSource([]);
      }
    } catch (error) {
      //
     
    }
  }, [pagination.current, pagination.pageSize]);

  useEffect(() => {
    fetchPurchase();
  }, [fetchPurchase]);

  const handleTableChange = (pagination: any) => {
    setPagination({
      current: pagination.current,
      pageSize: pagination.pageSize,
      total: pagination.total,
    });
  };

  return (
    <div>
          <Breadcrumb className="p-3">
        <Breadcrumb.Item>
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>Manage All Purchase</Breadcrumb.Item>
      </Breadcrumb>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
        }}
        onChange={handleTableChange}
        rowKey="_id"
        className="overflow-auto"
      />
    </div>
  );
};

export default ManageAllPurchase;

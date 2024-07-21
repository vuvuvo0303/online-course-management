import {useCallback, useEffect, useState} from "react";
import axiosInstance from "../../../services/axiosInstance.ts";
import {API_GET_PURCHASE_BY_ADMIN, paths} from "../../../consts";
import {Payment} from "../../../models";
import {
    Breadcrumb,
    Table,
    TableColumnsType
} from "antd";
import {format} from "date-fns";
import { HomeOutlined, UserOutlined} from "@ant-design/icons";

const AdminPayment: React.FC = () => {
    const [data, setData] = useState<Payment[]>([]);
    const fetchPayments = useCallback(async () => {
        const response = await axiosInstance.post(API_GET_PURCHASE_BY_ADMIN,
            {
                "searchCondition": {
                    "purchase_no": "",
                    "cart_no": "",
                    "course_id": "",
                    "status": "",
                    "is_delete": false
                },
                "pageInfo": {
                    "pageNum": 1,
                    "pageSize": 10
                }
            })
        setData(response.data.pageData)
    }, [])

    useEffect(() => {
        fetchPayments();
    }, []);

    const columns: TableColumnsType<Payment> = [
        {
            title: "Purchase Name",
            dataIndex: "purchase_no",
            key: "purchase_no",
            width: "20%",
        },
        {
            title: "Course Name",
            dataIndex: "course_name",
            key: "course_name",
            width: "20%",
        },
        {
            title: "Instructor Name",
            dataIndex: "instructor_name",
            key: "instructor_name",
            width: "10%",
        },
        {
            title: "Student Name",
            dataIndex: "student_name",
            key: "student_name",
            width: "10%",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            width: "10%",
        },
        {
            title: "Created Date",
            dataIndex: "created_at",
            key: "created_at",
            width: "10%",
            render: (created_at: Date) => format(new Date(created_at), "dd/MM/yyyy"),
        },
    ]

    return (
        <div>
            <div className="flex justify-between">
                <Breadcrumb
                    className="py-2"
                    items={[
                        {
                            title: <HomeOutlined/>,
                        },
                        {
                            href: paths.ADMIN_HOME,
                            title: (
                                <>
                                    <UserOutlined/>
                                    <span>Admin</span>
                                </>
                            ),
                        },
                        {
                            title: "Manage Payment",
                        },
                    ]}
                />
            </div>
            <Table columns={columns} dataSource={data} rowKey={(record: Payment) => record._id}/>;
        </div>
    )
}

export default AdminPayment
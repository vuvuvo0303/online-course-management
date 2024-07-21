import {Table, TableColumnsType, Tag} from "antd";
import {useCallback, useEffect, useState} from "react";
import { Payment } from "../../../../models";
import axiosInstance from "../../../../services/axiosInstance.ts";
import {API_GET_PURCHASE_BY_STUDENT} from "../../../../consts/index.ts";
import {format} from "date-fns";

const ManagePaymentCourse = () => {
    const columns: TableColumnsType<Payment> = [
        {
            title: 'Purchase No',
            dataIndex: 'purchase_no',
            key: 'purchase_no',
        },
        {
            title: 'Course Name',
            dataIndex: 'course_name',
            key: 'course_name',
        },
        {
            title: 'Instructor Name',
            dataIndex: 'instructor_name',
            key: 'instructor_name',
        },
        {
            title: 'Created Date',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (created_at: Date) => format(new Date(created_at), "dd/MM/yyyy"),
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
    ];

    const [data, setData] = useState<Payment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);


    const fetchPayments = useCallback(async () => {
        const response = await axiosInstance.post(API_GET_PURCHASE_BY_STUDENT,
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


    if (loading) {
        return <p className="loading text-center">Loading...</p>;
    }


    return (
        <div>
            <Table columns={columns} dataSource={data} rowKey={(record:Payment) => record._id} />
        </div>
    )
}
export default ManagePaymentCourse;


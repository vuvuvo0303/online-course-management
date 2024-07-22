import { Purchase } from "../../../models";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getItemsByStudent } from "../../../services";
import { Table, TableProps } from "antd";
import { format } from "date-fns";

const StudentInstructorPurchase = () => {
    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    const getPurchase = async () => {
        const response = await getItemsByStudent("", "", "", "");
        setPurchases(response);
        setLoading(false);
    };

    useEffect(() => {
        getPurchase();
    }, []);

    if (loading) {
        return <p>Loading ...</p>;
    }

    const columns: TableProps<Purchase>["columns"] = [
        {
            title: 'Purchase No',
            dataIndex: 'purchase_no',
            key: 'purchase_no',
            width: '20%',
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
            width: '18%',
            render: (instructor_name: string, record: Purchase) => (
                <div onClick={() => navigateToUser(record.instructor_id)} className="text-blue-500 cursor-pointer">
                    {instructor_name}
                </div>
            ),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Created Date',
            dataIndex: 'created_at',
            key: 'created_at',
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

export default StudentInstructorPurchase;

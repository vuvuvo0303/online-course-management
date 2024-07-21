
import { Purchase } from "../../../models";
import { useEffect, useState } from "react";
import { getItemsByStudent } from "../../../services";
import { Table, Tag } from "antd";
import { getColorPurchase } from "../../../consts";

const StudentInstructorPurchase = () => {
    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const getPurchase = async () => {
        const res = await getItemsByStudent("", "", "", "");
        console.log("res", res);
        setPurchases(res);
        setLoading(false);
    }

    useEffect(() => {
        getPurchase();
    }, [])

    if (loading) {
        return (
            <p>Loading ...</p>
        )
    }
    const columns = [
        {
            title: 'purchase_no',
            dataIndex: 'purchase_no',
            key: 'purchase_no',
        },
        {
            title: 'status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <>
                    <Tag color={getColorPurchase(status)}>
                        {status === "request_payout" ? "request payout" : status}
                    </Tag>
                </>
            )
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Course Name',
            dataIndex: 'course_name',
            key: 'course_name',
        },
        {
            title: 'Student Name',
            dataIndex: 'student_name',
            key: 'student_name',
        },
        {
            title: 'Instructor Name',
            dataIndex: 'instructor_name',
            key: 'instructor_name',
        },
    ];

    return (
        <>
            <div className="container mx-auto">
                <h1 className="text-center my-10">Manage Purchase</h1>
                <Table dataSource={purchases} columns={columns} />
            </div>
        </>
    )

}
export default StudentInstructorPurchase;
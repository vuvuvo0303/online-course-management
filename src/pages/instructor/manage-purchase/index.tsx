import { Purchase } from "../../../models";
import { useEffect, useState } from "react";
import { getItemsByInstructor } from "../../../services";

import { format } from "date-fns";
import { Breadcrumb, Button, Table, TableProps, Tag } from "antd";
import { createPayout } from "../../../services/payout";
import { getColorPurchase } from "../../../consts/index";
import { HomeOutlined } from "@ant-design/icons";

const InstructorManagePurchase = () => {
    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const getPurchasesByInstructor = async () => {
        setLoading(true)
        const response = await getItemsByInstructor("", "", "", "", 1, 100);
        console.log("response: ", response)
        setPurchases(response);
        setLoading(false);
    };

    useEffect(() => {
        getPurchasesByInstructor();
    }, []);

    if (loading) {
        return (
            <>
                <p className="items-center text-center ">Loading ...</p>
            </>
        );
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
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render:(price:number)=> <>{price.toLocaleString("vi-VN",{style:"currency",currency:"VND"})}</>
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            key: 'discount',
            render: (discount: number) => `${discount}%`
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <>
                    <Tag color={getColorPurchase(status)}>
                        {status === "request_paid" ? "request paid" : status}
                    </Tag>
                </>
            )
        },
        {
            title: 'Price paid',
            dataIndex: 'price_paid',
            key: 'price_paid',
            render:(price_paid:number)=> <>{price_paid.toLocaleString("vi-VN",{style:"currency",currency:"VND"})}</>
        },
        {
            title: 'Created Date',
            dataIndex: 'created_at',
            key: 'created_at',
            width: '10%',
            render: (created_at: string) => format(new Date(created_at), "dd/MM/yyyy"),
        },
        {
            title: 'Action',
            render: (record: Purchase) => (
                record.status === "new" &&
                <Button type="primary" onClick={() => handleCreatePayout(record)}>
                    Create Payout
                </Button >

            )
        },
    ];

    const handleCreatePayout = async (record: Purchase) => {
        await createPayout(record.instructor_id, record._id)

        getPurchasesByInstructor();
    }

    return (
        <div className="container mx-auto px-10">
            <Breadcrumb className="p-3">
        <Breadcrumb.Item>
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>Manage All Purchase</Breadcrumb.Item>
      </Breadcrumb>
            <Table rowKey={(record: Purchase) => record._id} dataSource={purchases} columns={columns} />
        </div>
    );
};

export default InstructorManagePurchase;

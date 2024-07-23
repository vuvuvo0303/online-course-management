import { Payout } from "../../../models";
import { useEffect, useState } from "react";
import {  getPayouts } from "../../../services";
import { format } from "date-fns";
import {  Table, TableProps, Tag } from "antd";
import { getColorPurchase } from "../../../consts/index";

const InstructorManagePayout = () => {
    const [payouts, setPayouts] = useState<Payout[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const getPayoutsByInstructor = async () => {
        setLoading(true)
        const response = await getPayouts("", "", "", 1, 100);
        console.log("response: ", response)
        setPayouts(response);
        setLoading(false);
    };

    useEffect(() => {
        getPayoutsByInstructor();
    }, []);

    if (loading) {
        return (
            <>
                <p className="items-center text-center ">Loading ...</p>
            </>
        );
    }

    const columns: TableProps<Payout>["columns"] = [
        {
            title: 'Pay No',
            dataIndex: 'payout_no',
            key: 'payout_no',
            width: '20%',
        },
        // {
        //     title: 'Discount',
        //     dataIndex: 'discount',
        //     key: 'discount',
        //     render: (discount: number) => `${discount}%`
        // },
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
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
            width: '10%',
            render: (created_at: string) => format(new Date(created_at), "dd/MM/yyyy"),
        },
        {
            title: 'Updated At',
            dataIndex: 'updated_at',
            key: 'updated_at',
            width: '10%',
            render: (updated_at: string) => format(new Date(updated_at), "dd/MM/yyyy"),
        },
        // {
        //     title: 'Action',
        //     render: (record: Purchase) => (
        //         record.status === "new" &&
        //         <Button type="primary" onClick={() => handleCreatePayout(record)}>
        //             Create Payout
        //         </Button >

        //     )
        // },
    ];

    return (
        <div className="container mx-auto px-10">
            <h1 className="text-center my-10">Manage Payout</h1>
            <Table rowKey={(record: Payout) => record._id} dataSource={payouts} columns={columns} />
        </div>
    );
};

export default InstructorManagePayout;

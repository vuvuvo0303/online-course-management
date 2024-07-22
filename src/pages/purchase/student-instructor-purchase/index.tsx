import { Purchase } from "../../../models";
import { useEffect, useState } from "react";
import { getItemsByStudent, handleSubscriptionByInstructorOrStudent } from "../../../services";
import { Avatar, Button, message, Modal, Table, TableProps } from "antd";
import { getColorPurchase } from "../../../consts";
import { getInstructoDetailPublic } from "../../../services";
import { Instructor } from "../../../models/User";
import { AntDesignOutlined, YoutubeOutlined } from "@ant-design/icons";
import { format } from "date-fns";

const StudentInstructorPurchase = () => {
    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [instructor, setInstructor] = useState<Instructor>();
    // modal antd
    const [open, setOpen] = useState(false);
    // const [confirmLoading, setConfirmLoading] = useState(false);

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

    const columns: TableProps<Purchase>["columns"] = [
        {
            title: 'Purchase No',
            dataIndex: 'purchase_no',
            key: 'purchase_no',
            width: '20%'
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
                <div onClick={() => showModal(record.instructor_id)} className="text-blue-500 cursor-pointer">
                    {instructor_name}
                </div>
            )
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

    const showModal = async (instructor_id: string) => {
        const getInfomationInstructor = await getInstructoDetailPublic(instructor_id);
        setInstructor(getInfomationInstructor);
        setOpen(true);
    };

    // const handleOk = () => {
    //     setConfirmLoading(true);
    //     setTimeout(() => {
    //         setOpen(false);
    //         setConfirmLoading(false);
    //     }, 2000);
    // };

    const handleCancel = () => {
        setOpen(false);
    };
    const handleSubscribe = async (instructor_id: string) => {
        const res = await handleSubscriptionByInstructorOrStudent(instructor_id);
        //show new data after handle subsribe
        const getInfomationInstructor = await getInstructoDetailPublic(instructor_id);
        setInstructor(getInfomationInstructor);
        if (res) {
            message.success("Subscribe This Instructor Successfully!")
        } else {
            message.success("Un Subscribe This Instructor Successfully!")
        }
    }
    return (
        <>
            <Modal
                title="Instructor Info"
                open={open}
                // onOk={handleOk}
                // confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Cancel
                    </Button>
                ]}
            >
                <Avatar
                    className="float-right"
                    src={instructor?.avatar + ""}
                    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                    icon={<AntDesignOutlined />}
                />
                <p >Name: <span className="font-bold">{instructor?.name}</span> </p>
                <p ><span >Email</span>: {instructor?.email}</p>
                <p ><span>Phone number</span>: {instructor?.phone_number}</p>
                <p ><span>
                </span>{instructor?.is_subscribed === true ?
                    (<div onClick={() => handleSubscribe(instructor?._id + "")} className="text-red-500 cursor-pointer">
                        <YoutubeOutlined />  Subscribed
                    </div>)
                    : (<div onClick={() => handleSubscribe(instructor?._id + "")} className="text-red-500 cursor-pointer">
                        <YoutubeOutlined />  Unsubscribed
                    </div>)}</p>
                <p ><span>Description</span>: {instructor?.description}</p>

            </Modal>
            <div className="container mx-auto px-10">
                <h1 className="text-center my-10">Manage Purchased</h1>
                <Table rowKey={(record: Purchase) => record._id} dataSource={purchases} columns={columns} />
            </div>
        </>
    )

}
export default StudentInstructorPurchase;

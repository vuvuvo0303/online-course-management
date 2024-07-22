
import { Purchase } from "../../../models";
import { useEffect, useState } from "react";
import { getItemsByStudent, handleSubscriptionByInstructorOrStudent } from "../../../services";
import { Avatar, message, Modal, Table, Tag } from "antd";
import { getColorPurchase } from "../../../consts";
import { getInstructoDetailPublic } from "../../../services";
import { Instructor } from "../../../models/User";
import { AntDesignOutlined, YoutubeOutlined } from "@ant-design/icons";

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
                        {status === "request_paid" ? "request paid" : status}
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
            title: 'Instructor Name',
            dataIndex: 'instructor_name',
            key: 'instructor_name',
            render: (instructor_name: string, record: Purchase) => (
                <div onClick={() => showModal(record.instructor_id)} className="text-blue-500 cursor-pointer">
                    {instructor_name}
                </div>
            )
        },
    ];

    const showModal = async (instructor_id: string) => {
        const getInfomationInstructor = await getInstructoDetailPublic(instructor_id);
        console.log("getInfomationInstructor: ", getInfomationInstructor)
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
        console.log('Clicked cancel button');
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
                        <YoutubeOutlined />  subscribed
                    </div>)
                    : (<div onClick={() => handleSubscribe(instructor?._id + "")} className="text-red-500 cursor-pointer">
                        <YoutubeOutlined />  not subscribe
                    </div>)}</p>
            </Modal>
            <div className="container mx-auto px-10">
                <h1 className="text-center my-10">Manage Purchase</h1>
                <Table dataSource={purchases} columns={columns} />
            </div>
        </>
    )

}
export default StudentInstructorPurchase;
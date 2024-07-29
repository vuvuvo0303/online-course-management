import { Button, Dropdown, MenuProps, Modal, Space } from "antd";
import { handleSubscriptionByInstructorOrStudent } from "../../services/subscription";
import { useState } from "react";

import { BellOutlined, DownOutlined, UserOutlined } from "@ant-design/icons";

interface SubscribeButtonProps {
    name: string;
    instructor_id: string;
    subscribed: boolean;
    onSubscriptionChange: () => void;
}

const SubscribeButtonComponent: React.FC<SubscribeButtonProps> = ({
    name,
    instructor_id,
    subscribed,
    onSubscriptionChange
}) => {
    const [loadingButton, setLoadingButton] = useState<boolean>(false);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [instructorName, setInstructorName] = useState('');
    const [isSubscribe, setIsSubscribe] = useState<boolean>(false);
    const [instructorId, setInstructorId] = useState<string>('');

    const handleSubscribe = async (instructor_id: string) => {
        setLoadingButton(true);
        await handleSubscriptionByInstructorOrStudent(instructor_id);
        onSubscriptionChange(); // Gọi callback khi hoàn tất xử lý
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
            setLoadingButton(false);
        }, 1500);
    }

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        setIsSubscribe(!isSubscribe);
        handleSubscribe(instructorId);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    const items: MenuProps['items'] = [
        {
            label: 'All',
            key: '1',
            icon: <BellOutlined />,
        },
        {
            label: 'Personalised',
            key: '2',
            icon: <BellOutlined />,
        },
        {
            label: 'None',
            key: '3',
            icon: <BellOutlined />,
        },
        {
            label: 'Unsubscribe',
            key: '4',
            icon: <UserOutlined />,
            danger: true,
        },
    ];

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        console.log('click', e);
        if (e.key === '4') {
            showModal();
        }
    };

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    const handSetInstructorId = (instructor_id: string, instructor_name: string, is_subscribed: boolean) => {
        setInstructorId(instructor_id);
        setInstructorName(instructor_name);
        setIsSubscribe(is_subscribed);
    }

    return (
        <>
            <Modal
                title=""
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                className="custom-modal"
            >
                <p>Unsubscribe from <span className='font-bold'>{instructorName}</span></p>
            </Modal>

            <div className=" flex items-center justify-between">
                {
                    subscribed ?
                        (
                            <>
                                <Dropdown menu={menuProps}>
                                    <Button
                                        onClick={() => handSetInstructorId(instructor_id, name, subscribed)}
                                        type={subscribed ? "default" : "primary"}
                                        className={subscribed ? " bg-red-500 text-white" : "bg-red-500 text-white"}
                                        style={{ borderColor: subscribed ? "gray" : "red" }}
                                    >
                                        <BellOutlined />
                                        {subscribed ? "Subscribed" : "Subscribe"}
                                        <Space>
                                            <DownOutlined />
                                        </Space>
                                    </Button>
                                </Dropdown>
                            </>)
                        :
                        (
                            <Button
                                loading={loadingButton}
                                onClick={() => handleSubscribe(instructor_id)}
                                type={subscribed ? "default" : "primary"}
                                className={subscribed ? "bg-red-500 text-white" : "bg-red-500 text-white"}
                                style={{ borderColor: subscribed ? "gray" : "red" }}
                            >
                                {subscribed ? "Subscribed" : "Subscribe"}
                            </Button>
                        )
                }
            </div>
        </>
    );
}

export default SubscribeButtonComponent;

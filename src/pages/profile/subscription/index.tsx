import { FC, useEffect, useState } from 'react';
import { Card, Avatar, Button, Row, Col, Dropdown, Space, MenuProps, Modal } from 'antd';
import { BellOutlined, DownOutlined, UserOutlined } from '@ant-design/icons';
import { Subscription } from '../../../models';
import { getItemsBySubscriber, handleSubscriptionByInstructorOrStudent } from '../../../services';
import "./sub.css"
// Define the props interface
interface ProfileCardProps {
    instructor_id: string;
    name: string;
    // title: string;
    // students: string;
    // courses: string;
    image: string;
    subscribed: boolean;
}

const Subscriptions: FC = () => {
    // for modal
    // const [position, setPosition] = useState<'start' | 'end'>('end');
    const [loadingButton, setLoadingButton] = useState<boolean>(false);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [instructorName, setInstructorName] = useState('');
    const [loading, setLoading] = useState<boolean>(true);
    const [isSubscribe, setIsSubscribe] = useState<boolean>(false);
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [instructorId, setInstructorId] = useState<string>('');

    const getSubscriber = async () => {
        const res = await getItemsBySubscriber("", 1, 100);
        setSubscriptions(res);
        setLoadingButton(false)
        setLoading(false);
    }
    useEffect(() => {
        getSubscriber();
    }, [])

    if(loading){
        return <p className='items-center text-center'>Loading ...</p>
    }

    const handleSubscribe = async (instructor_id: string) => {
        setLoadingButton(true)
        await handleSubscriptionByInstructorOrStudent(instructor_id);
        getSubscriber();
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
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
    // when user click on menu prop
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

    const ProfileCard: FC<ProfileCardProps> = ({ name, image, subscribed, instructor_id }) => {


        return (
            <Card
                className="bg-gray-800 text-white"
                bordered={false}
                style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)', minWidth: "246px" }}
            >
                <Row gutter={50}>
                    <Col span={6}>
                        <Card.Meta
                            avatar={<Avatar src={image} icon={!image && <UserOutlined />} size={64} />}
                        />
                    </Col>
                    <Col span={18}>
                        <span className="text-lg font-bold text-black">{name}</span>
                        <div className=" flex items-center justify-between">
                            {
                                subscribed === true ?
                                    (
                                        <>
                                            {/* Subscribed */}
                                            <Dropdown menu={menuProps}>
                                                <Button
                                                    onClick={() => handSetInstructorId(instructor_id, name, subscribed)}
                                                    type={subscribed ? "default" : "primary"}
                                                    className={subscribed ? "m bg-red-500 text-white" : "bg-red-500 text-white"}
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
                                        // not subscribe
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
                    </Col>
                </Row>
            </Card>
        );
    };

    const profiles: ProfileCardProps[] = subscriptions.map((subs) => (
        {
            instructor_id: subs.instructor_id,
            name: subs.instructor_name,
            image: "https://static.vecteezy.com/system/resources/previews/014/194/215/original/avatar-icon-human-a-person-s-badge-social-media-profile-symbol-the-symbol-of-a-person-vector.jpg",
            subscribed: subs.is_subscribed,
        }
    ));


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
            {
                subscriptions.length > 0 ?
                (
                    <div className="container mx-auto px-4 py-4">
                <h2 className="text-2xl font-bold mb-4">Subscriptions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {profiles.map((profile) => (
                        <ProfileCard key={profile.name} {...profile} />
                    ))}
                </div>
            </div>
                ):(
                    <h1 className='text-center items-center my-10 font-bold'>
                    You have not subscribed to any channel yet
                    </h1>
                )
            }
        </>
    );
};

export default Subscriptions;

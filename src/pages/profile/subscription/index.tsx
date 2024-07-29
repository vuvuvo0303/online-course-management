import { FC, useEffect, useState } from 'react';
import { Card, Avatar, Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Subscription } from '../../../models';
import { getItemsBySubscriber } from '../../../services';
import "./sub.css";
import SubscribeButtonComponent from '../../../components/subscribe-button';
import LoadingComponent from "../../../components/loading";
interface ProfileCardProps {
    instructor_id: string;
    name: string;
    image: string;
    subscribed: boolean;
}

const Subscriptions: FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

    const getSubscriber = async () => {
        setLoading(true)
        const res = await getItemsBySubscriber("", 1, 100);
        setSubscriptions(res);
        setLoading(false);
    }

    useEffect(() => {
        getSubscriber();
    }, []);


    if (loading) {
        return (<>
            <LoadingComponent />
        </>)
    }

    const handleSubscriptionChange = () => {
        getSubscriber();
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
                        <SubscribeButtonComponent
                            name={name}
                            instructor_id={instructor_id}
                            subscribed={subscribed}
                            onSubscriptionChange={handleSubscriptionChange} // Truyền callback
                        />
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
                    ) : (
                        <h1 className='text-center items-center my-10 font-bold'>
                            You have not subscribed to any instructor yet
                        </h1>
                    )
            }
        </>
    );
};

export default Subscriptions;

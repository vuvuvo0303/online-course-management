import { FC, useEffect, useState } from 'react';
import { Card, Avatar, Button, Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Subscription } from '../../../models';
import { getItemsBySubscriber, handleSubscriptionByInstructorOrStudent } from '../../../services';

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

    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    // const [countInstrucotrs, setCountInstructors] = useState<number>(0);
    // const [instructorId, setInstructorId] = useState<string[]>([]);
    // const [instructors, setInstructors] = useState<Instructor[]>([])
    const getSubscriber = async () => {
        const res = await getItemsBySubscriber("", 1, 100);
        setSubscriptions(res);
        // setCountInstructors(res.length);
    }
    // // get instructor id to call api  to get instructor
    // const getInstructorId = async () => {
    //     const arr: string[] = [];
    //     for (let index = 0; index < subscriptions.length; index++) {
    //         arr[index] = subscriptions[index]._id;
    //     }
    //     setInstructorId(arr);
    // }
    // // this function will get detail information of all instructor that subscription return
    // const getAllInstructorDetail = async() => {
    //     // create a tempory variable to save instructor detail
    //     const instructorArray: Instructor[] = []
    //     for (let index = 0; index < countInstrucotrs; index++) {
    //         const getInstructorDetail = await getInstructoDetailPublic(instructorId[index]);
    //         instructorArray[index] = getInstructorDetail
    //     }
    //     setInstructors(instructorArray);
    // }

    useEffect(() => {
        getSubscriber();
        // getInstructorId();
        // getAllInstructorDetail();
    }, [])

const ProfileCard: FC<ProfileCardProps> = ({ name, image, subscribed, instructor_id }) => {

    const handleSubcribe = async (instructor_id: string) => {
        await handleSubscriptionByInstructorOrStudent(instructor_id);
        getSubscriber();
    }
    return (
        <Card
            className="bg-gray-800 text-white"
            bordered={false}
            style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}
        >
            <Row gutter={50}>
                <Col span={6}>
                    <Card.Meta
                        avatar={<Avatar src={image} icon={!image && <UserOutlined />} size={64} />}
                    // title={}
                    // description={<span className="text-black">{title}</span>}
                    />
                </Col>
                <Col span={18}>
                    <span className="text-lg font-bold text-black">{name}</span>
                    <div className=" flex items-center justify-between">
                        <Button
                            onClick={() => handleSubcribe(instructor_id)}
                            type={subscribed ? "default" : "primary"}
                            className={subscribed ? "bg-red-500 text-white" : "bg-red-500 text-white"}
                            style={{ borderColor: subscribed ? "gray" : "red" }}
                        >
                            {subscribed ? "Subscribed" : "Subscribe"}
                        </Button>
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
        <div className="container mx-auto px-4 py-4">
            <h2 className="text-2xl font-bold mb-4">Subscriptions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {profiles.map((profile) => (
                    <ProfileCard key={profile.name} {...profile} />
                ))}
            </div>
        </div>
    );
};

export default Subscriptions;

import { FC } from 'react';
import { Card, Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

// Define the props interface
interface ProfileCardProps {
    name: string;
    title: string;
    students: string;
    courses: string;
    image: string;
    subscribed: boolean;
}

const ProfileCard: FC<ProfileCardProps> = ({ name, title, students, courses, image, subscribed }) => {
    return (
        <Card
            className="bg-gray-800 text-white"
            bordered={false}
            style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}
        >
            <Card.Meta
                avatar={<Avatar src={image} icon={!image && <UserOutlined />} size={64} />}
                title={<span className="text-lg font-bold text-black">{name}</span>}
                description={<span className="text-black">{title}</span>}
            />
            <div className="mt-4 flex items-center justify-between">
                <div>
                    <div className="text-black">
                        {students} Students
                    </div>
                    <div className="text-black">
                        {courses} Courses
                    </div>
                </div>
                <Button
                    type={subscribed ? "default" : "primary"}
                    className={subscribed ? "bg-gray-500 text-gray-100" : "bg-red-500 text-black"}
                    style={{ borderColor: subscribed ? "gray" : "red" }}
                >
                    {subscribed ? "Subscribed" : "Subscribe"}
                </Button>
            </div>
        </Card>
    );
};

const Subscriptions: FC = () => {
    const profiles: ProfileCardProps[] = [
        {
            name: "John Doe",
            title: "Wordpress & Plugin Tutor, Pierian Data Inc.",
            students: "100K",
            courses: "15",
            image: "https://static.vecteezy.com/system/resources/previews/014/194/215/original/avatar-icon-human-a-person-s-badge-social-media-profile-symbol-the-symbol-of-a-person-vector.jpg",
            subscribed: true,
        },
        {
            name: "Kerstin Cable",
            title: "Language Learning Coach, Writer, Online Tutor",
            students: "14K",
            courses: "11",
            image: "https://img.freepik.com/premium-vector/avatar-icon0002_750950-43.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1721001600&semt=ais_user",
            subscribed: false,
        },
        {
            name: "Jose Portilla",
            title: "Head of Data Science, Pierian Data Inc.",
            students: "1M",
            courses: "25",
            image: "https://static.vecteezy.com/system/resources/previews/014/194/222/original/avatar-icon-human-a-person-s-badge-social-media-profile-symbol-the-symbol-of-a-person-vector.jpg",
            subscribed: true,
        },
        {
            name: "Jose Portilla",
            title: "Head of Data Science, Pierian Data Inc.",
            students: "1M",
            courses: "25",
            image: "https://static.vecteezy.com/system/resources/previews/014/194/198/original/avatar-icon-human-a-person-s-badge-social-media-profile-symbol-the-symbol-of-a-person-vector.jpg",
            subscribed: true,
        },
    ];

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

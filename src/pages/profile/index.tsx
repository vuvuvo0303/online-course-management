import { useState, useEffect } from 'react';
import { Tabs, Tag, Avatar, Alert, Space, Skeleton } from 'antd';
import {
  FacebookOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  YoutubeOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Cart from './cart/CartComponents';
import Sub from './subscription/index';
import { Course, Subscription } from "../../models";
import { paths } from "../../consts";
import { getUserFromLocalStorage, fetchCoursesByClient, getItemsBySubscriber, getAllReviews } from '../../services';

const defaultAvatarUrl = '/x1.jpg'; // Path to image in public folder

const Profile: React.FC = () => {
  const [activeTabKey, setActiveTabKey] = useState('2');
  const [courses, setCourses] = useState<Course[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [coursesRes, subscriptionsRes] = await Promise.all([
        fetchCoursesByClient("", ""),
        getItemsBySubscriber("", 1, 100),
        getAllReviews("")
      ]);

      const purchasedCourses = coursesRes.filter((course: Course) => course.is_purchased);
      setCourses(purchasedCourses);
      setSubscriptions(subscriptionsRes);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const user = getUserFromLocalStorage();

  const avatarSrc = typeof user.avatar === 'string' ? user.avatar :
    user.avatar?.file?.originFileObj ? URL.createObjectURL(user.avatar.file.originFileObj) :
      defaultAvatarUrl;

  const onChange = (key: string) => {
    setActiveTabKey(key);
  };

  const tabItems = [
    {
      key: '2',
      label: 'Purchased',
      children: <Cart />,
    },
    {
      key: '3',
      label: 'Subscriptions',
      children: <Sub />,
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Skeleton active />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Alert message={error} type="error" />
      </div>
    );
  }

  return (
    <div className="bg-white-transparent p-8 text-black">
      <div className="profile-container flex flex-col lg:flex-row items-center justify-between">
        <div className="profile-info flex flex-col lg:flex-row items-center">
          <div className="mb-4 lg:mb-0 lg:mr-8">
            <Space>
              <Avatar
                src={avatarSrc ? avatarSrc : paths.AVATAR}
                className="hover:cursor-pointer hidden md:block border border-black"
                size={120}
              />
            </Space>
          </div>
          <div className='flex flex-col items-center lg:items-start'>
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-lg">{user.email}</p>
            </div>
            <div className="flex flex-wrap mt-4 sm:flex-row md:flex-wrap hidden sm:flex">
              <div className="flex flex-col items-center justify-center bg-gray-800 p-4 border border-gray-600 text-center min-w-[150px]">
                <p className="text-gray-400">Purchased</p>
                <h3 className="text-2xl font-bold">{courses.length}</h3>
              </div>
              <div className="flex flex-col items-center justify-center bg-gray-800 p-4 border-t border-r border-b border-gray-600 text-center min-w-[150px]">
                <p className="text-gray-400">Subscriptions</p>
                <h3 className="text-2xl font-bold">{subscriptions.length}</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-actions flex flex-col items-center lg:items-end mt-4 lg:mt-0">
          <div className="flex space-2 p-2">
            <Tag icon={<FacebookOutlined />} color="#3b5999" />
            <Tag icon={<TwitterOutlined />} color="#55acee" />
            <Tag icon={<LinkedinOutlined />} color="#0077b5" />
            <Tag icon={<YoutubeOutlined />} color="#cd201f" />
          </div>
          <Link to="/edit-profile">
            <button className="bg-red-600 text-white border-none px-3 py-1 rounded mt-3 lg:mr-[0.8rem]">Edit</button>
          </Link>
        </div>
      </div>
      <div className="profile-tabs mt-8">
        <Tabs activeKey={activeTabKey} onChange={onChange} items={tabItems} centered />
      </div>
    </div>
  );
};

export default Profile;

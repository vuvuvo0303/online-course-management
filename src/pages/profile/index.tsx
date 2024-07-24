import { useState } from 'react';
import { Tabs, Tag, Avatar } from 'antd';
import {
  FacebookOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import About from './about/about';
import Cart from './cart/CartComponents';
import Sub from './subscription/index';
import ChangePassword from './change-password';
import { getUserFromLocalStorrage } from '../../services/auth';

const { TabPane } = Tabs;

const Profile: React.FC = () => {
  const [activeTabKey, setActiveTabKey] = useState('1');

  const user = getUserFromLocalStorrage();
  const googleID = user.google_id;

  let avatarSrc;

  if (typeof user.avatar === 'string') {
    avatarSrc = user.avatar;
  } else if (user.avatar?.file?.originFileObj) {
    avatarSrc = URL.createObjectURL(user.avatar.file.originFileObj);
  } else {
    avatarSrc = 'https://static.vecteezy.com/system/resources/previews/009/734/564/non_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg'; // Replace this with the URL of a default avatar image
  }

  const onChange = (key: string) => {
    setActiveTabKey(key);
  };

  return (
    <div className="bg-white-transparent p-8 text-black">
      <div className="profile-container flex flex-col lg:flex-row items-center justify-between">
        <div className="profile-info flex flex-col lg:flex-row items-center">
          <div className="mb-4 lg:mb-0 lg:mr-8">
            <Avatar
              src={avatarSrc}
              alt={user.avatar ? 'User Avatar' : 'Default Avatar'}
              size={120}
            />
          </div>
          <div className='flex flex-col items-center lg:items-start'>
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-lg">{user.email}</p>
            </div>
            <div className="flex flex-wrap mt-4 sm:flex-row md:flex-wrap hidden sm:flex">
              <div className="flex flex-col items-center justify-center bg-gray-800 p-4 border border-gray-600 text-center min-w-[150px]">
                <p className="text-gray-400">Purchased</p>
                <h3 className="text-2xl font-bold">4</h3>
              </div>
              <div className="flex flex-col items-center justify-center bg-gray-800 p-4 border-t border-r border-b border-gray-600 text-center min-w-[150px]">
                <p className="text-gray-400">My Reviews</p>
                <h3 className="text-2xl font-bold">4</h3>
              </div>
              <div className="flex flex-col items-center justify-center bg-gray-800 p-4 border-t border-r border-b border-gray-600 text-center min-w-[150px]">
                <p className="text-gray-400">Subscriptions</p>
                <h3 className="text-2xl font-bold">15K</h3>
              </div>
              <div className="flex flex-col items-center justify-center bg-gray-800 p-4 border-t border-r border-b border-gray-600 text-center min-w-[150px]">
                <p className="text-gray-400 mt-[0.1rem]">Certificates</p>
                <h3 className="text-2xl font-bold">2</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-actions flex flex-col items-center lg:items-end mt-4 lg:mt-0">
          <Link to="/edit-profile">
            <button className="border-none mb-3 lg:mr-[0.8rem] "><SettingOutlined className='mr-2' />Setting</button>
          </Link>
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
        <Tabs defaultActiveKey="1" centered onChange={onChange}>
          <TabPane tab="About" key="1" />
          <TabPane tab="Purchased" key="2" />
          <TabPane tab="Subscriptions" key="3" />
          {!googleID && <TabPane tab="Change Password" key="4" />}
        </Tabs>
        <div className="course-content">
          {activeTabKey === '1' && <About />}
          {activeTabKey === '2' && <Cart />}
          {activeTabKey === '3' && <Sub />}
          {!googleID && activeTabKey === '4' && <ChangePassword />}
        </div>
      </div>
    </div>
  );
};

export default Profile;

import { useState } from 'react';
import { Tabs, Tag, Avatar } from 'antd';
import {
  FacebookOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  UserOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import About from './about/about';
import Cart from './cart/CartComponents';
import Sub from './subscription/index';
import ChangePassword from './change-password';
import { User } from 'models/User';

const { TabPane } = Tabs;

const Profile: React.FC = () => {
  const [activeTabKey, setActiveTabKey] = useState('1');

  const userString = localStorage.getItem("user");
  const user: User = userString ? JSON.parse(userString) : null;
  const googleID = user.google_id;

  const onChange = (key: string) => {
    setActiveTabKey(key);
  };

  return (
    <div className="bg-white-transparent p-8 text-black">
      <div className="profile-container flex flex-col lg:flex-row items-center justify-between">
        <div className="profile-info flex flex-col lg:flex-row items-center">
          <div className="mb-4 lg:mb-0 lg:mr-8">
            <Avatar
              icon={<UserOutlined />}
              alt="Profile"
              size={120}
              className="mr-0 lg:mr-8"
            />
          </div>
          <div className='flex flex-col items-center lg:items-start'>
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-bold">John Doe</h2>
              <p className="text-lg">Junior Graphic Developer</p>
            </div>
            <div className="flex flex-wrap space-x-0 lg:space-x-4 mt-4 border border-black w-full lg:w-auto">
              <div className="p-4 bg-gray-800 rounded-lg text-center w-full lg:w-auto mb-2 lg:mb-0">
                <p>Purchased</p>
                <h3 className="text-xl font-bold">4</h3>
              </div>
              <div className="p-4 bg-gray-800 border-b-0 border-r-0 border-t-0 border border-black text-center w-full lg:w-auto mb-2 lg:mb-0">
                <p>My Reviews</p>
                <h3 className="text-xl font-bold">4</h3>
              </div>
              <div className="p-4 bg-gray-800 text-center border-b-0 border-t-0 border border-black w-full lg:w-auto mb-2 lg:mb-0">
                <p>Subscriptions</p>
                <h3 className="text-xl font-bold">15K</h3>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg text-center w-full lg:w-auto">
                <p>Certificates</p>
                <h3 className="text-xl font-bold">2</h3>
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
          {!googleID && <TabPane tab="" key="4" />}

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

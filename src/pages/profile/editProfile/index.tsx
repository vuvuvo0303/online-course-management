import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input, Tabs } from "antd";
import { Link } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeTwoTone, RollbackOutlined } from '@ant-design/icons';
import styles from "./profile.module.css";
import { User } from "../../../models/User";

const { TabPane } = Tabs;
const { TextArea } = Input;

const EditProfile: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [forceUpdateFlag, setForceUpdateFlag] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            console.error("User data not found in localStorage");
        }
    }, [forceUpdateFlag]);

    const handleInputChange = (field: string, value: string) => {
        setUser(prevState => {
            if (prevState) {
                const updatedUser = { ...prevState, [field]: value };
                localStorage.setItem("user", JSON.stringify(updatedUser));
                return updatedUser;
            }
            return prevState;
        });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSave = async () => {
        try {
            const formValues = await form.validateFields();
            const updatedUser = { ...user, ...formValues };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setIsModalVisible(false);
            setForceUpdateFlag(!forceUpdateFlag);
        } catch (error) {
            console.error("Validation failed:", error);
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    const { role } = user;

    return (
        <div className="w-full bg-dark">
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Profiles and Settings</h1>
                    <Link to="/profile">
                        <Button>
                            <RollbackOutlined />
                        </Button>
                    </Link>
                </div>
                <div>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="F-learn Profile" key="1">
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <div className="mb-4 max-w-[30rem]">
                                            <strong className="block mb-2">Full Name:</strong>
                                            <input
                                                type="text"
                                                className="p-4 border border-gray-300 h-[3.5rem] text-base w-full"
                                                value={user.name}
                                                onChange={(e) => handleInputChange('name', e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-4 max-w-[30rem]">
                                            <strong className="block mb-2">Email:</strong>
                                            <div className="p-4 border border-gray-300 h-[3.5rem] text-base">
                                                {user.email}
                                            </div>
                                        </div>
                                        {role === "student" && (
                                            <>
                                                <div className="mb-4 max-w-[30rem]">
                                                    <strong className="block mb-2">Biography:</strong>
                                                    <TextArea
                                                        showCount
                                                        maxLength={100}
                                                        value={user.description || ''}
                                                        onChange={(e) => handleInputChange('biography', e.target.value)}
                                                        placeholder="Description"
                                                        style={{ height: 120, resize: 'none' }}
                                                    />
                                                </div>
                                                <Button className="mt-3" onClick={handleSave}>
                                                    Save
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                    {role === "student" && (
                                        <div>
                                            <SocialLinks user={user} handleInputChange={handleInputChange} />
                                        </div>
                                    )}
                                </div>
                                {role === "instructor" && (
                                    <div>
                                        <p className={styles.profileDetailItem}>
                                            <strong>Description:</strong> {user.description}
                                        </p>
                                        <p className={styles.profileDetailItem}>
                                            <strong>Degree:</strong>
                                            <br />
                                            <img
                                                // src={user.degreeCertificate}
                                                alt="Degree Certificate"
                                                className={styles.degreeImage}
                                            />
                                        </p>
                                    </div>
                                )}
                            </div>
                        </TabPane>
                        <TabPane tab="Profile Picture" key="2">
                            <ProfilePicture />
                        </TabPane>
                        <TabPane tab="Change Password" key="3">
                            <ChangePasswordForm />
                        </TabPane>
                    </Tabs>
                </div>
            </div>

            <Modal
                title="Edit Profile"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="save" type="primary" onClick={handleSave}>
                        Save
                    </Button>,
                ]}
            >
                <Form form={form} name="editProfile">
                    <Form.Item label="Full Name" name="fullName">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Avatar URL"
                        name="avatarUrl"
                        rules={[{ type: "url", message: "Please enter a valid URL!" }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

interface SocialLinksProps {
    user: User;
    handleInputChange: (field: string, value: string) => void;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ user, handleInputChange }) => (
    <>
        <div className="mb-5 w-full">
            <strong className="block mb-2">Twitter:</strong>
            <div>
                <span className="p-4 bg-gray-200 border border-gray-300 h-[3.5rem] text-base">http://www.twitter.com/</span>
                <input
                    type="text"
                    className="p-4 border border-gray-300 lg:h-[3.35rem] text-base w-[13.7rem]"
                    value={user.description || ''}
                    onChange={(e) => handleInputChange('twitter', e.target.value)}
                />
            </div>
        </div>
        <div className="mb-5 w-full">
            <strong className="block mb-2">Facebook:</strong>
            <div>
                <span className="p-4 bg-gray-200 border border-gray-300 h-[3.5rem] text-base">http://www.facebook.com/</span>
                <input
                    type="text"
                    className="p-4 border border-gray-300 lg:h-[3.3rem] text-base w-[12.5rem]"
                    value={user.description || ''}
                    onChange={(e) => handleInputChange('facebook', e.target.value)}
                />
            </div>
        </div>
        <div className="mb-5 w-full">
            <strong className="block mb-2">LinkedIn:</strong>
            <div>
                <span className="p-4 bg-gray-200 border border-gray-300 h-[3.5rem] text-base">http://www.linkedin.com/</span>
                <input
                    type="text"
                    className="p-4 border border-gray-300 lg:h-[3.3rem] text-base"
                    value={user.description || ''}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                />
            </div>
        </div>
        <div className="mb-4 w-full">
            <strong className="block mb-2">YouTube:</strong>
            <div>
                <span className="p-4 bg-gray-200 border border-gray-300 h-[3.5rem] text-base">http://www.youtube.com/</span>
                <input
                    type="text"
                    className="p-4 border border-gray-300 lg:h-[3.3rem] text-base"
                    value={user.description || ''}
                    onChange={(e) => handleInputChange('youtube', e.target.value)}
                />
            </div>
        </div>
    </>
);

const ProfilePicture: React.FC = () => (
    <div className="space-y-6">
        <div className="space-y-4">
            <p>
                <span className="text-lg">Image preview</span> <br />
                <span className="text-[0.8rem]">Minimum 200x200 pixels, Maximum 6000x6000 pixels</span>
            </p>
            <div className="p-4 border border-gray-300 mb-4 h-[20rem] max-w-[40rem] text-base flex items-center justify-center">
                <img
                    src="../public/x1.jpg"
                    alt="Avatar"
                    className="h-full object-contain"
                />
            </div>
        </div>
        <Button>
            Save
        </Button>
    </div>
);

const ChangePasswordForm: React.FC = () => (
    <div className="space-y-6">
        <div className="mb-4 max-w-[30rem]">
            <strong className="block mb-2">Current Password:</strong>
            <Input.Password
                placeholder="Input password"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
        </div>
        <div className="mb-4 max-w-[30rem]">
            <strong className="block mb-2">New Password:</strong>
            <Input.Password
                placeholder="Input password"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
        </div>
        <div className="mb-4 max-w-[30rem]">
            <strong className="block mb-2">Re-enter Password:</strong>
            <Input.Password
                placeholder="Input password"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
        </div>
        <Button className="mt-5">
            Save
        </Button>
    </div>
);

export default EditProfile;

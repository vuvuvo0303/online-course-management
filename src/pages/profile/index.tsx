import { useEffect, useState } from "react";
import { Student, Admin, Instructor } from "../../models";
import { Modal, Button, Form, Input, Tabs } from "antd";
import styles from "./profile.module.css";

const { TabPane } = Tabs;

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [forceUpdateFlag, setForceUpdateFlag] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      console.error("User data not found in localStorage");
      return;
    }

    const userObj = JSON.parse(storedUser);
    setUser(userObj);
  }, [forceUpdateFlag]);

  const handleInputChange = (field: string, value: any) => {
    setUser((prevState: any) => ({
      ...prevState,
      [field]: value,
    }));
    localStorage.setItem("user", JSON.stringify({ ...user, [field]: value }));
  };


  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSave = async () => {
    try {
      const formValues = await form.validateFields();

      const updatedUser = { ...user };

      if (formValues.fullName) {
        updatedUser.fullName = formValues.fullName;
      }

      if (formValues.avatarUrl) {
        updatedUser.avatarUrl = formValues.avatarUrl;
      }

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

  let displayUser;
  const storedCreatedDate = new Date(user.createdDate).toUTCString();
  let storedLastLogin = user.lastLogin;

  if (role === "admin" && storedLastLogin) {
    storedLastLogin = new Date(storedLastLogin).toUTCString();
  }

  if (role === "student") {
    displayUser = new Student(
      user.userId,
      user.fullName,
      user.email,
      "student",
      user.avatarUrl,
      storedCreatedDate,
      user.status,
      user.biography,
      user.facebook,
      user.github,
      user.linkedin,
      user.twitter
    );
  } else if (role === "admin") {
    displayUser = new Admin(
      user.userId,
      user.fullName,
      user.email,
      "admin",
      user.avatarUrl,
      storedCreatedDate,
      "",
      storedLastLogin
    );
  } else if (role === "instructor") {
    displayUser = new Instructor(
      user.userId,
      user.fullName,
      user.email,
      "instructor",
      user.avatarUrl,
      storedCreatedDate,
      "",
      user.description,
      user.degree
    );
  }

  if (!displayUser) {
    return <div>Error: User role is not recognized.</div>;
  }

  // const handleSaveChanges = () => {
  //   // Here you can implement your logic to save editedUser
  //   // For example, you might send a request to your backend API

  //   // Replace this with your actual saving logic
  //   console.log("Saving changes:", displayUser);
  //   alert("Changes saved successfully!"); // Example alert, replace with your actual saving code
  // };

  return (
    <div className="w-full">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Profiles and Settings</h1>
        <div>
          <Tabs defaultActiveKey="1">
            <TabPane tab="F-learn Profile" key="1">
              <div className="space-y-4">
                {/* <Button type="primary" onClick={showEditModal} className="bg-blue-500 text-white py-2 px-4 rounded">
                  Edit Profile
                </Button> */}
                {/* <button
                  onClick={handleSaveChanges}
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Save Changes
                </button> */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="mb-4 max-w-[30rem]">
                      <strong className="block mb-2">Full Name:</strong>
                      <input
                        type="fullname"
                        className="p-4 border border-gray-300 h-[3.5rem] text-base w-full"
                        value={displayUser.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                      />
                    </div>
                    <div className="mb-4 max-w-[30rem]">
                      <strong className="block mb-2">Email:</strong>
                      <div className="p-4 border border-gray-300 h-[3.5rem] text-base">
                        {displayUser.email}
                      </div>
                    </div>
                    {displayUser instanceof Student && (
                      <>
                        <div className="mb-4 max-w-[30rem]">
                          <strong className="block mb-2">Status:</strong>
                          <div className="p-4 border border-gray-300 h-[3.5rem] text-base">
                            {displayUser.status ? "Active" : "Inactive"}
                          </div>
                        </div>
                        <div className="mb-4 max-w-[30rem]">
                          <strong className="block mb-2">Biography:</strong>
                          <input
                            type="text"
                            className="p-4 border border-gray-300 h-[3.5rem] text-base w-full"
                            // value={displayUser.biography || ''}
                            onChange={(e) => handleInputChange('biography', e.target.value)}
                          />
                        </div>
                        <Button>
                          Save
                        </Button>
                      </>
                    )}
                  </div>
                  {displayUser instanceof Student && (
                    <div>
                      <div className="mb-4 w-full">
                        <strong className="block mb-2">Twitter:</strong>
                        <div >
                          <span className="p-4 bg-gray-200 border border-gray-300 h-[3.5rem] text-base">http://www.twitter.com/</span>
                          <input
                            type="text"
                            className="p-4 border border-gray-300 h-[3.5rem] text-base"
                            // value={displayUser.biography || ''}
                            onChange={(e) => handleInputChange('biography', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-4 w-full">
                        <strong className="block mb-2">Facebook:</strong>
                        <div>
                          <span className="p-4 bg-gray-200 border border-gray-300 h-[3.5rem] text-base">http://www.facebook.com/</span>
                          <input
                            type="text"
                            className="p-4 border border-gray-300 h-[3.5rem] text-base"
                            // value={displayUser.biography || ''}
                            onChange={(e) => handleInputChange('facebook', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-4 w-full">
                        <strong className="block mb-2">Linkedin:</strong>
                        <div>
                          <span className="p-4 bg-gray-200 border border-gray-300 h-[3.5rem] text-base">http://www.linkedin.com/</span>
                          <input
                            type="text"
                            className="p-4 border border-gray-300 h-[3.5rem] text-base"
                            // value={displayUser.biography || ''}
                            onChange={(e) => handleInputChange('linkedin', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-4 w-full">
                        <strong className="block mb-2">Youtube:</strong>
                        <div>
                          <span className="p-4 bg-gray-200 border border-gray-300 h-[3.5rem] text-base">http://www.youtube.com/</span>
                          <input
                            type="text"
                            className="p-4 border border-gray-300 h-[3.5rem] text-base"
                            // value={displayUser.biography || ''}
                            onChange={(e) => handleInputChange('youtube', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {displayUser instanceof Admin && (
                  <div>
                    <p className={styles.profileDetailItem}>
                      <strong>Last Login:</strong> {displayUser.lastLogin}
                    </p>
                  </div>
                )}
                {displayUser instanceof Instructor && (
                  <div>
                    <p className={styles.profileDetailItem}>
                      <strong>Description:</strong> {displayUser.description}
                    </p>
                    <p className={styles.profileDetailItem}>
                      <strong>Degree:</strong>
                      <br />
                      <img
                        src={displayUser.degree}
                        alt="Degree Certificate"
                        className={styles.degreeImage}
                      />
                    </p>
                  </div>
                )}
              </div>
            </TabPane>
            <TabPane tab="Profile Picture" key="2">
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

export default Profile;

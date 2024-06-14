import { useEffect, useState } from "react";
import { Student, Admin, Instructor } from "../../models";
import { Modal, Button, Form, Input, Tabs, Empty } from "antd";
import styles from "./profile.module.css";

const { TabPane } = Tabs;

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [forceUpdateFlag, setForceUpdateFlag] = useState(false);

  const showEditModal = () => {
    setIsModalVisible(true);
    form.setFieldsValue({
      fullName: user.fullName,
      avatarUrl: user.avatarUrl,
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSave = async () => {
    try {
      const formValues = await form.validateFields();

      const updatedUser: any = { ...user };

      if (formValues.fullName) {
        updatedUser.fullName = formValues.fullName;
      }

      if (formValues.avatarUrl) {
        updatedUser.avatarUrl = formValues.avatarUrl;
      }

      localStorage.setItem("user", JSON.stringify(updatedUser)); // Thay đổi sang sử dụng localStorage

      setIsModalVisible(false);

      setForceUpdateFlag(!forceUpdateFlag);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  useEffect(() => {
    const storedRole = localStorage.getItem("role"); // Thay đổi từ sử dụng sessionStorage sang localStorage
    if (!storedRole) {
      console.error("Role not found in localStorage");
      return;
    }

    const storedUser = localStorage.getItem("user"); // Thay đổi từ sử dụng sessionStorage sang localStorage

    if (!storedUser) {
      console.error("User data not found in localStorage");
      return;
    }

    const userObj = JSON.parse(storedUser);

    const storedUserId = userObj.userId;
    const storedFullName = userObj.fullName;
    const storedEmail = userObj.email;
    const storedAvatarUrl = userObj.avatarUrl;
    const storedCreatedDate = new Date(userObj.createdDate).toUTCString();

    let newUser: any = null;
    if (storedRole === "Student") {
      newUser = new Student(
        storedUserId,
        storedFullName,
        storedEmail,
        "",
        storedAvatarUrl,
        storedCreatedDate
      );
    } else if (storedRole === "Admin") {
      newUser = new Admin(
        storedUserId,
        storedFullName,
        storedEmail,
        "",
        storedAvatarUrl,
        storedCreatedDate
      );
    } else if (storedRole === "Instructor") {
      newUser = new Instructor(
        storedUserId,
        storedFullName,
        storedEmail,
        "",
        storedAvatarUrl,
        storedCreatedDate
      );
    }

    setUser(newUser);
  }, [forceUpdateFlag]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className={styles.profileContainer}>
        <div className={styles.coverPhoto}>
          <img
            src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Cover"
            className={styles.coverImage}
          />
          <img
            src={user.avatarUrl}
            alt="Avatar"
            className={styles.profileAvatar}
          />
        </div>
        <div className={styles.tab}>
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="About Me" key="1">
              <div className={styles.profileDetails}>
                <h1 className={styles.profileHeader}>Profile</h1>
                <Button
                  type="primary"
                  onClick={showEditModal}
                  className={styles.editButton}
                >
                  Edit Profile
                </Button>
                <p className={styles.profileDetailItem}>
                  <strong>Full Name: </strong>
                  {user.fullName}
                </p>
                <p className={styles.profileDetailItem}>
                  <strong>Email: </strong>
                  {user.email}
                </p>
                <p className={styles.profileDetailItem}>
                  <strong>Created Date: </strong>
                  {user.createdDate}
                </p>

                {user instanceof Student && (
                  <div>
                    <p className={styles.profileDetailItem}>
                      <strong>Status: </strong>
                      {user.isActive ? "Active" : "Inactive"}
                    </p>
                  </div>
                )}
                {user instanceof Admin && (
                  <div>
                    <p className={styles.profileDetailItem}>
                      Last Login: {user.lastLogin}
                    </p>
                  </div>
                )}
                {user instanceof Instructor && (
                  <div>
                    <p className={styles.profileDetailItem}>
                      Description: {user.description}
                    </p>
                    <p className={styles.profileDetailItem}>
                      Degree: {user.degree}
                    </p>
                    <p className={styles.profileDetailItem}>
                      Status: {user.status}
                    </p>
                  </div>
                )}
              </div>
            </TabPane>
            <TabPane tab="Purchased Courses" key="2">
              <div className={styles.coursesContainer}>
                <h1 className={styles.coursesHeader}>My Courses</h1>
                {user.courses && user.courses.length > 0 ? (
                  <ul className={styles.coursesList}>
                    {user.courses.map((course: any, index: number) => (
                      <li key={index} className={styles.courseItem}>
                        {course.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Empty description="No courses purchased" />
                )}
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

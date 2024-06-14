import { useEffect, useState } from "react";
import { Student, Admin, Instructor } from "../../models";
import { Modal, Button, Form, Input } from "antd";
import styles from "./profile.module.css";

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [forceUpdateFlag, setForceUpdateFlag] = useState(false);

  const showEditModal = () => {
    setIsModalVisible(true);
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

      localStorage.setItem("user", JSON.stringify(updatedUser));

      setIsModalVisible(false);

      setForceUpdateFlag(!forceUpdateFlag);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (!storedRole) {
      console.error("Role not found in localStorage");
      return;
    }

    const storedUser = localStorage.getItem("user");

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
    const storedUpdatedDate = new Date(userObj.updatedDate).toUTCString();

    let newUser: any = null;
    if (storedRole === "Student") {
      newUser = new Student(
        storedUserId,
        storedFullName,
        storedEmail,
        "",
        storedAvatarUrl,
        storedCreatedDate,
        storedUpdatedDate
      );
    } else if (storedRole === "Admin") {
      newUser = new Admin(
        storedUserId,
        storedFullName,
        storedEmail,
        "",
        storedAvatarUrl,
        storedCreatedDate,
        storedUpdatedDate
      );
    } else if (storedRole === "Instructor") {
      newUser = new Instructor(
        storedUserId,
        storedFullName,
        storedEmail,
        "",
        storedAvatarUrl,
        storedCreatedDate,
        storedUpdatedDate
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
          <p className={styles.profileDetailItem}>
            <strong>Updated Date: </strong>
            {user.updatedDate}
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
              <p className={styles.profileDetailItem}>Degree: {user.degree}</p>
              <p className={styles.profileDetailItem}>Status: {user.status}</p>
            </div>
          )}
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
        <Form form={form} name="editProfile" initialValues={{ remember: true }}>
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

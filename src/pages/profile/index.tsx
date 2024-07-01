import { useEffect, useState } from "react";
import { Student, Admin, Instructor } from "../../models";
import { Modal, Button, Form, Input, Tabs, Empty } from "antd";
import styles from "./profile.module.css";
import axios from "axios";

const { TabPane } = Tabs;

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [forceUpdateFlag, setForceUpdateFlag] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      console.error("User data not found in localStorage");
      return;
    }

    const userObj = JSON.parse(storedUser);
    setUser(userObj);
  }, [forceUpdateFlag]);

  useEffect(() => {
    if (user && user.role === "Student") {
      fetchCourses();
    }
  }, [user]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        "https://665fbf245425580055b0b23d.mockapi.io/courses"
      );
      setCourses(response.data);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };

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

  // Convert storedLastLogin to UTC format
  if (role === "Admin" && storedLastLogin) {
    storedLastLogin = new Date(storedLastLogin).toUTCString();
  }

  if (role === "student") {
    displayUser = new Student(
      user.userId,
      user.fullName,
      user.email,
      "student",
      user.avatarUrl,
      storedCreatedDate
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
                  {displayUser.name}
                </p>
                <p className={styles.profileDetailItem}>
                  <strong>Email: </strong>
                  {displayUser.email}
                </p>
                <p className={styles.profileDetailItem}>
                  <strong>Created Date: </strong>
                  {displayUser.created_at}
                </p>

                {displayUser instanceof Student && (
                  <div>
                    <p className={styles.profileDetailItem}>
                      <strong>Status: </strong>
                      {displayUser.status ? "Active" : "Inactive"}
                    </p>
                  </div>
                )}
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
            {role === "Student" && (
              <TabPane tab="Purchased Courses" key="2">
                <div className={styles.coursesContainer}>
                  <h1 className={styles.coursesHeader}>My Courses</h1>
                  {courses.length > 0 ? (
                    <ul className={styles.coursesList}>
                      {courses.map((course: any, index: number) => (
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
            )}
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

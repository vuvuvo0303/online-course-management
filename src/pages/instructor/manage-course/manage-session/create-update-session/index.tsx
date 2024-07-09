import { useEffect, useState } from "react";
import { Button, Form, Input, Breadcrumb, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { HomeOutlined } from "@ant-design/icons";
import { Course, Session } from "../../../../../models";
import { toast } from "react-toastify";
import { User } from "../../../../../models/User";
import { host_main } from "../../../../../consts";
import axiosInstance from "../../../../../services/api";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14, offset: 5 },
  },
};

const CreateUpdateSession = () => {
  const token = localStorage.getItem("token")
  const { courseId, sessionId } = useParams<{ courseId: string; sessionId: string }>();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const [role, setRole] = useState<string>('');
  const [courseId2, setCourseId2] = useState<string>("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    const userString = localStorage.getItem("user");
    const user: User = userString ? JSON.parse(userString) : null;
    setUserId(user?._id);
    setRole(user?.role);
  }, []);
  console.log("check courseId: ", courseId)
  useEffect(() => {
    if (courseId) {
      setCourseId2(courseId);
    }
    // update session
    if (sessionId) {
      const fetchData = async () => {
        try {
          const res = await axiosInstance.get(`/api/session/${sessionId}`);
          console.log("check data update res: ", res);
          const data = res.data;
          form.setFieldsValue({
            name: data.name,
            description: data.description,
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else {
      setLoading(false);
    }

  }, [courseId, form, sessionId, token]);

  useEffect(() => {
    if (!courseId) {
      const fetchCourses = async () => {
        try {
          const res = await axios.get<Course[]>("https://665fbf245425580055b0b23d.mockapi.io/courses")
          if (res) {
            if (role === "instructor") {
              setCourses(res.data.filter(course => course._id === userId));
            } else {
              setCourses(res.data);
            }

          }
        } catch (error) {
          console.log("error: " + error);
        }
      };
      fetchCourses();
    }
  }, [courseId, userId, role])

  const onFinish = async (values: Session) => {
    setLoading(true);
    // manage course -> manage session -> update session
    if (courseId2 && sessionId) {
      console.log('values: ', values)
      console.log('userId: ', userId)
      console.log('sessionId: ', sessionId)
      try {
        const updateres = await axios.put(`${host_main}/api/session/${sessionId}`, { ...values, user_id: userId, position_order: 3, _id: sessionId },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        toast.success("Update Session Successfully!")
        console.log("updateres: ", updateres)
      } catch (error) {
        console.error("Error occurred:", error);
        toast.error("Update Session Failed!")
      }
      navigate(`/instructor/manage-courses/${courseId}/manage-sessions`);
    } else {
      // manage course -> manage session -> create session
      if (courseId2) {
        try {
          const create = await axios.post(`${host_main}/api/session`, values,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          console.log("check create: ", create);
          toast.success("Create Session Successfully!")
          navigate(`/instructor/manage-courses/${courseId}/manage-sessions`);
        } catch (error) {
          setLoading(false)
          console.error(error);
          toast.error("Create Session Failed!")
        }
      }
      else {
        // manage all sessions - create session
        try {
          await axios.post(`${host_main}/api/session`, { ...values, userId: userId });
          toast.success("Create Session Successfully!")
          navigate(`/instructor/manage-all-sessions`);
        } catch (error) {
          console.error("Error occurred:", error);
          toast.error("Create Session Failed!")
        }
      }
    }

  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className="flex justify-center items-center h-full mt-10">
      {loading ? (
        <div>Loading ...</div>
      ) : (
        <div className="w-full max-w-2xl bg-white p-8 rounded shadow">
          {
            courseId ? (<Breadcrumb className="py-2" >
              <Breadcrumb.Item href="/dashboard">
                <HomeOutlined />
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/instructor/manage-courses">
                Manage Courses
              </Breadcrumb.Item>
              <Breadcrumb.Item
                href={`/instructor/manage-courses/${courseId}/manage-sessions`}
              >Manage Sessions</Breadcrumb.Item>

              <Breadcrumb.Item >
                {sessionId ? "Update Session" : "Create Session"}
              </Breadcrumb.Item>
            </Breadcrumb>)
              :
              <Breadcrumb className="py-2">
                <Breadcrumb.Item href="/dashboard">
                  <HomeOutlined />
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  href={`/instructor/manage-all-sessions`}
                >Manage All Sessions</Breadcrumb.Item>
                <Breadcrumb.Item >
                  {sessionId ? "Update Session" : "Create Session"}
                </Breadcrumb.Item>
              </Breadcrumb>
          }

          <h1 className="text-center mb-8">{sessionId ? "Update Session" : "Create Session"}</h1>
          <Form onFinish={onFinish} form={form} {...formItemLayout} initialValues={{}}>
            <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input title!' }]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
            >
              <Input.TextArea />
            </Form.Item>

            {
              !courseId && (
                <Form.Item label="Course Id" name="course_id" rules={[{ required: true, message: 'Please input course!' }]}>
                  <Select

                    onChange={handleChange}
                    options={courses.map(course => (
                      {
                        value: course._id, label: course.name
                      }
                    ))
                    }
                  />
                </Form.Item>
              )
            }


            {
              courseId && (
                <Form.Item hidden label="Course Id" name="course_id" initialValue={courseId}>
                  <Input />
                </Form.Item>
              )
            }
            <Form.Item wrapperCol={{ span: 24, offset: 6 }}>
              <Button type="primary" htmlType="submit" loading={loading}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  );
};

export default CreateUpdateSession;

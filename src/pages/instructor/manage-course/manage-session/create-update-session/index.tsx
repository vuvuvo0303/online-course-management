import { useEffect, useState } from "react";
import { Button, Form, Input, Breadcrumb, Select, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import { Course, Session } from "../../../../../models";
import { API_CREATE_SESSION, API_GET_COURSES, API_GET_SESSION, API_UPDATE_SESSION } from "../../../../../consts";
import { axiosInstance, getUserFromLocalStorrage } from "../../../../../services";
import TinyMCEEditorComponent from "../../../../../components/tinyMCE";
import LoadingComponent from "../../../../../components/loading";
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

  const { courseId, sessionId } = useParams<{ courseId: string; sessionId: string }>();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const [role, setRole] = useState<string>('');
  const [des, setDes] = useState<string>("");
  const [courseIdUpdate, setCourseIdUpdate] = useState<string>("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [userId, setUserId] = useState<string>('');
  const [content, setContent] = useState<string>('Enter something here');
  useEffect(() => {
    const user = getUserFromLocalStorrage();
    setUserId(user?._id);
    setRole(user?.role);
  }, []);

  useEffect(() => {
    // update session
    if (sessionId) {
      const fetchSession = async () => {
        const response = await axiosInstance.get(`${API_GET_SESSION}/${sessionId}`);
        const data = response.data;
        form.setFieldsValue({
          name: data.name,
          description: data.description,
          course_id: {
            value: data.course_id, label: data.course_name
          },
          position_order: data.position_order
        });
        setContent(data.description);
        // if instructor don't update new course , program will use old data
        setCourseIdUpdate(data.course_id)
        setLoading(false);
      };
      fetchSession();
    } else {
      setLoading(false);
    }

  }, [courseId, form, sessionId]);
  //Fetch course
  useEffect(() => {
    const fetchCourses = async () => {
      const res = await axiosInstance.post(API_GET_COURSES,
        {
          "searchCondition": {
            "keyword": "",
            "category": "",
            "status": "new",
            "is_deleted": false
          },
          "pageInfo": {
            "pageNum": 1,
            "pageSize": 10
          }
        }
      );

      setCourses(res.data.pageData);
      setLoading(false)
    };
    fetchCourses();
  }, [userId, role])

  const onFinish = async (values: Session) => {
    values.description = content;
    // setLoading(true);
    // update session component for manga sessions and manage all sessions
    if (sessionId) {
      try {
        const updatess = await axiosInstance.put(`${API_UPDATE_SESSION}/${sessionId}`,
          {
            "name": values.name,
            "course_id": courseIdUpdate,
            "description": des,
            "position_order": 3
          }
        )
        console.log("check update: ", updatess);
        message.success("Update Session Successfully!")
      } catch (error) {
        //
      }
      if (courseId) {
        // redirect to manage session 
        navigate(`/instructor/manage-courses/${courseId}/manage-sessions`);
      } else {
        // redirect to manage all session 
        navigate(`/instructor/manage-all-sessions`);
      }
    } else {
      // create session component for manga sessions and manage all sessions
      try {
        // manage course -> manage session
        if (courseId) {
          setCourseIdUpdate(courseId);
        } else {
          setCourseIdUpdate(values.course_id)
        }
        await axiosInstance.post(`${API_CREATE_SESSION}`, {
          "name": values.name,
          "course_id": courseIdUpdate,
          "description": des,
          "position_order": 1
        });
        message.success("Create Session Successfully!")
        if (courseId) {
          // redirect to manage session 
          navigate(`/instructor/manage-courses/${courseId}/manage-sessions`);
        } else {
          // redirect to manage all session
          navigate(`/instructor/manage-all-sessions`);
        }
      } catch (error) {
        //
      }
    }

  };

  const handleChange = (value: string) => {
    console.log("check courseIdUpdate: ", value);
    setCourseIdUpdate(value);
  };

  const handleEditorChange = (value: string) => {
    setDes(value);
  };
  return (
    <div className="flex justify-center items-center h-full mt-10">
      {loading ? (
        <LoadingComponent />
      ) : (
        <div className="w-full max-w-6xl bg-white p-8 rounded shadow">
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
              <TinyMCEEditorComponent value={content} onEditorChange={handleEditorChange} />
            </Form.Item>

            {
              //  create and update session in manage all session
              !courseId &&
              <Form.Item label="Course name" name="course_id" rules={[{ required: true, message: 'Please input course!' }]}>
                <Select
                  defaultValue={"Choose course name"}
                  onChange={handleChange}
                  options={courses.map(course => (
                    {
                      value: course._id, label: course.name
                    }
                  ))
                  }
                />
              </Form.Item>
            }

            {
              // update session in manage session 
              courseId && sessionId &&
              <Form.Item label="Course name" name="course_id" rules={[{ required: true, message: 'Please input course!' }]}>
                <Select
                  defaultValue={"Choose course name"}
                  onChange={handleChange}
                  options={courses.map(course => (
                    {
                      value: course._id, label: course.name
                    }
                  ))
                  }
                />
              </Form.Item>
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
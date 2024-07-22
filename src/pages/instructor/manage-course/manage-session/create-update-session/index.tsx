import { useEffect, useState } from "react";
import { Button, Form, Input, Breadcrumb, Select, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from '@tinymce/tinymce-react';
import { HomeOutlined } from "@ant-design/icons";
import { Course, Session } from "../../../../../models";
import { User } from "../../../../../models/User";
import { API_CREATE_SESSION, API_GET_COURSES, API_GET_SESSION, API_UPDATE_SESSION } from "../../../../../consts";
import axiosInstance from "../../../../../services/axiosInstance.ts";

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
  //value of tinymce (field: description)
  const [value, setValue] = useState<string>('Enter something here');
  useEffect(() => {
    const userString = localStorage.getItem("user");
    const user: User = userString ? JSON.parse(userString) : null;
    setUserId(user?._id);
    setRole(user?.role);
  }, []);

  useEffect(() => {
    // update session
    if (sessionId) {
      const fetchSession = async () => {
        try {
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
          setValue(data.description);
          // if instructor don't update new course , program will use old data
          setCourseIdUpdate(data.course_id)
        } catch (error) {
          //
        } finally {
          setLoading(false);
        }
      };
      fetchSession();
    } else {
      setLoading(false);
    }

  }, [courseId, form, sessionId]);
  //Fetch course
  useEffect(() => {
    const fetchCourses = async () => {
      try {
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
        if (res.data) {
          console.log("courses: ", res.data.pageData);

          setCourses(res.data.pageData);
        }
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setLoading(false)
      }
    };
    fetchCourses();
  }, [userId, role])

  const onFinish = async (values: Session) => {
    values.description = value;
    // setLoading(true);
    console.log("check values: ", values);
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
        <div>Loading ...</div>
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
              <Editor
                apiKey="oppz09dr2j6na1m8aw9ihopacggkqdg19jphtdksvl25ol4k"
                init={{
                  placeholder: "Description",

                  height: 200,
                  menubar: true,
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen textcolor ",
                    "insertdatetime media table paste code help wordcount",
                  ],
                  textcolor_rows: "4",

                  toolbar:
                    "undo redo | styleselect | fontsizeselect| code | bold italic | alignleft aligncenter alignright alignjustify | outdent indent ",
                }}
                onEditorChange={handleEditorChange}
              ></Editor>
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

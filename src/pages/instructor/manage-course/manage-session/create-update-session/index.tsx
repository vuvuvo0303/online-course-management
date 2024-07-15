import { useEffect, useState } from "react";
import { Button, Form, Input, Breadcrumb, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Editor } from '@tinymce/tinymce-react';
import { HomeOutlined } from "@ant-design/icons";
import { Course, Session } from "../../../../../models";
import { toast } from "react-toastify";
import { User } from "../../../../../models/User";
import { host_main } from "../../../../../consts";
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
  const token = localStorage.getItem("token")
  const { courseId, sessionId } = useParams<{ courseId: string; sessionId: string }>();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const [role, setRole] = useState<string>('');
  const [courseId2, setCourseId2] = useState<string>("");
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
            course_id: data.course_id
          });
          setValue(data.description);
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
          const res = await axiosInstance.post(`/api/course/search`,
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
            setCourses(res.data.pageData);
          }
        } catch (error) {
          console.log("Error: ", error);
        } finally {
          setLoading(false)
        }
      };
      fetchCourses();
    }
  }, [courseId, userId, role])

  const onFinish = async (values: Session) => {
    values.description = value;
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
          console.log("check value create session: ", values)
          await axiosInstance.post(`/api/session`, values);
          toast.success("Create Session Successfully!")
          navigate(`/instructor/manage-all-sessions`);
        } catch (error) {
          setLoading(false)
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
                apiKey="lt4vdqf8v4f2upughnh411hs6gbwhtw3iuz6pwzc9o3ddk7u"
                onEditorChange={(newValue) => setValue(newValue)}
                initialValue={value}
                init={{
                  directionality: 'ltr',
                  plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
                  toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                  tinycomments_mode: 'embedded',
                  tinycomments_author: 'Author name',
                  mergetags_list: [
                    { value: 'First.Name', title: 'First Name' },
                    { value: 'Email', title: 'Email' },
                  ],
                  ai_request: (respondWith: { string: (callback: () => Promise<string>) => void }) =>
                    respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                }}
              />
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

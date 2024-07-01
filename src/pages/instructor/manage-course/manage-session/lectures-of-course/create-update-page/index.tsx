import { useEffect, useState } from "react";
import { Button, Form, Input, DatePicker, Breadcrumb, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { Course, Lecture, Session } from "../../../../../../models";
import { HomeOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { User } from "../../../../../../models/User";

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

const CreateLecture = () => {
  const { lectureId, courseId, sessionId } = useParams<{ lectureId: string; courseId: string, sessionId: string }>();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const [courseId2, setCourseId2] = useState<string>("");
  const [sessionId2, setSessionId2] = useState<string>("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    const userString = localStorage.getItem("user");
    const user: User = userString ? JSON.parse(userString) : null;
    setUserId(user?._id);
    console.log("check userId: ", userId);
  }, []);

  useEffect(() => {
    if (courseId && sessionId) {
      setCourseId2(courseId);
      setSessionId2(sessionId);
    }
    if (lectureId) {
      const fetchData = async () => {
        try {
          const res = await axios.get(`https://665fbf245425580055b0b23d.mockapi.io/lectures/${lectureId}`);
          const data = res.data;
          form.setFieldsValue({
            title: data.title,
            description: data.description,
            videoUrl: data.videoUrl,
            updatedDate: moment(),
            courseId: data.courseId,
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else {
      form.setFieldsValue({
        createdDate: moment(),
      });
      setLoading(false);
    }
  }, [lectureId, courseId, form, sessionId]);

  const handleCourseChange = async (value: string) => {
    console.log(`selected course ${value}`);
    setCourseId2(value);
    setSessionId2(""); // Reset sessionId when a new courseId is selected

    try {
      const res = await axios.get<Session[]>(`https://665fbf245425580055b0b23d.mockapi.io/session`);
      if (res.data) {
        console.log("check courseId2:", value);
        setSessions(res.data.filter(session => session.userId === userId && session.courseId === value));
      }
    } catch (error) {
      console.log("error: " + error);
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get<Course[]>("https://665fbf245425580055b0b23d.mockapi.io/courses")
        if (res) {
          setCourses(res.data.filter(course => course.userId === userId));
        }
      } catch (error) {
        console.log("error: " + error);
      }
    };
    fetchCourses();
  }, [userId])

  const onFinish = async (values: Lecture) => {
    setLoading(true);
    try {
      if (lectureId) {
        await axios.put(`https://665fbf245425580055b0b23d.mockapi.io/lectures/${lectureId}`, values);
        toast.success("Update Lecture Successfully!")
      } else {
        await axios.post(`https://665fbf245425580055b0b23d.mockapi.io/lectures`, { ...values, courseId: courseId2, sessionId: sessionId2 });
        toast.success("Create Lecture Successfully!")
      }
      navigate(`/instructor/manage-courses/${courseId2}/manage-sessions/${sessionId2}/manage-lectures`);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-full mt-10">
      {loading ? (
        <div>Loading ...</div>
      ) : (
        <div className="w-full max-w-2xl bg-white p-8 rounded shadow">
          {
            courseId && sessionId ? (
              <Breadcrumb className="py-2">
                <Breadcrumb.Item href="/dashboard">
                  <HomeOutlined />
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/instructor/manage-courses">Manage Courses</Breadcrumb.Item>
                <Breadcrumb.Item href={`/instructor/manage-courses/${courseId}/manage-sessions`}>Manage Sessions</Breadcrumb.Item>
                <Breadcrumb.Item href={`/instructor/manage-courses/${courseId}/manage-sessions/${sessionId}/manage-lectures`}>Manage Lectures</Breadcrumb.Item>
                <Breadcrumb.Item>{lectureId ? "Update Lecture" : "Create Lecture"}</Breadcrumb.Item>
              </Breadcrumb>
            ) : (
              <Breadcrumb className="py-2">
                <Breadcrumb.Item href="/dashboard">
                  <HomeOutlined />
                </Breadcrumb.Item>
                <Breadcrumb.Item href={`/instructor/manage-all-lectures`}>Manage All Lectures</Breadcrumb.Item>
                <Breadcrumb.Item>{lectureId ? "Update Lecture" : "Create Lecture"}</Breadcrumb.Item>
              </Breadcrumb>
            )
          }
          <h1 className="text-center mb-8">{lectureId ? "Update Lecture" : "Create Lecture"}</h1>
          <Form onFinish={onFinish} form={form} {...formItemLayout} initialValues={{}}>
            <Form.Item label="Title" name="title" rules={[{ required: true, message: "Please input title!" }]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Please input description!" }]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item
              label="Video URL"
              name="videoUrl"
              rules={[{ required: true, message: "Please input video URL!" }]}
            >
              <Input />
            </Form.Item>

            {!lectureId && (
              <Form.Item
                label="Created Date"
                name="createdDate"
                rules={[{ required: true, message: "Please select created date!" }]}
              >
                <DatePicker defaultValue={moment()} disabled />
              </Form.Item>
            )}

            {lectureId && (
              <Form.Item
                label="Updated Date"
                name="updatedDate"
                rules={[{ required: true, message: "Please select updated date!" }]}
              >
                <DatePicker defaultValue={moment()} disabled />
              </Form.Item>
            )}

            <Form.Item hidden label="Course Id" name="courseId" initialValue={courseId2}>
              <Input />
            </Form.Item>

            {
              !courseId && (
                <Form.Item label="Course Id" name="courseId" rules={[{ required: true, message: 'Please input course!' }]}>
                  <Select
                    onChange={handleCourseChange}
                    options={courses.map(course => (
                      {
                        value: course.courseId, label: course.title
                      }
                    ))
                    }
                  />
                </Form.Item>
              )
            }
            {
              <Form.Item label="Session Id" name="sessionId" rules={[{ required: true, message: 'Please input session!' }]}>
                <Select
                  disabled={!courseId2}
                  onChange={setSessionId2}
                  options={sessions.map(session => (
                    {
                      value: session.sessionId, label: session.title
                    }
                  ))
                  }
                />
              </Form.Item>
            }
            {
              courseId2 && (
                <Form.Item hidden label="Course Id" name="courseId" initialValue={courseId2}>
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

export default CreateLecture;

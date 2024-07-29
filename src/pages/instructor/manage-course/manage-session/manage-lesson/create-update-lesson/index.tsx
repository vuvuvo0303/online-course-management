import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Breadcrumb,
  Select,
  message,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { Course, Lessons, Session } from "../../../../../../models/index.ts";
import { HomeOutlined } from "@ant-design/icons";
import { axiosInstance, getUserFromLocalStorage } from "../../../../../../services";
import {
  API_CREATE_LESSON,
  API_GET_COURSES,
  API_GET_LESSON,
  API_GET_SESSION,
  API_GET_SESSIONS,
  API_UPDATE_LESSON,
  paths,
} from "../../../../../../consts";
import TinyMCEEditorComponent from "../../../../../../components/tinyMCE";
import { formItemLayout } from "../../../../../../layout/form";
import LoadingComponent from "../../../../../../components/loading";
const CreateUpdateLesson: React.FC = () => {
  const { lectureId, courseId, sessionId } = useParams<{ lectureId: string; courseId: string; sessionId: string }>();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [session, setSession] = useState<Session | null>();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [course_id, setCourse_id] = useState<string>("");
  const [content, setContent] = useState<string>("Enter something here");
  const [des, setDes] = useState<string>("");
  useEffect(() => {
    const user = getUserFromLocalStorage();
    setUserId(user?._id);
  }, []);

  useEffect(() => {
    if (lectureId) {
      const fetchData = async () => {
        const response = await axiosInstance.get(`${API_GET_LESSON}/${lectureId}`);
        const data = response.data;
        form.setFieldsValue({
          name: data.name,
          course_id: data.course_id,
          session_id: data.session_id,
          user_id: data.user_id,
          lesson_type: data.lesson_type,
          description: data.description,
          video_url: data.video_url,
          image_url: data.image_url,
          price: data.price,
          full_time: data.full_time,
          position_order: data.position_order,
        });
        setCourse_id(data.course_id);
        setContent(data.description);
        setLoading(false);
      };
      fetchData();
    }
  }, [lectureId, courseId, form, sessionId]);

  // fetch course to create or update session
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.post(API_GET_COURSES, {
          searchCondition: {
            keyword: "",
            category: "",
            status: "new",
            is_deleted: false,
          },
          pageInfo: {
            pageNum: 1,
            pageSize: 10,
          },
        });
        if (response.data) {
          setCourses(response.data.pageData);
        }
      } catch (error) {
        //
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [courseId, sessionId]);

  useEffect(() => {
    const fetchSessions = async () => {
      if (courseId && sessionId) {
        try {
          const response = await axiosInstance.get(`${API_GET_SESSION}/${sessionId}`);
          if (response) {
            setSession(response.data);
          }
        } catch (error) {
          //
        } finally {
          setLoading(false);
        }
      } else {
        if (course_id) {
          try {
            const response = await axiosInstance.post(API_GET_SESSIONS, {
              searchCondition: {
                keyword: "",
                course_id: course_id,
                is_position_order: false,
                is_deleted: false,
              },
              pageInfo: {
                pageNum: 1,
                pageSize: 10,
              },
            });
            if (response) {
              setSessions(response.data.pageData);
            }
          } catch (error) {
            //
          } finally {
            setLoading(false);
          }
        }
      }
    };
    fetchSessions();
  }, [sessionId, courseId, course_id]);
  const handleEditorChange = (value: string) => {
    setDes(value);
  };
  const onFinish = async (values: Lessons) => {
    if (typeof values.full_time === "string") {
      values.full_time = parseFloat(values.full_time);
    }
    if (typeof values.position_order === "string") {
      values.position_order = parseFloat(values.position_order);
    }
    if (!des) {
      //if instructor don't change description
      values.description = content;
    } else {
      values.description = des;
    }
    setLoading(true);
    try {
      //Update lesson
      if (lectureId) {
        await axiosInstance.put(`${API_UPDATE_LESSON}/${lectureId}`, values);
        message.success("Update Lesson Successfully!");
      }
      //create lesson
      else {
        await axiosInstance.post(API_CREATE_LESSON, values);
        message.success("Create Lecture Successfully!");
      }
      if (sessionId && courseId) {
        navigate(`/instructor/manage-courses/${courseId}/manage-sessions/${sessionId}/manage-lessons`);
      } else {
        navigate(`/instructor/manage-all-lessons`);
      }
    } catch (error) {
      //
    } finally {
      setLoading(false);
    }
  };
  const handleChangeCourseId = (value: string) => {
    setCourse_id(value);
  };

  return (
    <div className="flex justify-center items-center  h-full mt-10">
      {loading ? (
        <LoadingComponent />
      ) : (
        <div className="w-full max-w-7xl bg-white  p-8 rounded shadow">
          {courseId && sessionId != undefined ? (
            <Breadcrumb className="py-2">
              <Breadcrumb.Item href={paths.INSTRUCTOR_DASHBOARD}>
                <HomeOutlined />
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/instructor/manage-courses">Manage Courses</Breadcrumb.Item>
              <Breadcrumb.Item href={`/instructor/manage-courses/${courseId}/manage-sessions`}>
                Manage Sessions
              </Breadcrumb.Item>
              <Breadcrumb.Item
                href={`/instructor/manage-courses/${courseId}/manage-sessions/${sessionId}/manage-lectures`}
              >
                Manage Lectures
              </Breadcrumb.Item>
              <Breadcrumb.Item>{lectureId ? "Update Lesson" : "Create Lesson"}</Breadcrumb.Item>
            </Breadcrumb>
          ) : (
            <Breadcrumb className="py-2">
              <Breadcrumb.Item href={paths.INSTRUCTOR_DASHBOARD}>
                <HomeOutlined />
              </Breadcrumb.Item>
              <Breadcrumb.Item href={`/instructor/manage-all-lectures`}>Manage All Lessons</Breadcrumb.Item>
              <Breadcrumb.Item>{lectureId ? "Update Lesson" : "Create Lesson"}</Breadcrumb.Item>
            </Breadcrumb>
          )}
          <h1 className="text-center mb-8">{lectureId ? "Update Lesson" : "Create Lesson"}</h1>
          <Form onFinish={onFinish} form={form} {...formItemLayout} initialValues={{}}>
            <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please input name!" }]}>
              <Input />
            </Form.Item>

            {sessionId && courseId && (
              <Form.Item label="Course Name" name="course_id" hidden initialValue={courseId}>
                <Input defaultValue={courseId} disabled />
              </Form.Item>
            )}
            {/* if there is no sessionId and courseId */}
            {!sessionId && !courseId && (
              <Form.Item
                label="Course Name"
                name="course_id"
                rules={[{ required: true, message: "Please input name!" }]}
              >
                <Select
                  // Save course_id to use to call the session api
                  onChange={handleChangeCourseId}
                  defaultValue="Choose course for this lecture"
                  options={courses.map((course) => ({
                    label: course.name,
                    value: course._id,
                  }))}
                />
              </Form.Item>
            )}

            {/* manage course -> manage sessions -> manage lessons */}
            {sessionId && courseId && (
              <Form.Item initialValue={sessionId} label="Session Name" name="session_id" hidden>
                <Input defaultValue={session?._id} disabled />
              </Form.Item>
            )}

            {/* if there is no sessionId and courseId */}
            {!sessionId && !courseId && (
              <Form.Item
                label="Session Name"
                name="session_id"
                rules={[{ required: true, message: "Please session name!" }]}
              >
                <Select

                  defaultValue="Choose session for this lecture"
                  options={sessions.map((session) => ({
                    label: session.name,
                    value: session._id,
                  }))}
                />
              </Form.Item>
            )}
            <Form.Item hidden label="User Id" name="user_id" initialValue={userId}>
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="Lesson Type"
              name="lesson_type"
            >
              <Select
                defaultValue="video"
                options={[
                  {
                    options: [
                      { label: "video", value: "video" },
                      { label: "text", value: "text" },
                      { label: "image", value: "image" },
                    ],
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
            >
              <TinyMCEEditorComponent value={content} onEditorChange={handleEditorChange} />
            </Form.Item>


            <Form.Item
              label="Video URL"
              name="video_url"
              rules={[{ required: true, message: "Please input video URL!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Image URL" name="image_url">
              <Input />
            </Form.Item>
            <Form.Item
              label="full_time"
              name="full_time"
              rules={[{ required: true, message: "Please input a number!" }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="position_order"
              name="position_order"
              rules={[{ required: true, message: "Please input a number!" }]}
            >
              <Input type="number" />
            </Form.Item>
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
export default CreateUpdateLesson;
import { useEffect, useState } from "react";
import { Button, Form, Input, Select, Spin, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { Course, Lessons, Session } from "../../../../../../models/index.ts";
import { axiosInstance, getUserFromLocalStorage } from "../../../../../../services";
import {
  API_CREATE_LESSON,
  API_GET_COURSES,
  API_GET_LESSON,
  API_GET_SESSION,
  API_GET_SESSIONS,
  API_UPDATE_LESSON,
} from "../../../../../../consts";
import { formItemLayout } from "../../../../../../layout/form";
import LoadingComponent from "../../../../../../components/loading";
import CustomBreadcrumb from "../../../../../../components/breadcrumb/index.tsx";

import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { getBase64, uploadFile } from "../../../../../../utils/uploadHelper/index.ts";
import TextArea from "antd/es/input/TextArea";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

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
  // const [content, setContent] = useState<string>("Enter something here");
  // const [des, setDes] = useState<string>("");
  const [lessonType, setLessonType] = useState<string>("video");
  useEffect(() => {
    const user = getUserFromLocalStorage();
    setUserId(user?._id);
  }, []);

  useEffect(() => {
    if (lectureId) {
      const fetchData = async () => {
        setLoading(true);
        try {
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
          // setContent(data.content);
          setLessonType(data.lesson_type);
          if (data.image_url) {
            setFileList([
              {
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: data.image_url,
              },
            ]);
          }
        } catch (error) {
          message.error("Failed to fetch lesson data.");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [lectureId, form]);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.post(API_GET_COURSES, {
          searchCondition: {
            keyword: "",
            category: "",
            status: "",
            is_deleted: false,
          },
          pageInfo: {
            pageNum: 1,
            pageSize: 100,
          },
        });
        if (response.data) {
          console.log("response: ", response)
          setCourses(
            response.data.pageData.filter((course: Course) => course.session_count > 0)
          );
        }
      } catch (error) {
        message.error("Failed to fetch courses.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        if (courseId && sessionId) {
          const response = await axiosInstance.get(`${API_GET_SESSION}/${sessionId}`);
          setSession(response.data);
        } else if (course_id) {
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
          setSessions(response.data.pageData);
        }
      } catch (error) {
        message.error("Failed to fetch sessions.");
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, [sessionId, course_id]);



  const onFinish = async (values: Lessons) => {
    console.log("values: ", values);
    if (typeof values.full_time === "string") {
      values.full_time = parseFloat(values.full_time);
    }
    if (typeof values.position_order === "string") {
      values.position_order = parseFloat(values.position_order);
    }
    values.image_url = values.image_url ?? "";
    // values.description = content;

    let imageUrl: string = "";
    if (fileList.length > 0) {
      const file = fileList[0];
      if (file.originFileObj) {
        imageUrl = await uploadFile(file.originFileObj as File);
      }
    }

    values.image_url = imageUrl || values.image_url;
    if (values.image_url === undefined) {
      values.image_url === ""
    }
    setLoading(true);
    try {
      if (lectureId) {
        try {
          const res = await axiosInstance.put(`${API_UPDATE_LESSON}/${lectureId}`, values);
          if (res) {
            message.success("Update Lesson Successfully!");
          }
        } catch (error) {
          console.log("error: ", error);
        }
      } else {
        try {
          const res = await axiosInstance.post(API_CREATE_LESSON, values);
          if (res) {
            message.success("Create Lesson Successfully!");
          }
        } catch (error) {
          console.log("error: ", error);
        }
      }
      if (sessionId && courseId) {
        navigate(`/instructor/manage-courses/${courseId}/manage-sessions/${sessionId}/manage-lessons`);
      } else {
        navigate(`/instructor/manage-all-lessons`);
      }
    } catch (error) {
      message.error("Failed to save the lesson.");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeCourseId = (value: string) => {
    setCourse_id(value);
  };
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([

  ]);
  if (loading) {
    return <LoadingComponent />;
  }
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  return (
    <div className="flex justify-center items-center h-full mt-10">
      {loading ? (
        <LoadingComponent />
      ) : (
        <div className="w-full max-w-7xl bg-white p-8 rounded shadow">
          <CustomBreadcrumb />
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

            {!sessionId && !courseId && (
              <Form.Item
                label="Course Name"
                name="course_id"
                rules={[{ required: true, message: "Please select course name!" }]}
              >
                <Select
                  onChange={handleChangeCourseId}
                  notFoundContent={loading ? <Spin size="small" /> : null}
                  defaultValue="Select course for this lesson"
                  options={courses.map((course) => ({
                    label: course.name,
                    value: course._id,
                  }))}
                />
              </Form.Item>
            )}

            {sessionId && courseId && (
              <Form.Item initialValue={sessionId} label="Session Name" name="session_id" hidden>
                <Input defaultValue={session?._id} disabled />
              </Form.Item>
            )}

            {!sessionId && !courseId && (
              <Form.Item
                label="Session Name"
                name="session_id"
                rules={[{ required: true, message: "Please select session name!" }]}
              >
                <Select
                  notFoundContent={loading ? <Spin size="small" /> : null}
                  defaultValue="Please select course before select session"
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

            <Form.Item label="Lesson Type" name="lesson_type">
              <Select
                onChange={setLessonType}
                defaultValue="video"
                options={[
                  { label: "video", value: "video" },
                  { label: "text", value: "text" },
                  { label: "image", value: "image" },
                ]}
              />
            </Form.Item>

            <Form.Item label="Description" name="description"
              rules={lessonType === "text" ? [{ required: true, message: "Please input description!" }] : []}
            >
              <TextArea />
            </Form.Item>

            <Form.Item
              label="Video"
              name="video_url"
              rules={[{ required: true, message: "Please input Video URL!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Image " name="image_url"
              rules={lessonType === "image" ? [{ required: true, message: "Please input Image URL!" }] : []}
            >
              <Upload
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
            </Form.Item>

            <Form.Item
              label="Full Time"
              name="full_time"
              rules={[{ required: true, message: "Please input a number!" }]}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item
              label="Position Order"
              name="position_order"
              rules={[{ required: true, message: "Please input a number!" }]}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 24, offset: 6 }}>
              <Button className="float-right" type="primary" htmlType="submit" loading={loading}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
};

export default CreateUpdateLesson;

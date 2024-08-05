import { useEffect, useState } from "react";
import { Form, Input, Select, Spin, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { Course, Lessons, Session } from "../../../../../../models";
import { axiosInstance, getCourses, getUserFromLocalStorage } from "../../../../../../services";
import {
  API_CREATE_LESSON,
  API_GET_LESSON,
  API_GET_SESSION,
  API_GET_SESSIONS,
  API_UPDATE_LESSON,
} from "../../../../../../consts";
import { formItemLayout } from "../../../../../../layout/form";
import { LoadingComponent, CustomBreadcrumb, NumberFormItem, ButtonFormItem } from "../../../../../../components";

import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { getBase64, uploadFile } from "../../../../../../utils/uploadHelper/index.ts";


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
  const [content, setContent] = useState<string>("Enter something here");
  // const [des, setDes] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");

  const isValidHttpUrl = (string: string): boolean => {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  };
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
          setContent(data.description);
          setVideoUrl(data.video_url);
          if (data.image_url) {
            setFileList([
              {
                uid: "-1",
                name: "image.png",
                status: "done",
                url: data.image_url,
              },
            ]);
          }
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
        const responseCourses = await getCourses("", "", "");
        if (responseCourses.data) {

          setCourses(responseCourses.data.pageData.filter((course: Course) => course.session_count > 0));
        }
        console.log("a: ", courses)
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
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, [sessionId, course_id]);

  const onFinish = async (values: Lessons) => {
    if (typeof values.full_time === "string") {
      values.full_time = parseFloat(values.full_time);
    }
    if (typeof values.position_order === "string") {
      values.position_order = parseFloat(values.position_order);
    }
    values.description = content;

    let imageUrl: string = "";

    if (fileList.length > 0) {
      const file = fileList[0];
      if (file.originFileObj) {
        imageUrl = await uploadFile(file.originFileObj as File);
      }
    }

    values.image_url = imageUrl || values.image_url;

    setLoading(true);
    try {
      if (lectureId) {
        await axiosInstance.put(`${API_UPDATE_LESSON}/${lectureId}`, values);
        message.success("Update Lesson Successfully!");
      } else {
        await axiosInstance.post(API_CREATE_LESSON, values);
        message.success("Create Lecture Successfully!");
      }
      if (sessionId && courseId) {
        navigate(`/instructor/manage-courses/${courseId}/manage-sessions/${sessionId}/manage-lessons`);
      } else {
        navigate(`/instructor/manage-all-lessons`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChangeCourseId = (value: string) => {
    setCourse_id(value);
  };
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

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

  const handleSetVideoUrl = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setVideoUrl(e.target.value);
  };
  
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
                rules={[{ required: true, message: "Please input name!" }]}
              >
                <Select
                  onChange={handleChangeCourseId}
                  notFoundContent={loading ? <Spin size="small" /> : null}
                  defaultValue="Choose course for this lesson"
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
                rules={[{ required: true, message: "Please session name!" }]}
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
                defaultValue="video"
                options={[
                  { label: "video", value: "video" },
                  { label: "text", value: "text" },
                  { label: "image", value: "image" },
                ]}
              />
            </Form.Item>

            <Form.Item label="Description" name="description">
              <Input.TextArea />
            </Form.Item>

            <Form.Item
              label="Video URL"
              name="video_url"
              rules={[{ required: true, message: "Please input video URL!" }]}
            >
              <Input onChange={handleSetVideoUrl} />
            </Form.Item>

            {isValidHttpUrl(videoUrl) && (
              <div className="flex justify-end mb-5">
                <iframe
                  width="400"
                  height="200"
                  src={videoUrl}
                  title="Video preview"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            <Form.Item label="Image URL" name="image_url">
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

            <NumberFormItem label="Full Time" name="full_time" requiredMessage="Please input a number for time!" />
            <NumberFormItem label="Position Order" name="position_order" requiredMessage="Please input a number for postition order!" />

            <ButtonFormItem loading={loading} buttonText="Submit" htmlType="submit" />
          </Form>
        </div>
      )}
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
};

export default CreateUpdateLesson;

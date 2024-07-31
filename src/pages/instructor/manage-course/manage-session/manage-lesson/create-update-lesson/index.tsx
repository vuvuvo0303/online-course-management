import { useEffect, useState } from "react";
import { Button, Form, Image, Input, Select, Upload, message } from "antd";
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
import TinyMCEEditorComponent from "../../../../../../components/tinyMCE";
import { formItemLayout } from "../../../../../../layout/form";
import LoadingComponent from "../../../../../../components/loading";
import CustomBreadcrumb from "../../../../../../components/breadcrumb/index.tsx";

import { PlusOutlined } from '@ant-design/icons';

import type { GetProp, UploadFile, UploadProps } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

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
  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([
    
    ]);
  
    const handlePreview = async (file: UploadFile) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj as FileType);
      }
  
      setPreviewImage(file.url || (file.preview as string));
      setPreviewOpen(true);
    };
  
    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
      setFileList(newFileList);
  
    const uploadButton = (
      <button style={{ border: 0, background: 'none' }} type="button">
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </button>
    );  
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
    try{
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
          {courseId && sessionId != undefined ? <CustomBreadcrumb /> : <CustomBreadcrumb />}
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
            <Form.Item label="Lesson Type" name="lesson_type">
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
            <Form.Item label="Description" name="description">
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
              <Upload
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
            </Form.Item>
            <Form.Item
              label="full_time"
              name="Full Time"
              rules={[{ required: true, message: "Please input a number!" }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="position_order"
              name="Position Order"
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

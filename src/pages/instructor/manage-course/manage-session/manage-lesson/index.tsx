import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Image,
  Input,
  message,
  Modal,
  Pagination,
  Select,
  Table,
  TablePaginationConfig,
  TableProps,
  Tag,
} from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Course, Session } from "../../../../../models/index.ts";
import { axiosInstance, getCourses } from "../../../../../services/";
import { useDebounce } from "../../../../../hooks";
import {
  API_GET_LESSONS,
  API_DELETE_LESSON,
  API_GET_SESSIONS,
  getColorLessonType,
} from "../../../../../consts";
import { Lessons } from "../../../../../models";
import { LoadingComponent, CustomBreadcrumb } from "../../../../../components";
import { PaginationProps } from "antd/lib/index";
import { formatDate } from "../../../../../utils";
const LectureOfCourse: React.FC = () => {
  const [data, setData] = useState<Lessons[]>([]);
  const { courseId, sessionId } = useParams<{ courseId: string; sessionId: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("");
  const [selectedLectureId, setSelectedLectureId] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const [session_id, setSession_id] = useState<string>("");
  const [lessonType, setLessonTpe] = useState<string>("");
  const [sessions, setSessions] = useState<Session[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [course_id, setCourse_id] = useState<string>("");
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const debouncedSearchTerm = useDebounce(keyword, 300);

  const showModal = (lectureId: string, name: string) => {
    setModalText(`Do you want to delete this lecture with name is "${name}"`);
    setSelectedLectureId(lectureId);
    setOpen(true);
  };

  const handleOk = async () => {
    if (selectedLectureId) {
      setModalText("Deleting...");
      setConfirmLoading(true);
      try {
        await handleDelete(selectedLectureId);
      } catch (error) {
        setModalText("Error occurred: " + error);
        message.success("Delete Lecture Failed!");
      } finally {
        setTimeout(() => {
          setOpen(false);
          setConfirmLoading(false);
        }, 300);
      }
    } else {
      setOpen(false);
    }
  };

  const handleDelete = async (lectureId: string) => {
    await axiosInstance.delete(`${API_DELETE_LESSON}/${lectureId}`);
    setData(data.filter((lecture) => lecture._id !== lectureId));
    message.success("Delete Lecture Successfully!");
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const fetchSession = async () => {
    try {
      const response = await axiosInstance.post(API_GET_SESSIONS, {
        searchCondition: {
          keyword: "",
          course_id: course_id,
          session_id: "",
          lesson_type: "",
          is_position_order: false,
          is_deleted: false,
        },
        pageInfo: {
          pageNum: 1,
          pageSize: 100,
        },
      });
      if (response) {
        setSessions(response.data.pageData);
      }
    } catch (error) {
      //
    }
  };

  const fetchCourses = async () => {
    try {
      const responseCourses = await getCourses();
      if (responseCourses) {
        setCourses(responseCourses.data.pageData);
      }
    } catch (error) {
      //
    }
  };
  useEffect(() => {
    fetchCourses();
    fetchSession();
  }, [course_id]);

  //fetch lecture
  useEffect(() => {
    if (courseId && sessionId) {
      const fetchLecture = async () => {
        try {
          const response = await axiosInstance.post(API_GET_LESSONS, {
            searchCondition: {
              keyword: debouncedSearchTerm,
              course_id: courseId,
              session_id: sessionId,
              lesson_type: lessonType,
              is_position_order: false,
              is_deleted: false,
            },
            pageInfo: {
              pageNum: 1,
              pageSize: 100,
            },
          });
          if (response) {
            setData(response.data.pageData);
            setPagination({
              ...pagination,
              total: response.data.pageInfo.totalItems,
              current: response.data.pageInfo.pageNum,
              pageSize: response.data.pageInfo.pageSize,
            });
          }
        } catch (error) {
          //
        } finally {
          setLoading(false);
        }
      };
      fetchLecture();
    } else {
      //Manage all lecture
      const fetchLecture = async () => {
        try {
          //const response = await getLessons(debouncedSearchTerm, course_id, session_id, lessonType, 1, 100);
          const response = await axiosInstance.post(API_GET_LESSONS, {
            searchCondition: {
              keyword: debouncedSearchTerm,
              course_id: course_id,
              session_id: session_id,
              lesson_type: lessonType,
              is_position_order: false,
              is_deleted: false,
            },
            pageInfo: {
              pageNum: 1,
              pageSize: 100,
            },
          });
          console.log(response);
          if (response) {
            setData(response.data.pageData);
            setPagination({
              ...pagination,
              total: response.data.pageInfo.totalItems,
              current: response.data.pageInfo.pageNum,
              pageSize: response.data.pageInfo.pageSize,
            });
          }
        } catch (error) {
          //
        } finally {
          setLoading(false);
        }
      };
      fetchLecture();
    }
  }, [
    courseId,
    sessionId,
    keyword,
    session_id,
    course_id,
    debouncedSearchTerm,
    lessonType,
    pagination.pageSize,
    pagination.current,
  ]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const columns: TableProps["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 300,
    },
    {
      title: "Course Name",
      dataIndex: "course_name",
      key: "course_name",
      render: (course_name: string) => <div className="truncate">{course_name}</div>,
    },
    {
      title: "Session Name",
      dataIndex: "session_name",
      key: "session_name",
    },
    // {
    //     title: 'Video Url',
    //     dataIndex: 'video_url',
    //     key: 'video_url',
    //     render: (video_url: string) => (
    //         <>
    //             <iframe src={video_url} ></iframe>
    //         </>
    //     )
    // },
    //   {
    {
      title: "Image",
      dataIndex: "image_url",
      key: "image_url",
      render: (image_url: string) => <Image src={image_url} height={150} width={150} />,
    },
    {
      title: "Lesson type",
      dataIndex: "lesson_type",
      key: "lesson_type",
      render: (lesson_type) => (
        <>
          <Tag color={getColorLessonType(lesson_type)}>{lesson_type}</Tag>
        </>
      ),
    },
    {
      title: "Created Date ",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: Date) => formatDate(created_at),
    },
    {
      title: "Updated Date ",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (updated_at: Date) => formatDate(updated_at),
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (_id: string, record: Lessons) => (
        <>
          {courseId && sessionId ? (
            <Link
              to={`/instructor/manage-courses/${courseId}/manage-sessions/${sessionId}/manage-lessons/update-lesson/${_id}`}
            >
              <EditOutlined className="text-blue-500 m-2" />
            </Link>
          ) : (
            <Link to={`/instructor/manage-all-lectures/update-lecture/${_id}`}>
              <EditOutlined className="text-blue-500 m-2" />
            </Link>
          )}
          <DeleteOutlined className="text-red-500 m-2" onClick={() => showModal(_id, record.name)} />
        </>
      ),
    },
  ];

  const handleChange = (value: string) => {
    setSession_id(value);
  };

  const handleChangeLessonType = (value: string) => {
    setLessonTpe(value);
  };

  const handleCourseChange = (value: string) => {
    setCourse_id(value);
  };
  const handleTableChange = (pagination: PaginationProps) => {
    const newPagination: { current: number; pageSize: number; total: number } = {
      current: pagination.current ?? 1,
      pageSize: pagination.pageSize ?? 10,
      total: pagination.total ?? 0,
    };

    setPagination(newPagination);
  };

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPagination({ ...pagination, current: page, pageSize });
  };
  return (
    <div>
      <Modal title="Confirm Delete" open={open} onOk={handleOk} confirmLoading={confirmLoading} onCancel={handleCancel}>
        <p>{modalText}</p>
      </Modal>
      {loading ? (
        <div className="flex justify-center items-center h-full w-full">
          <LoadingComponent />
        </div>
      ) : (
        <div className="">
          {courseId && sessionId ? (
            <>
              <CustomBreadcrumb />
            </>
          ) : (
            <CustomBreadcrumb />
          )}
          <div className="flex justify-between gap-20">
            <div className="grid 2xl:grid-cols-4 lg:grid-cols-2 grid-cols-1 gap-20">
              {/* filter lesson by course */}
              {!courseId && (
                <Select
                  defaultValue="Choose course to filter"
                  style={{ width: 200 }}
                  className="mt-10"
                  onChange={handleCourseChange}
                  options={courses.map((course) => ({
                    label: course.name,
                    value: course._id,
                  }))}
                />
              )}
              {/* filter lesson by session */}
              {!sessionId && (
                <Select
                  defaultValue="Choose session to filter"
                  style={{ width: 200 }}
                  className="mt-10"
                  onChange={handleChange}
                  options={sessions.map((session) => ({
                    label: session.name,
                    value: session._id,
                  }))}
                />
              )}
              {/* filter lesson by lesson type */}
              <Select
                defaultValue="All Lesson Type"
                style={{ width: 200 }}
                className="mt-10"
                onChange={handleChangeLessonType}
                options={[
                  {
                    options: [
                      { label: <span>All</span>, value: "" },
                      { label: <span>video</span>, value: "video" },
                      { label: <span>text</span>, value: "text" },
                      { label: <span>image</span>, value: "image" },
                    ],
                  },
                ]}
              />
              <Input
                placeholder="Search"
                value={keyword}
                onChange={handleSearch}
                className="my-10"
                style={{ width: 200 }}
              />
            </div>
            <div>
              {courseId && sessionId ? (
                <Link
                  to={`/instructor/manage-courses/${courseId}/manage-sessions/${sessionId}/manage-lessons/create-lesson`}
                >
                  <Button type="primary" className="my-10 float-right">
                    Add New Lessons
                  </Button>
                </Link>
              ) : (
                <Link to={`/instructor/manage-all-lessons/create-lesson`}>
                  <Button type="primary" className="my-10 float-right">
                    Add New Lessons
                  </Button>
                </Link>
              )}
            </div>
          </div>

          <Table dataSource={data} columns={columns} rowKey="_id" pagination={false} onChange={handleTableChange} />
          <div className="flex justify-end py-8">
            <Pagination
              total={pagination.total}
              showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
              current={pagination.current}
              pageSize={pagination.pageSize}
              onChange={handlePaginationChange}
              showSizeChanger
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LectureOfCourse;

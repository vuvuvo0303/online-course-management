import { ArrowRightOutlined, EditOutlined, PlayCircleOutlined, SearchOutlined } from "@ant-design/icons";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Empty,
  Form,
  Image,
  Input,
  message,
  Modal,
  Pagination,
  Select,
  Space,
  Table,
  TableColumnsType,
  TablePaginationConfig,
  TableProps,
  Tag,
} from "antd";
import { getColor } from "../../../consts";
import { Course, Log } from "../../../models";
import { useDebounce } from "../../../hooks";
import { CustomBreadcrumb, LoadingComponent } from "../../../components";
import { changeStatusCourse, getCourseLogs, getCourses } from "../../../services";
import { formatCurrency, formatDate, renderCourseStatus } from "../../../utils";
const AdminManageCourses: React.FC = () => {
  const [openChangeStatus, setOpenChangeStatus] = useState(false);
  const [changeStatus, setChangeStatus] = useState<string>("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseId, setCourseId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [keywordLogStatus, setKeywordLogStatus] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>("All Categories");
  const [selectedStatus, setSelectedStatus] = useState<string>("All Status");
  const [comment, setComment] = useState<string>("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [openLogStatus, setOpenLogStatus] = useState(false);
  const [newStatus, setNewStatus] = useState<string>("");
  const [oldStatus, setOldStatus] = useState<string>("");
  const [logs, setLogs] = useState<Log[]>([]);
  const [logLoading, setLogLoading] = useState<boolean>(true);

  const [status, setStatus] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchText, 500);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const handleSaveComment = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };
  const fetchLog = async () => {
    setLogLoading(true);
    try {
      const responseLogs = await getCourseLogs(courseId, keywordLogStatus, oldStatus, newStatus, 1, 10);
      if (responseLogs) {
        setLogs(
          responseLogs.data.pageData.sort((a: { created_at: string }, b: { created_at: string }) => {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          })
        );
      }
    }
    finally {
      setLogLoading(false);
    }
  };
  useEffect(() => {
    if (courseId) {
      fetchLog();
    }
  }, [courseId, oldStatus, newStatus, keywordLogStatus, setLogLoading, setLogs]);
  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const responseCourses = await getCourses(
        debouncedSearchTerm,
        categoryId,
        status,
        false,
        pagination.current,
        pagination.pageSize
      );
  
      if (responseCourses.data) {
        // Sắp xếp khóa học theo ngày tạo (hoặc trường khác nếu bạn muốn)
        const sortedCourses = responseCourses.data.pageData
          ? responseCourses.data.pageData.sort((a: Course, b: Course) => {
              const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
              const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
              return dateB - dateA; // Sắp xếp giảm dần theo ngày tạo
            })
          : responseCourses.data;
  
        setCourses(sortedCourses);
        
        setPagination((prev) => ({
          ...prev,
          total: responseCourses.data.pageInfo?.totalItems || responseCourses.data.length,
          current: responseCourses.data.pageInfo?.pageNum || 1,
          pageSize: responseCourses.data.pageInfo?.pageSize || prev.pageSize,
        }));
      }
    } finally {
      setLoading(false);
    }

  
  }, [pagination.current, pagination.pageSize, searchText, status, debouncedSearchTerm,categoryId]);

  useEffect(() => {
    fetchCourses();
  }, [pagination.current, pagination.pageSize, status, searchText, debouncedSearchTerm,categoryId]);

  const handleSearch = () => {
    setPagination((prev) => ({
      ...prev,
      current: 1,
    }));
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
  };

  const handlePaginationChange = (page: number, pageSize?: number) => {
    setPagination((prev) => ({
      ...prev,
      current: page,
      pageSize: pageSize || 10,
    }));
  };
  const handleChangeStatus = async (value: string) => {
    setChangeStatus(value);
  };

  const showModalChangeStatus = (course_id: string) => {
    setOpenChangeStatus(true);
    setCourseId(course_id);
  };

  const handleOkChangeStatus = async () => {
    setLoading(true);
    if (!comment && changeStatus === "reject") {
      return message.error("Please enter comment");
    }
    try {
      await changeStatusCourse(courseId, changeStatus, comment);
      setCourses(courses.filter((course) => course._id !== courseId));
    } finally {
      setLoading(false);
    }
    setConfirmLoading(true);
    setOpenChangeStatus(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setOpenChangeStatus(false);
  };
  const columnsLogs: TableProps["columns"] = [
    {
      title: "Created Date ",
      dataIndex: "created_at",
      key: "created_at",
      defaultSortOrder: "descend",
      render: (created_at: Date) => formatDate(created_at),
    },
    {
      title: "Name",
      dataIndex: "course_name",
      key: "course_name",
      width: 200,
    },
    {
      title: "Old Status",
      dataIndex: "old_status",
      key: "old_status",
      render: (old_status: string) => (
        <>
          <div className="flex justify-between">
            <Tag color={getColor(old_status)}>{renderCourseStatus(old_status)}</Tag>
            <ArrowRightOutlined style={{ color: "purple" }} />
          </div>
        </>
      ),
    },

    {
      title: "New Status",
      dataIndex: "new_status",
      key: "new_status",
      render: (new_status: string) => (
        <>
          <Tag color={getColor(new_status)}>{renderCourseStatus(new_status)}</Tag>
        </>
      ),
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
      render: (comment: string) => (
        <>
          <div className="truncate">{comment === "" ? "" : comment}</div>
        </>
      ),
    },
  ];

  const columnsCourses: TableColumnsType<Course> = [
    {
      title: "Title",
      width: "50",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Button type="link" onClick={() => showModal(record)}>
          {text}
        </Button>
      ),
    },

    { title: "Category", dataIndex: "category_name", key: "category_name" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: Course) => (
        <>
          <div
            className="flex justify-between text-blue-500 cursor-pointer"
            onClick={() => showModalLogStatus(record._id)}
          >

          </div>
          <div>
            <Tag color={getColor(status)}>{renderCourseStatus(status)}</Tag>
            {status === "waiting_approve" ? (
              <EditOutlined onClick={() => showModalChangeStatus(record._id)} className="text-blue-500" />
            ) : (
              ""
            )}
          </div>
        </>
      ),
    },
    {
      title: "Created Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: Date) => formatDate(created_at),
    },
    {
      title: "Updated Date",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (updated_at: Date) => formatDate(updated_at),
    },
  ];

  if (loading) {
    return (<>
      <LoadingComponent />
    </>)
  }


  const showModal = (record: Course) => {
    setSelectedCourse(record);
    setIsModalVisible(true);
  };

  const uniqueCategoriesMap = new Map();
  courses.forEach((course) => {
    if (!uniqueCategoriesMap.has(course.category_name)) {
      uniqueCategoriesMap.set(course.category_name, {
        category_id: course.category_id,
        category_name: course.category_name,
      });
    }
  });
  const showModalLogStatus = async (course_id: string) => {
    setCourseId(course_id);

    setOpenLogStatus(true);
  };

  const uniqueCategories = Array.from(uniqueCategoriesMap.values());
  uniqueCategories.unshift({ category_id: "", category_name: "All Categories" });

  const handleCategoryChange = (categoryName: string) => {
    const category = uniqueCategories.find((c) => c.category_name === categoryName);
    const newCategoryId = category && category.category_name !== "All Categories" ? category.category_id : undefined;
    setCategoryId(newCategoryId);
    setSelectedCategoryName(categoryName);
    setPagination((prev) => ({
      ...prev,
      current: 1,
    }));
  };
  
  const handleStatusChange = (value: string) => {
    setStatus(value);
    setSelectedStatus(value || "All Status");
    setPagination((prev) => ({
      ...prev,
      current: 1,
    }));
  };

  const handleOkLogStatus = () => {
    setConfirmLoading(true);
    setOpenLogStatus(false);
    setConfirmLoading(false);
  };
  const handleChangeOldStatus = (value: string) => {
    setNewStatus("");
    setOldStatus(value);
  };
  const handleAllLog = () => {
    setOldStatus("");
    setNewStatus("");
  };
  const handleSearchLogStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeywordLogStatus(e.target.value);
  };
  const handleChangeNewStatus = (value: string) => {
    setOldStatus("");
    setNewStatus(value);
  };

  const statusOptions = [
    { label: <span>new</span>, value: "new" },
    { label: <span>waiting_approve</span>, value: "waiting_approve" },
    { label: <span>approve</span>, value: "approve" },
    { label: <span>reject</span>, value: "reject" },
    { label: <span>active</span>, value: "active" },
    { label: <span>inactive</span>, value: "inactive" },
  ];
  const handleSearchText= (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  return (
    <div className="container mx-auto p-4">
      <Modal
        width={1200}
        title="Log Status"
        open={openLogStatus}
        onOk={handleOkLogStatus}
        confirmLoading={confirmLoading}
        footer={null}
        onCancel={() => setOpenLogStatus(false)}
      >
        <div>
          {/* Filter all log  */}

          <Button onClick={handleAllLog} type="primary">
            All log
          </Button>
          <Input
            placeholder="Search"
            value={keywordLogStatus}
            onChange={handleSearchLogStatus}
            className="m-5"
            style={{ width: 200 }}
          />
          {/* Filter log by old status */}
          <Select
            defaultValue="Filter by old status"
            style={{ width: 200 }}
            className="m-5"
            onChange={handleChangeOldStatus}
            options={[{ statusOptions }]}
          />
          {/* Filter log by new status */}
          <Select
            defaultValue="Filter by new status"
            style={{ width: 200 }}
            className="m-5"
            onChange={handleChangeNewStatus}
            options={[{ statusOptions }]}
          />
          <div>
            {logLoading === false ? (
              logs && logs.length > 0 ? (
                <Table rowKey={(record: Log) => record._id} columns={columnsLogs} dataSource={logs} />
              ) : (
                <div>
                  <Empty />
                </div>
              )
            ) : (
              <div className="text-center">Loading ...</div>
            )}
          </div>
          <div className="flex justify-end ">
            <Button type="primary" danger onClick={() => setOpenLogStatus(false)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
      {/* Modal Change Status */}
      <Modal
        title="Change Status"
        open={openChangeStatus}
        onOk={handleOkChangeStatus}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div className="text-center">
          <p>Status: </p>
          <Select
            defaultValue="waiting_approve"
            style={{ width: 200 }}
            className="my-5"
            onChange={handleChangeStatus}
            options={[
              {
                options: [
                  { label: <span>approve</span>, value: "approve" },
                  { label: <span>reject</span>, value: "reject" },
                ],
              },
            ]}
          />
        </div>
        <Form.Item label="Comment" name="comment">
          <Input.TextArea value={comment} onChange={handleSaveComment} />
        </Form.Item>
      </Modal>

      {/* Modal Course Details */}
      <Modal
        title={
          <span className="text-2xl font-bold flex justify-center text-amber-700">
            {selectedCourse ? selectedCourse.name : ""}
          </span>
        }
        open={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
      >
        {selectedCourse && (
          <div className="flex flex-col gap-2">
            <div>
              <span className="text-base font-bold">Course's Instructor: </span>
              {selectedCourse.instructor_name}
            </div>
            <div>
              <span className="text-base font-bold">Price: </span>
              {formatCurrency(selectedCourse.price)}
            </div>
            <div>
              <span className="text-base font-bold">Discount: </span>
              {selectedCourse.discount}%
            </div>
            <div>
              <span className="text-base font-bold">Category Name: </span>
              {selectedCourse.category_name}
            </div>
            <div>
              <span className="text-base font-bold">Session: </span>
              {selectedCourse.session_count}
            </div>
            <div>
              <span className="text-base font-bold">Lesson: </span>
              {selectedCourse.lesson_count}
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold">Thumbnail: </span>
              <Image src={selectedCourse.image_url} alt={selectedCourse.name}height={250} width={200} />
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-base font-bold">Course Video:</span>
              <span>
                <Link to={selectedCourse.video_url ?? "https://youtube.com"} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-blue-500" type="primary">
                    <PlayCircleOutlined />
                    Watch Video
                  </Button>
                </Link>
              </span>
            </div>
          </div>
        )}
        <div className="flex justify-end">
          <Button type="primary" danger onClick={() => setIsModalVisible(false)}>
            Close
          </Button>
        </div>
      </Modal>
      <CustomBreadcrumb />

      {/* Filters and Search */}
      <Space className="flex flex-wrap  mb-4">
        <Input.Search
          placeholder="Search By Name"
          value={searchText}
          onChange={handleSearchText}
          onSearch={handleSearch}
          className="w-full md:w-48"
          enterButton={<SearchOutlined className="text-white" />}
        />
        <Select
          
          placeholder="Select Category"
          optionFilterProp="children"
          onChange={handleCategoryChange}
          value={selectedCategoryName}
          className="w-full md:w-32 mt-2 md:mt-0 md:ml-2"
        >
          {uniqueCategories.map((category) => (
            <Select.Option key={category.category_id} value={category.category_name}>
              {category.category_name}
            </Select.Option>
          ))}
        </Select>

        <Select
          
          placeholder="Select Status"
          optionFilterProp="children"
          onChange={handleStatusChange}
          value={selectedStatus}
          className="w-full md:w-32 mt-2 md:mt-0 md:ml-2"
        >
          <Select.Option value="">All Status</Select.Option>
          <Select.Option value="new">New</Select.Option>
          <Select.Option value="waiting_approve">Waiting for Approve</Select.Option>
          <Select.Option value="approve">Approved</Select.Option>
          <Select.Option value="reject">Rejected</Select.Option>
          <Select.Option value="active">Active</Select.Option>
          <Select.Option value="inactive">Inactive</Select.Option>
        </Select>
      </Space>
      <Table
        columns={columnsCourses}
        rowKey="_id"
        dataSource={courses}
        pagination={false}
        onChange={handleTableChange}
      />
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
  );
};

export default AdminManageCourses;
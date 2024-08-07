import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  message,
  Modal,
  Pagination,
  Table,
  TablePaginationConfig,
  TableProps,
} from "antd";
import { useEffect, useState } from "react";
import { Session } from "../../../../models";
import { Link, useParams } from "react-router-dom";
import { API_GET_COURSE, API_GET_SESSIONS } from "../../../../consts";
import { axiosInstance } from "../../../../services/";
import { useDebounce } from "../../../../hooks";
import { CustomBreadcrumb, LoadingComponent } from "../../../../components";
import { formatDate } from "../../../../utils";
const ManageSession: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("");
  const [open, setOpen] = useState(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [keyword, setKeyword] = useState<string>("");
  const [selectedSessionID, setSelectedSessionID] = useState<string>("");
  const debouncedSearchTerm = useDebounce(keyword, 500);
  const showModal = (sessionId: string) => {
    setModalText(`Do you want to delete this session with id = ${sessionId} and the lessons of this session `);
    setSelectedSessionID(sessionId);
    setOpen(true);
  };

  const handleOk = async () => {
    if (selectedSessionID) {
      setModalText("Deleting...");
      setConfirmLoading(true);
      try {
        await handleDelete(selectedSessionID);
      } catch (error) {
        setModalText("Error occurred: " + error);
      } finally {
        setOpen(false);
        setConfirmLoading(false);
      }
    } else {
      setOpen(false);
    }
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };
  const handleDelete = async (sessionId: string) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`${API_GET_COURSE}/${sessionId}`);
      setSessions(sessions.filter((session) => session._id !== sessionId));
      message.success(`Delete Session Successfully!`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await axiosInstance.post(API_GET_SESSIONS, {
          searchCondition: {
            keyword: debouncedSearchTerm,
            course_id: courseId,
            is_position_order: false,
            is_deleted: false,
          },
          pageInfo: {
            pageNum: 1,
            pageSize: 30,
          },
        });
        if (response.data) {
          setSessions(response.data.pageData || response.data);
          setPagination((prev) => ({
            ...prev,
            total: response.data.pageInfo?.totalItems || response.data.length,
            current: response.data.pageInfo?.pageNum || 1,
            pageSize: response.data.pageInfo?.pageSize || response.data.length,
          }));
        }
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchSession();
    }
  }, [courseId, keyword, debouncedSearchTerm, pagination.current, pagination.pageSize]);
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
  const columns: TableProps<Session>["columns"] = [
    {
      title: "Course Name ",
      dataIndex: "course_name",
      key: "course_name",
    },
    {
      title: "Session Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Lesson",
      dataIndex: "_id",
      key: "_id",
      render: (_id: number, record: Session) => (
        <>
          <Link to={`/instructor/manage-courses/${courseId}/manage-sessions/${_id}/manage-lessons`}>
            <p className="text-blue-700">Lesson of "{record.name}"</p>
          </Link>
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
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (_id: string) => (
        <>
          <Link to={`/instructor/manage-courses/${courseId}/manage-sessions/update-session/${_id}`}>
            <EditOutlined className="m-2 text-blue-500" />
          </Link>
          <DeleteOutlined className="text-red-500 m-2" onClick={() => showModal(_id)} />
        </>
      ),
    },
  ];

  if (loading) {
    return (
      <>
        <LoadingComponent />
      </>
    );
  }

  return (
    <div>
      <Modal title="Confirm Delete" open={open} onOk={handleOk} confirmLoading={confirmLoading} onCancel={handleCancel}>
        <p>{modalText}</p>
      </Modal>
      <CustomBreadcrumb />

      <div className="grid grid-cols-2">
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-10">
          <Input
            placeholder="Search"
            value={keyword}
            onChange={handleSearch}
            className="my-10"
            style={{ width: 200 }}
          />
        </div>
        <div>
          <Link to={`/instructor/manage-courses/${courseId}/manage-sessions/create-session`}>
            <Button type="primary" className="float-right my-10">
              Add New Session
            </Button>
          </Link>
        </div>
      </div>

      <Table
        dataSource={sessions}
        columns={columns}
        rowKey={(record: Session) => record._id}
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

export default ManageSession;

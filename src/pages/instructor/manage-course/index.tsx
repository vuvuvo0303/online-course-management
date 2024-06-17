
import { Breadcrumb, Button, Table } from "antd";
import type { TableColumnsType } from "antd";
import { DeleteOutlined, EditOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";

interface DataType {
  key: React.Key;
  name: string;
  price: number;
  catagory: string;
  description: string;
}

const columns: TableColumnsType<DataType> = [
  { title: "Name Course", dataIndex: "name", key: "name" },
  { title: "Price", dataIndex: "price", key: "price" },
  { title: "Catagoy", dataIndex: "catagory", key: "catagory" },



  {
    title: "Action",
    key: "userId",
    render: () => (
      <div>
        <EditOutlined className="hover:cursor-pointer text-blue-400 hover:opacity-60" style={{ fontSize: "20px" }} />
        <DeleteOutlined
          className="ml-5 text-red-500 hover:cursor-pointer hover:opacity-60"
          style={{ fontSize: "20px" }}
        />
      </div>
    ),
    
  },
];

const data: DataType[] = [
  {
    key: 1,
    name: "John Brown",
    price: 32,
    catagory: "New York No. 1 Lake Park",
    description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
  },
  // Add other data objects similarly
];


const InstructorManageCourses: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between">
        {" "}
        <Breadcrumb
          className="py-2"
          items={[
            {
              href: "/",
              title: <HomeOutlined />,
            },
            {
              href: "",
              title: (
                <>
                  <UserOutlined />
                  <span>Instructor</span>
                </>
              ),
            },
            {
              title: "Manage Course",
            },
          ]}
        />
        <div className="py-2">
          <Button type="primary">Add New Course</Button>
        </div>
      </div>

      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,

        }}
        dataSource={data}
      />
    </div>
  );
};

export default InstructorManageCourses;

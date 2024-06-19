

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Table } from "antd";

// interface DataType {
//   key: React.Key;
//   name: string;
//   price: number;
//   catagory: string;
//   description: string;
// }

const columnsCourses = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Duration',
    dataIndex: 'duration',
    key: 'duration',
  },
  {
    title: 'Course Id',
    dataIndex: 'courseId',
    key: 'courseId',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Duration',
    dataIndex: 'duration',
    key: 'duration',
  },
  {
    title: 'Course Id',
    dataIndex: 'courseId',
    key: 'courseId',
  },
  {
    title: 'Created Date',
    dataIndex: 'createdDate',
    key: 'createdDate',
  },
  {
    title: 'Updated Date',
    dataIndex: 'updatedDate',
    key: 'updatedDate',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Rating',
    dataIndex: 'rating',
    key: 'rating',
  },
  {
    title: 'Action',
    dataIndex: 'courseId',
    key: 'courseId',
    render: (courseId: string) => (

      <>
        <Link to={`/instructor/lectureOfCourse/${courseId}`}><Button className="bg-purple-500 m-2">Detail</Button></Link>
        <Button className="bg-blue-500 m-2"><EditOutlined /></Button>
        <Button className=" bg-red-500 m-2"><DeleteOutlined /></Button>
      </>
    )

  }
];


// const data: DataType[] = [
//   {
//     key: 1,
//     name: "John Brown",
//     price: 32,
//     catagory: "New York No. 1 Lake Park",
//     description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
//   },
//   // Add other data objects similarly
// ];


const InstructorManageCourses: React.FC = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchLecture = async () => {
      const res = await axios.get(`https://665fbf245425580055b0b23d.mockapi.io/courses`);
      if (res.data) {
        setCourses(res.data);
      }
    };
    fetchLecture();
  }, [])
  return (
    <div>
      <div className="flex justify-between">

      </div>

      <Table columns={columnsCourses}
        expandable={{
          expandedRowRender: (record) => <div style={{ margin: 0 }}>{record}

          </div>,
        }} dataSource={courses}
      />
    </div>
  );
};

export default InstructorManageCourses;
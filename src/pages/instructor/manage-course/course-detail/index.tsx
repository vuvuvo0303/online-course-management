import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Image, Table, TableProps } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Course } from "../../../../models";


const ManageCourseDetail = ()=>{
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchCourses = async () => {
          try {
            const res = await axios.get(`https://665fbf245425580055b0b23d.mockapi.io/courses`);
            if (res.data) {
              setCourses(res.data);
            }
          } catch (error) {
            console.log("Error: ", error);
          } finally {
            setLoading(false)
          }
        };
        fetchCourses();
      }, [])
    
      if (loading) {
        return <p className="flex justify-center items-center">Loading ...</p>
      }
    const columnsCourses:TableProps<Course>["columns"] = [
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
          title: 'Created Date',
          dataIndex: 'createdDate',
          key: 'createdDate',
          defaultSortOrder: 'descend',
          sorter: (a: { createdDate: string }, b: { createdDate: string }) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime(),
          render: (date: string) => new Date(date).toLocaleDateString(),
        },
        {
          title: 'Updated Date',
          dataIndex: 'updatedDate',
          key: 'updatedDate',
          defaultSortOrder: 'descend',
          sorter: (a: { createdDate: string }, b: { createdDate: string }) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime(),
          render: (date: string) => new Date(date).toLocaleDateString(),
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
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
          },
          {
            title: 'Level',
            dataIndex: 'level',
            key: 'level',
          },
          {
            title: 'Course Image Url',
            dataIndex: 'courseImgUrl',
            key: 'courseImgUrl',
            render: (courseImgUrl: string) => <Image src={courseImgUrl} width={100} />,
          },
          {
            title: 'UserId',
            dataIndex: 'userId',
            key: 'userId',
          },
          {
            title: 'CourseId',
            dataIndex: 'courseId',
            key: 'courseId',
          },
      ];
    return(
        <>
         <div>
      <Breadcrumb
        className="py-2"
        items={[
          {
            href: "/instructor/dashboard",
            title: <HomeOutlined />,
          },
          {
            href: "/instructor/manage-courses",
            title: "Manage Courses",

          },
          {
            title: "Manage Course Detail",

          },
        ]}
      />
      <h1 className="text-center my-10">Manage Course Detail</h1>
     
      <Table columns={columnsCourses}
        dataSource={courses}
      />
    </div>
        </>
    )
}
export default ManageCourseDetail;
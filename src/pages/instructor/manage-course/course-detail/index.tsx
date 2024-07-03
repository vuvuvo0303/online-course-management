import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Category, Course } from "../../../../models";
import { host_main } from "../../../../consts";
import { useParams } from "react-router-dom";
import "./course-detail.css"

const ManageCourseDetail = () => {
  const [course, setCourse] = useState<Course | null>(null);
  const [cates, setCates] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { _id } = useParams<{ _id: string }>();
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${host_main}/api/course/${_id}`, {

          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (res.data.data) {
          setCourse(res.data.data);

        }
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setLoading(false)
      }
    };
    fetchCourses();
  }, [_id, token])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.post(`${host_main}/api/category/search`, {
          "searchCondition": {
            "keyword": "",
            "is_delete": false
          },
          "pageInfo": {
            "pageNum": 1,
            "pageSize": 10
          }
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (res) {
          console.log("check res cate:", res);
          setCates(res.data.data.pageData.filter(category => category._id === course?.category_id));
          console.log("check cate:", cates);
          console.log("check cate:", cates[0]?.name);
        }
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setLoading(false)
      }
    };
    fetchCategories();
  }, [token])

  if (loading) {
    return <p className="flex justify-center items-center">Loading ...</p>
  }

  return (
    <div className="container px-20 text-white">
      <div className="h-100">
        <Breadcrumb
          className="py-2 "
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
        <h1 className="text-center my-10">{course?.name}</h1>
        <div className="flex justify-center px-10">
          {/* <iframe width="1560" height="815" src={course?.video_url}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe> */}
        </div>
        <div>

        </div>
      </div>
    </div>
  )
}
export default ManageCourseDetail;
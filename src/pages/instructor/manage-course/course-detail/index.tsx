import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Col, DatePicker, Rate, Row } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Category, Course } from "../../../../models";
import { host_main } from "../../../../consts";
import { useParams } from "react-router-dom";
import { User } from "../../../../models/User";
import moment from "moment";
// import "./course-detail.css"

const ManageCourseDetail = () => {
  const [course, setCourse] = useState<Course | null>(null);
  const [instructor, setInstructor] = useState<User | null>(null);
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

  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const res = await axios.get<User>(`${host_main}/api/users/${course?.user_id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (res) {
          console.log("check instructor: ", res);
          setInstructor(res.data.data);
        }
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setLoading(false)
      }
    };
    fetchInstructor();
  }, [token, course])
  if (loading) {
    return <p className="flex justify-center items-center">Loading ...</p>
  }
  const formattedDate = moment(course?.updated_at).format('DD/MM/YYYY');
  return (
    <div className="container mx-auto px-10 ">
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
        <div className="grid lg:grid-cols-2 grid-cols-1 mt-10 gap-10">
          <div className="">
            <h1 >{course?.name}</h1>
            <p className="mt-5">{course?.description}</p>
            <div className="mt-2  grid grid-cols-3">
              <Rate allowHalf defaultValue={4.5} />
              <p>(25 rating)</p>
              <p>277 students</p>
            </div>
            <p className="mt-2">Created by <a className="text-purple-500 hover: underline" href="/instructor/profile">{instructor?.name}</a></p>
            <div>
              <p className="mt-2">Last updated: {formattedDate}</p>
            </div>
            <div className="mt-2 w-3/6 grid grid-cols-2">
              <p>₫{course?.price}</p>
              <p>{course?.discount}</p>
            </div>
          </div>
          <div >
            <iframe className="w-full " width="373" height="210" src={course?.video_url}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ManageCourseDetail;
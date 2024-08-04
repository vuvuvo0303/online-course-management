import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Tabs, Collapse, Radio, Checkbox, Rate, Skeleton } from "antd";
import { ExclamationCircleFilled, FilterOutlined } from "@ant-design/icons";
import axiosInstance from '../../services/axiosInstance'; // Replace with actual path to axios instance
import WishList from "../enrollment/WishList";
import MyList from "../enrollment/MyList";
import List from "../../components/categories/list";
import CourseCard from "../course/all-courses/course-card/CourseCard"; // Import CourseCard if it is in a different path
import styles from "./courses.module.css";
import { API_CLIENT_GET_COURSES } from "../../consts";
import { Course } from "models/Course";

const { Panel } = Collapse;

const CoursesCategory = () => {
  const { id: urlParams } = useParams();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(API_CLIENT_GET_COURSES, {
        searchCondition: {
          role: "all",
          status: true,
          is_deleted: false,
        },
        pageInfo: {
          pageNum: pagination.current,
          pageSize: pagination.pageSize,
        },
      });

      if (response.data) {
        setCourses(response.data.pageData || []);
        setPagination((prev) => ({
          ...prev,
          total: response.data.pageInfo?.totalItems || response.data.length,
          current: response.data.pageInfo?.pageNum || 1,
          pageSize: response.data.pageInfo?.pageSize || prev.pageSize,
        }));
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  }, [pagination.current, pagination.pageSize]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const tabsItems = [
    {
      key: "1",
      label: "Most popular",
      children: <WishList />,
    },
    {
      key: "2",
      label: "Trending",
      children: <MyList />,
    },
  ];

  return (
    <main className="p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl font-bold mb-4">{urlParams} Courses</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Courses to get you started</h2>
        <p className="text-gray-700 mb-4">
          Explore courses from experienced, real-world experts.
        </p>
        <Tabs defaultActiveKey="1" items={tabsItems} />
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Featured courses</h2>
        <p className="text-gray-700 mb-4">
          Many learners enjoyed this highly rated course for its engaging content.
        </p>
        <section className="relative">
          <div className="w-full bg-gray-100 p-4 rounded-md">
            {/* Featured courses content here */}
          </div>
        </section>
      </div>

      <section className="mb-12">
        <List />
      </section>

      <section>
        <h2 className="text-xl font-semibold">All {urlParams} courses</h2>
        <div className="mt-4 mb-6 bg-yellow-50 p-4 rounded-md flex items-center">
          <ExclamationCircleFilled className="text-xl text-yellow-500" />
          <p className="ml-4 text-lg font-semibold">
            Not sure? All courses have a 30-day money-back guarantee
          </p>
        </div>
      </section>

      <section>
        <div className="flex flex-col md:flex-row gap-4">
          <div className={`flex-shrink-0 ${isSidebarOpen ? 'w-full md:w-1/4' : 'hidden md:block'}`}>
            <div className="bg-white p-4 rounded-md shadow-md">
              <button
                type="button"
                className="w-full flex items-center mb-4 p-2 bg-blue-500 text-white rounded-md"
                onClick={toggleSidebar}
              >
                <FilterOutlined className="text-xl" />
                <span className="ml-2">Filter</span>
              </button>
              <form id="filter-form" aria-label="Changes will be applied when you select/deselect.">
                <Collapse defaultActiveKey={["1", "2", "3"]} expandIconPosition="right">
                  <Panel header="Ratings" key="1">
                    <Radio.Group>
                      <Radio value={4.5} className="block">
                        <Rate disabled defaultValue={4.5} style={{ fontSize: "12px" }} /> 4.5 (1,488)
                      </Radio>
                      <Radio value={4.0} className="block">
                        <Rate disabled defaultValue={4} style={{ fontSize: "12px" }} /> 4.0 (685)
                      </Radio>
                      <Radio value={3.5} className="block">
                        <Rate disabled defaultValue={3.5} style={{ fontSize: "12px" }} /> 3.5 (11)
                      </Radio>
                      <Radio value={3.0} className="block">
                        <Rate disabled defaultValue={3} style={{ fontSize: "12px" }} /> 3.0 (6)
                      </Radio>
                    </Radio.Group>
                  </Panel>
                  <Panel header="Video Duration" key="2">
                    <Checkbox.Group>
                      <Checkbox value="0-1" className="block">0-1 Hour (158)</Checkbox>
                      <Checkbox value="1-3" className="block">1-3 Hours (336)</Checkbox>
                      <Checkbox value="3-6" className="block">3-6 Hours (329)</Checkbox>
                      <Checkbox value="6-17" className="block">6-17 Hours (377)</Checkbox>
                    </Checkbox.Group>
                  </Panel>
                  <Panel header="Level" key="3">
                    <Checkbox.Group>
                      <Checkbox value="all" className="block">All Levels (697)</Checkbox>
                      <Checkbox value="beginner" className="block">Beginner (406)</Checkbox>
                      <Checkbox value="intermediate" className="block">Intermediate (185)</Checkbox>
                      <Checkbox value="expert" className="block">Expert (29)</Checkbox>
                    </Checkbox.Group>
                  </Panel>
                </Collapse>
              </form>
            </div>
          </div>
          <div className={`flex-grow ${isSidebarOpen ? 'w-3/4' : 'w-full'}`}>
            <div className={`${styles.course_list} ${isSidebarOpen ? styles.course_list_sidebar_open : styles.course_list_sidebar_closed}`}>
              {loading && initialLoad ? (
                <Skeleton active paragraph={{ rows: 4 }} />
              ) : (
                <>
                  {courses.map((course) => (
                    <CourseCard key={course._id} course={course} />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CoursesCategory;

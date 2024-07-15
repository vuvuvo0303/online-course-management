import {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import { Tabs, Collapse, Radio, Checkbox, Rate } from 'antd';
import type { TabsProps } from 'antd';
import WishList from "../enrollment/WishList";
import MyList from "../enrollment/MyList";
import List from "../../components/categories/list";
import TeacherCategories from "../../components/categories/teacher";
import { ExclamationCircleFilled, FilterOutlined } from "@ant-design/icons";
import { CartComponents } from "../../components";
import styles from './courses.module.css';
// import axiosInstance from "../../services/axiosInstance";
import {API_CLIENT_GET_COURSES} from "consts/index.ts";

const CoursesCategory: React.FC = () => {
    const urlParams = useParams().id;
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Most popular',
            children: <WishList />,
        },
        {
            key: '2',
            label: 'Trending',
            children: <MyList />,
        },
    ];

    const { Panel } = Collapse;


    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async() => {
        // await axiosInstance.post(API_CLIENT_GET_COURSES, {
        //     "searchCondition": {
        //         "keyword": urlParams,
        //         "category_id": "",
        //         "is_deleted": false
        //     },
        //     "pageInfo": {
        //         "pageNum": 1,
        //         "pageSize": 10
        //     }
        // })
    }

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <main className={styles.courses_container}>
            <h1 className="main_h1 w-full mt-0 mx-0 mb-4">{urlParams} Courses</h1>
            <div className={styles.component_margin}>
                <div className="mt-0 mx-0 mb-6">
                    <div className="max-w-full">
                        <h2 className="main_h2">Courses to get you started</h2>
                    </div>
                    <p className={styles.category_heading}>
                        Explore courses from experienced, real-world experts.
                    </p>
                    <Tabs className="mt-5" defaultActiveKey="1" items={items} />
                </div>
                <div></div>
            </div>

            <div className={styles.component_margin}>
                <div className="mt-0 mx-0 mb-1.6rem">
                    <div className="w-full">
                        <h2 className="main_h2">Featured courses</h2>
                        <p className={styles.category_heading}>
                            Many learners enjoyed this highly rated course for its engaging content.
                        </p>
                    </div>
                </div>
                <section className="relative">
                    <div className={styles.single_course_unit}>
                        <div className=""></div>
                    </div>
                </section>
            </div>
            <section className='mb-[5rem] mt-[2rem]'>
                <List />
            </section>
            <section>
                <h2 className="main_h2">Popular Instructors</h2>
                <div className='flexStart paddings mb-16'>
                    <TeacherCategories />
                </div>
            </section>

            <section>
                <h2 className="main_h2">All {urlParams} courses</h2>
                <div className="mt-4">
                    <div className={styles.alert_banner}>
                        <ExclamationCircleFilled className="icon_size" />
                        <div className="flex-1 ml-5">
                            <div className="justify-center flex flex-col">
                                <p className="text-xl font-bold mt-1">Not sure? All courses have a 30-day money-back guarantee</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mb-1.5">
                <div className="mb-2.5">
                    <div className="flex justify-between mb-4 mt-7">
                        <div className="gap-y-[.8rem] flex flex-wrap my-0 mx-[-.4rem]">
                            <button type="button" className={styles.filter_btn} onClick={toggleSidebar}>
                                <FilterOutlined className="text-xl" />
                                <span className="ml-2">Filter</span>
                            </button>
                            <div className="my-0 mx-[.4rem] min-w-[12rem] max-w-[40rem]">
                                <div className={styles.form_control}>
                                    <div className="flex-1 relative">
                                        <select className={styles.select_container} name="sort" required id="form-group">
                                            <option className="bg-white" value="popularity selected">Most popular</option>
                                            <option className="bg-white" value="highest-rated">Highest Rated</option>
                                            <option className="bg-white" value="newest">Newest</option>
                                        </select>
                                    </div>
                                    <label className={styles.form_label} htmlFor="form-group">
                                        <span className="flex-1 flex items-center min-w-[1px] py-0 px-[1.6rem]">
                                            <span className="block overflow-hidden overflow-ellipsis whitespace-nowrap">Sort by</span>
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <span className={styles.item_count}>
                            10,000 results
                        </span>
                    </div>
                    <div className="flex w-full">
                        {isSidebarOpen && (
                            <div className={styles.sidebar}>
                                <form id="filter-form" aria-label="Changes will be applied when you select/deselect.">
                                    <Collapse defaultActiveKey={['1', '2', '3']} expandIconPosition="right">
                                        <Panel header="Ratings" key="1">
                                            <Radio.Group>
                                                <Radio value={4.5}>
                                                    <Rate disabled defaultValue={4.5} style={{ fontSize: '12px' }} /> 4.5 (1,488)
                                                </Radio>
                                                <Radio value={4.0}>
                                                    <Rate disabled defaultValue={4} style={{ fontSize: '12px' }} /> 4.0 (685)
                                                </Radio>
                                                <Radio value={3.5}>
                                                    <Rate disabled defaultValue={3.5} style={{ fontSize: '12px' }} /> 3.5 (11)
                                                </Radio>
                                                <Radio value={3.0}>
                                                    <Rate disabled defaultValue={3} style={{ fontSize: '12px' }} /> 3.0 (6)
                                                </Radio>
                                            </Radio.Group>
                                        </Panel>
                                        <Panel header="Video Duration" key="2">
                                            <Checkbox.Group>
                                                <Checkbox value="0-1">0-1 Hour (158)</Checkbox>
                                                <Checkbox value="1-3">1-3 Hours (336)</Checkbox>
                                                <Checkbox value="3-6">3-6 Hours (329)</Checkbox>
                                                <Checkbox value="6-17">6-17 Hours (377)</Checkbox>
                                            </Checkbox.Group>
                                        </Panel>
                                        <Panel header="Level" key="3">
                                            <Checkbox.Group>
                                                <Checkbox value="all">All Levels (697)</Checkbox>
                                                <Checkbox value="beginner">Beginner (406)</Checkbox>
                                                <Checkbox value="intermediate">Intermediate (185)</Checkbox>
                                                <Checkbox value="expert">Expert (29)</Checkbox>
                                            </Checkbox.Group>
                                        </Panel>
                                    </Collapse>
                                </form>
                            </div>
                        )}
                        <div className={`${styles.course_list} ${isSidebarOpen ? '' : 'w-full'}`}>
                            <div className="mb-5 lg:ml-[5rem]">
                                <CartComponents />
                                <CartComponents />
                                <CartComponents />
                                <CartComponents />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main >
    );
}

export default CoursesCategory;

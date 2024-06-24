import { useParams } from "react-router-dom"
import styles from './courses.module.css'
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import WishList from "../enrollment/WishList.tsx";
import List from "../../components/categories/list";
import TeacherCategories from "../../components/categories/teacher";
import { ExclamationCircleFilled, FilterOutlined, UpOutlined } from "@ant-design/icons";
import { useState } from "react";
import {CartComponents} from "../../components";

const CoursesCategory: React.FC = () => {
    const urlParams = useParams().id;
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Most popular',
            children: <WishList />,
        },
        {
            key: '2',
            label: 'New',
            children: 'Content of Tab Pane 2',
        },
        {
            key: '3',
            label: 'Trending',
            children: 'Content of Tab Pane 3',
        },
    ];

    const [isRotated, setIsRotated] = useState(false);

    const toggleRotation = () => {
        setIsRotated(!isRotated);
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
                            <button type="button" className={styles.filter_btn}>
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
                    <div className={styles.main_content}>
                        <div className={styles.filtered_course_list}>
                            <div className={styles.sidebar}>
                                <form id="filter-form" aria-label="Changes will be applied when you select/deselect.">
                                    <div className={styles.according_panel}>
                                        <div className={styles.title_filter}>
                                            <h3 className="flex flex-1 font-normal max-w-[60rem]">
                                                <button type="button" aria-disabled="false" aria-expanded="true"
                                                        className={styles.according_title} id="according-title">
                                                    <span className="flex">Ratings</span>
                                                </button>
                                            </h3>
                                            <div onClick={toggleRotation}>
                                                <UpOutlined
                                                    className={`${styles.according_expand} ${isRotated ? styles.rotated : ''}`} />
                                            </div>
                                            <div className="overflow-hidden visible max-h-none">
                                                <div className="pt-3 px-0 pb-6">
                                                    <div className="flex flex-col items-start">
                                                        <div className="max-h-[14.5rem] overflow-hidden relative w-full">
                                                            <div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.according_panel}>
                                        <div className={styles.title_filter}>
                                            <h3 className="flex flex-1 font-normal max-w-[60rem]">
                                                <button type="button" aria-disabled="false" aria-expanded="true"
                                                        className={styles.according_title} id="according-title">
                                                    <span className="flex">Video Duration</span>
                                                </button>
                                            </h3>
                                            <div onClick={toggleRotation}>
                                                <UpOutlined
                                                    className={`${styles.according_expand} ${isRotated ? styles.rotated : ''}`}/>
                                            </div>
                                            <div className="overflow-hidden visible max-h-none">
                                                <div className="pt-3 px-0 pb-6">
                                                    <div className="flex flex-col items-start">
                                                        <div
                                                            className="max-h-[14.5rem] overflow-hidden relative w-full">
                                                            <div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.according_panel}>
                                        <div className={styles.title_filter}>
                                            <h3 className="flex flex-1 font-normal max-w-[60rem]">
                                                <button type="button" aria-disabled="false" aria-expanded="true"
                                                        className={styles.according_title} id="according-title">
                                                    <span className="flex">Level</span>
                                                </button>
                                            </h3>
                                            <div onClick={toggleRotation}>
                                                <UpOutlined
                                                    className={`${styles.according_expand} ${isRotated ? styles.rotated : ''}`}/>
                                            </div>
                                            <div className="overflow-hidden visible max-h-none">
                                                <div className="pt-3 px-0 pb-6">
                                                    <div className="flex flex-col items-start">
                                                        <div
                                                            className="max-h-[14.5rem] overflow-hidden relative w-full">
                                                            <div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div className={styles.course_list}>
                                <div className="mb-5">
                                    <CartComponents/>
                                    <CartComponents/>
                                    <CartComponents/>
                                    <CartComponents/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default CoursesCategory;

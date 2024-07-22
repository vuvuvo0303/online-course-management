import React from "react";
import { Rate } from "antd";
import { Course } from "../../../models/Course";
import { ShoppingCartOutlined, HeartOutlined, FlagOutlined, EyeOutlined, DislikeOutlined, LikeOutlined, ShareAltOutlined } from '@ant-design/icons';

interface CourseCardProps {
    course: Course;
    detailedView?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    return (
        <div className="flex flex-col lg:flex-row w-full lg:h-[24rem] bg-gray shadow-md rounded-lg p-5">
            <div className="rounded-lg overflow-hidden pt-5 sm:pb-5">
                <img
                    src={course.image_url}
                    className="w-[25rem] h-[15rem] rounded-lg"
                />
                <div className="flex flex-row gap-10 text-white lg:mt-[3.6rem] lg:ml-20">
                    <a href="/enrollment" className="button save flex items-center mb-2">
                        <HeartOutlined className="mr-2" />
                        Save
                    </a>
                    <button className="button report-abuse mb-2">
                        <FlagOutlined className="mr-2" />
                        Report abuse
                    </button>
                </div>
            </div>
            <div className="pl-5 flex flex-col text-white flex-grow lg:pl-10">
                <div className="text-3xl font-bold">{course.name}</div>
                <div className="pt-2 pb-2">{course.description.replace(/^<p>/, '').replace(/<\/p>$/, '')}</div>
                <div className="space-y-2 flex-grow">
                    <div className="flex items-center mb-2">
                        <div className="mt-3">
                            <Rate allowHalf disabled defaultValue={4.5} />
                        </div>
                        <span className="text-xs mt-2">{`(15,254 ratings)`}</span>
                    </div>
                    <div><strong>Method:</strong> {course.category_name}</div>
                    <div><strong>Instructor:</strong> {course.instructor_name}</div>
                    <div><span className="text-sm">Last update:</span> {new Date(course.updated_at).toLocaleDateString()}</div>
                    <div className="flex flex-row gap-4">
                        <div className="text-4xl">₫{course.price_paid}</div>
                        <div className="text-2xl mt-[0.2rem]">
                            <span className="line-through">
                                ₫{course.price}
                            </span>
                        </div>
                    </div>
                    <div className="text-xs">{course.discount}% off</div>
                    <div className="flex gap-4 mt-auto">
                        <button className="bg-yellow-500 text-gray p-2 rounded-md hover:bg-black hover:text-yellow-500">
                            <ShoppingCartOutlined className="mr-2" /> Add to Cart
                        </button>
                        <button className="bg-yellow-500 text-gray p-2 rounded-md hover:bg-black hover:text-yellow-500">
                            Buy now
                        </button>
                    </div>
                    <div className="text-xs mt-2">30-Day Money-Back Guarantee</div>
                </div>
            </div>
            <div className="ml-4 flex flex-row text-white mt-4 lg:mt-0">
                <div className="ml-[7rem] mb-[0.1rem] flex flex-row gap-4 items-end">
                    <div>
                        <button className="ml-[-0.2rem] mt-[0.1rem]">
                            <EyeOutlined className="mr-[0.2rem]" />
                            <span>1452</span>
                        </button>
                    </div>
                    <div>
                        <button className="ml-[0.1rem] mt-[0.1rem]">
                            <LikeOutlined className="mr-[0.3rem]" />
                            <span>100</span>
                        </button>
                    </div>
                    <div>
                        <button className="ml-[0.1rem] mt-[0.1rem]">
                            <DislikeOutlined className="mr-[0.3rem]" />
                            <span>20</span>
                        </button>
                    </div>
                    <div>
                        <button className="ml-[0.1rem] mt-[0.1rem]">
                            <ShareAltOutlined className="mr-[0.3rem]" />
                            <span>9</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;

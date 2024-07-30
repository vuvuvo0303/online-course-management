import { Rate } from "antd";
import { Link } from 'react-router-dom';
import { Course } from "../../../models/Course";
import { ShoppingCartOutlined, HeartOutlined, FlagOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { addCourseToCart } from '../../../services/cart';
import { paths } from "../../../consts";
import { formatMinute } from "../../../utils";

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
                <div className="pt-2 pb-2 truncate w-full max-w-[200px]">
                    {course.description.replace(/^<p>/, '').replace(/<\/p>$/, '')}
                </div>
                <div className="space-y-2 flex-grow">
                    <div className="flex items-center mb-2">
                        <div className="mt-3">
                            <Rate allowHalf disabled defaultValue={4.5} />
                        </div>
                        <span className="text-xs mt-2">{`(15,254 ratings)`}</span>
                    </div>
                    <div><strong>Category:</strong> {course.category_name}</div>
                    <div><strong>Instructor:</strong> {course.instructor_name}</div>
                    <div><span className="text-sm">Last update:</span> {new Date(course.updated_at).toLocaleDateString()}</div>
                    <div className="flex flex-row gap-4">
                        <div className="text-4xl">{course.price_paid.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</div>
                        <div className="text-2xl mt-[0.2rem]">
                            <span className="line-through">
                                {course.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                            </span>
                        </div>
                    </div>
                    <div className="text-xs">{course.discount}% off</div>
                    <div className="flex gap-4 mt-auto">
                        {course.is_purchased ? (
                            <Link to={`/course/lesson/${course._id}`}>
                                <button className="bg-yellow-500 text-gray p-2 rounded-md hover:bg-black hover:text-yellow-500">
                                    Study now
                                </button>
                            </Link>
                        ) : (
                            <>
                                <Link to={paths.STUDENT_CART}>
                                    <button onClick={() => addCourseToCart(course._id)} className="bg-yellow-500 text-gray p-2 rounded-md hover:bg-black hover:text-yellow-500">
                                        <ShoppingCartOutlined className="mr-2" /> Add to Cart
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                    <div className="text-xs mt-2">30-Day Money-Back Guarantee</div>
                </div>
            </div>
            <div className="ml-4 flex flex-row text-white mt-4 lg:mt-0">
                <div className="ml-[7rem] mb-[0.1rem] flex flex-row gap-4 items-end">
                    <div>
                        <div className="mr-3 mt-[0.1rem]">
                            <ClockCircleOutlined className="mr-[0.2rem]" />
                            <span>Full time to learn course: {formatMinute(course.full_time)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;

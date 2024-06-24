import { Card, Avatar, Rate } from 'antd';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { teacherCategories } from "../../../consts/index";

const TeacherCategories: React.FC = () => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold mb-4">Popular Instructors</h2>
            <p className="text-gray-600 mb-4">These real-world experts are highly rated by learners like you.</p>
            <Carousel
                responsive={responsive}
                itemClass="carousel-item-padding-10px"
                swipeable={true} // Allow swipe navigation on touch devices
                draggable={false} // Disable dragging
                showDots={false} // Hide pagination dots
                arrows={true} // Show navigation arrows
                centerMode={false} // Disable center mode
                infinite={true} // Enable infinite loop
            >
                {teacherCategories.map((teacher) => (
                    <div key={teacher} className="w-full">
                        <Card
                            className="bg-lightgoldenrodyellow rounded-lg shadow-md p-4 max-h-[15rem]"
                        >
                            <div className="flex items-center">
                                <Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${teacher}`} alt="avatar" className="rounded-full w-12 h-12 mr-4" />
                                <div>
                                    <h3 className="text-lg font-bold">{teacher}</h3>
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="flex items-center">
                                    <span className="text-lg font-bold mr-[0.5rem]">4.7</span>
                                    <Rate allowHalf defaultValue={2.5} />
                                </div>
                                <p className="text-gray-600 text-sm">Instructor Rating</p>
                                <p className="text-gray-600 text-sm">2.572.378 students</p>
                                <p className="text-gray-600 text-sm">68 courses</p>
                            </div>
                        </Card>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default TeacherCategories;
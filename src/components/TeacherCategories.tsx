import { Card } from 'antd';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { teacherCategories } from "../consts/index";

const { Meta } = Card;

const TeacherCategories: React.FC = () => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
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
                    <div key={teacher}>
                        <Card
                            style={{ margin: '10px', backgroundColor: 'lightgoldenrodyellow' }} // Add margin to create gap
                        >
                            <Meta
                                avatar={<img src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" alt="avatar" style={{ borderRadius: '50%', width: '70px', height: '70px' }} />}
                                title={teacher}
                                description="This is the description"
                            />
                        </Card>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default TeacherCategories;

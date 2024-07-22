import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from 'react-router-dom';
import "./List.module.css";

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

const List = () => {
    const topics = [
        "Development",
        "Business",
        "Finance & Accounting",
        "IT & Software",
        "Office Productivity",
        "Personal Development",
        "Design",
        "Marketing",
        "Lifestyle",
        "Photography & Video",
        "Health & Fitness",
        "Music",
        "Teaching & Academics",
    ];

    const splitTopics = [];
    for (let i = 0; i < topics.length; i += 2) {
        splitTopics.push(topics.slice(i, i + 2));
    }

    return (
        <div className="w-full">
            <Link to={`/category`}>
                <h2 className="text-2xl font-bold mb-4 text-center">Topics recommended for you</h2>
            </Link>
            <Carousel
                responsive={responsive}
                itemClass="carousel-item-padding-10px"
                swipeable={true}
                draggable={false}
                showDots={false}
                arrows={true}
                centerMode={false}
                infinite={false}
                className="flex flex-wrap gap-4"
            >
                {splitTopics.map((pair, index) => (
                    <div key={index} className="flex flex-col gap-2">
                        {pair.map((topic, idx) => (
                            <div key={idx} className="bg-white border border-[lightgray] px-4 py-2 flex items-center justify-center">
                                <span className="text-gray-800 font-medium">{topic}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </Carousel>
        </div>
    );
}

export default List;

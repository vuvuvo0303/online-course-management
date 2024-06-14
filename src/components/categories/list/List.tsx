import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
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
        "HTML5",
        "CSS3",
        "JavaScript",
        "Bootstrap 4",
        "SemanticUI",
        "DOM Manipulation",
        "jQuery",
        "Unix(Command Line)",
        "NodeJS",
        "NPM",
        "ExpressJS",
        "REST",
        "MongoDB",
        "Database Associations",
        "Authentication",
        "PassportJS",
        "Authorization",
    ];

    const splitTopics = [];
    for (let i = 0; i < topics.length; i += 2) {
        splitTopics.push(topics.slice(i, i + 2));
    }

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold mb-4 text-center">Topics recommended for you</h2>
            <Carousel
                responsive={responsive}
                itemClass="carousel-item-padding-10px"
                swipeable={true} // Allow swipe navigation on touch devices
                draggable={false} // Disable dragging
                showDots={false} // Hide pagination dots
                arrows={true} // Show navigation arrows
                centerMode={false} // Disable center mode
                infinite={false} // Disable infinite loop
                className="flex flex-wrap gap-4"
            >
                {splitTopics.map((pair, index) => (
                    <div key={index} className="flex flex-col gap-2">
                        {pair.map((topic, idx) => (
                            <div key={idx} className="bg-white-transparent border border-[lightgray] px-4 py-2 flex items-center justify-center">
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

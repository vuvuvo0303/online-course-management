import React from 'react';
import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { categoryFilters } from "../consts/index";

const { Meta } = Card;

const Categories: React.FC = () => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
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
                {categoryFilters.map((filter) => (
                    <div key={filter}>
                        <Card
                            style={{ margin: '10px' }} // Add margin to create gap
                            cover={
                                <img
                                    alt="example"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                />
                            }
                            actions={[
                                <SettingOutlined key="setting" />,
                                <EditOutlined key="edit" />,
                                <EllipsisOutlined key="ellipsis" />,
                            ]}
                        >
                            <Meta
                                avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                                title={filter}
                                description="This is the description"
                            />
                        </Card>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Categories;
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from 'react-router-dom';
import { Skeleton } from 'antd'; // Import Skeleton component
import "./List.module.css";
import { useCallback, useState, useEffect } from "react";
import axiosInstance from "../../../services/axiosInstance";
import { API_CLIENT_GET_CATEGORIES } from "../../../consts";
import { Category as CategoryType } from "../../../models/Category";

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

const NameCategory: React.FC = () => {
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });

    const fetchCategories = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.post(API_CLIENT_GET_CATEGORIES, {
                searchCondition: {
                    status: true,
                    is_deleted: false,
                },
                pageInfo: {
                    pageNum: pagination.current,
                    pageSize: pagination.pageSize,
                },
            });

            if (response.data) {
                setCategories(response.data.pageData || []);
                setPagination((prev) => ({
                    ...prev,
                    total: response.data.pageInfo?.totalItems || response.data.length,
                    current: response.data.pageInfo?.pageNum || 1,
                    pageSize: response.data.pageInfo?.pageSize || prev.pageSize,
                }));
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    }, [pagination.current, pagination.pageSize]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    // Split categories into pairs for display
    const splitTopics = [];
    for (let i = 0; i < categories.length; i += 2) {
        splitTopics.push(categories.slice(i, i + 2));
    }

    return (
        <div className="w-full">
            <Link to={`/category`}>
                <h2 className="text-2xl font-bold mb-4 text-center">Topics recommended for you</h2>
            </Link>
            {loading ? (
                <Skeleton active />
            ) : (
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
                    {splitTopics.length > 0 ? (
                        splitTopics.map((pair, index) => (
                            <div key={index} className="flex flex-col gap-2">
                                {pair.map((category) => (
                                    <div key={category._id} className="bg-white border border-[lightgray] px-4 py-2 flex items-center justify-center">
                                        <span className="text-gray-800 font-medium">{category.name}</span>
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <div className="text-center">No categories found</div>
                    )}
                </Carousel>
            )}
        </div>
    );
}

export default NameCategory;

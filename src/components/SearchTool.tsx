import { useEffect, useState } from 'react';
import { Popover, Input, Spin, List, Button } from 'antd';
import { fetchCoursesByClient } from '../services';
import { Course } from '../models';
import { Link } from 'react-router-dom';
import { ArrowRightOutlined, HeartOutlined } from '@ant-design/icons';

const CourseCard = ({ image = '', title = '', author = '', price = '', paid = '' }:
    { image?: string; title?: string; author?: string; price?: string; paid?: string }) => {
    return (
        <div className="flex items-center p-2 max-w-[21rem]">
            <img src={image || '/default-image.jpg'} alt={title} className="w-24 h-16 rounded-md" />
            <div className="ml-4">
                <h4 className="text-base font-bold">{title}</h4>
                <p className="text-xs text-gray-600">{author}</p>
                <p className="text-xs font-semibold line-through">{price}</p>
                <p className="text-lg font-semibold">{paid}</p>
            </div>
        </div>
    );
};

const SearchTool: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);

    const fetchCourses = async (term: string) => {
        if (term.trim() === '') return; // Avoid API call if search term is empty

        setLoading(true);
        const res = await fetchCoursesByClient(term, "");
        setCourses(res);
        setLoading(false);
    };

    useEffect(() => {
        fetchCourses(searchTerm);
    }, [searchTerm]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setVisible(e.target.value.trim() !== '');
    };

    const handleVisibleChange = (visible: boolean) => {
        setVisible(visible);
    };

    const content = (
        <div style={{ width: '500px' }}>
            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <Spin />
                </div>
            ) : courses.length > 0 ? (
                <List
                    dataSource={courses}
                    renderItem={(course) => (
                        <List.Item key={course._id} className="flex justify-between items-center">
                            <div className="flex-1">
                                <CourseCard
                                    image={course.image_url}
                                    title={course.name}
                                    author={course.instructor_name}
                                    price={course.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                                    paid={course.price_paid.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                                />
                            </div>
                            <div className='flex flex-col gap-2 items-end'>
                                <Link to={`/course/all-courses/course/${course._id}`}>
                                    <Button
                                        type="primary"
                                        className="ml-2 text-xs px-2 py-1"
                                    >
                                        <ArrowRightOutlined className="text-sm" /> View Course
                                    </Button>
                                </Link>
                                <Link to={`/enrollment`}>
                                    <Button
                                        type="default"
                                        className="ml-2 text-xs px-2 py-1"
                                    >
                                        <HeartOutlined className="text-sm" /> Save
                                    </Button>
                                </Link>
                            </div>
                        </List.Item>
                    )}
                />
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );

    return (
        <div className="relative w-full md:w-[650px] md:ml-[3.5rem]">
            <Popover
                content={content}
                title="Search Results"
                placement="bottom"
                trigger="click"
                open={visible}
                onOpenChange={handleVisibleChange}
            >
                <Input
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onPressEnter={() => setVisible(true)}
                />
            </Popover>
        </div>
    );
};

export default SearchTool;

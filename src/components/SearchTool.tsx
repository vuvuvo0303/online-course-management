import { useEffect, useState } from 'react';
import { Popover, Input, Spin, List } from 'antd';
import { fetchCoursesByClient } from '../services';
import { Course } from '../models';
import { Link } from 'react-router-dom';


const CourseCard = ({ image = '', title = '', author = '' }:
    { image?: string; title?: string; author?: string }) => {
    return (
        <div className="flex items-center p-2 max-w-[21rem]">
            <img src={image || '/default-image.jpg'} alt={title} className="w-15 h-10" />
            <div className="ml-4">
                <h4 className="text-base font-bold">{title}</h4>
                <p className="text-xs text-gray-600">{author}</p>
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
                            <Link to={`/course/all-courses/course/${course._id}`}>
                                <CourseCard
                                    image={course.image_url}
                                    title={course.name}
                                    author={`Course Published by ${course.instructor_name}`}
                                />
                            </Link>
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

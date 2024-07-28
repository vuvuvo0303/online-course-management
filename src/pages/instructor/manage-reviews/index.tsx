import { useState, useCallback, useEffect } from 'react';
import { Rate, Input, Button, Modal, Form, Select, message } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import axiosInstance from '../../../services/axiosInstance.ts';
import { useParams } from 'react-router-dom';
import { API_GET_COURSE, API_GET_COURSES } from '../../../consts/index.ts';
import { Review } from '../../../models/Review.ts';


interface ReviewFormValues {
    course_id: string;
    comment: string;
    rating: number;
}

const ReviewPage: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [courses, setCourses] = useState<{ _id: string; name: string }[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<string>('');
    const { courseId } = useParams<{ courseId: string }>();

    const fetchReviews = useCallback(async () => {
        try {
            const response = await axiosInstance.get(`${API_GET_COURSE}?course_id=${courseId}`);
            if (response.data) {
                setReviews(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    }, [courseId]);

    useEffect(() => {
        fetchReviews();
    }, []);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axiosInstance.post(API_GET_COURSES, {
                    searchCondition: {
                        keyword: '',
                        category: '',
                        status: 'new',
                        is_deleted: false,
                    },
                    pageInfo: {
                        pageNum: 1,
                        pageSize: 10,
                    },
                });
                if (response.data) {
                    setCourses(response.data.pageData);
                    if (response.data.pageData.length > 0) {
                        setSelectedCourse(response.data.pageData[0]._id);
                    }
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        if (!courseId) {
            fetchCourses();
        }
    }, [courseId]);

    const addNewReview = useCallback(async (values: ReviewFormValues) => {
        try {
            setLoading(true);
            const newReview: Review = {
                reviewer_name: 'New User',
                created_at: new Date(),
                rating: values.rating,
                comment: values.comment,
                _id: '',
                updated_at: new Date(),
                user_id: '',
                course_id: '',
                is_deleted: false,
                reviewer_id: '',
                course_name: ''
            };

            const response = await axiosInstance.post('/api/review', {
                ...values,
                course_id: values.course_id || selectedCourse,
            });

            if (response.data) {
                setReviews((prevReviews) => [newReview, ...prevReviews]);
                setIsModalVisible(false);
                form.resetFields();
                message.success('Review added successfully.');
            }
        } catch (error) {
            // console.error(error);
            // toast.error('Failed to add review.');
        } finally {
            setLoading(false);
        }
    }, [selectedCourse, form]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleAddReview = (values: ReviewFormValues) => {
        addNewReview(values);
    };

    const handleChangeCourse = (value: string) => {
        setSelectedCourse(value);
    };

    return (
        <div className="flex flex-col p-4 bg-white min-h-screen text-black space-y-4 sm:flex-row sm:space-x-4 w-full">
            <div className="bg-white-transparent p-4 rounded-md w-full sm:w-1/2 lg:ml-[3rem] lg:mt-[1rem] lg:h-[20rem]">
                <h2 className="text-xl mb-4">Student Feedback</h2>
                <div className="flex items-center mb-4">
                    <span className="text-3xl mr-2">4.6</span>
                    <Rate allowHalf defaultValue={4.5} disabled />
                    <span className="ml-4">Course Rating</span>
                </div>
            </div>
            <div className="bg-white-transparent p-4 rounded-md w-full sm:w-1/2">
                <div className="flex justify-between items-center mb-4 w-full">
                    <h2 className="text-xl mb-0">Reviews</h2>
                    <Button type="default" icon={<PlusOutlined />} onClick={showModal}>
                        Add Your Review
                    </Button>
                </div>
                <Input
                    placeholder="Search reviews..."
                    prefix={<SearchOutlined />}
                    className="mb-4"
                />
                <div className="h-[35rem] overflow-y-auto pr-2">
                    {reviews.map((review, index) => (
                        <div
                            className="bg-gray-900 p-4 rounded-md mb-4"
                            key={index}
                        >
                            <div className="flex items-center mb-2">
                                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-lg mr-4">
                                    {review.reviewer_name[0]}
                                </div>
                                <div>
                                    <div className="text-lg">{review.reviewer_name}</div>
                                    <div className="text-sm text-gray-400">{review.created_at.toLocaleDateString()}</div>
                                </div>
                            </div>
                            <Rate
                                allowHalf
                                defaultValue={review.rating}
                                disabled
                                className="mb-2"
                            />
                            <p>{review.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Modal
                title="Add Your Review"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form form={form} onFinish={handleAddReview}>
                    {
                        !courseId &&
                        <Form.Item
                            name="course_id"
                            label="Course"
                            initialValue={selectedCourse}
                            rules={[{ required: true, message: 'Please select a course' }]}
                        >
                            <Select onChange={handleChangeCourse}>
                                {courses.map(course => (
                                    <Select.Option key={course._id} value={course._id}>
                                        {course.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    }
                    <Form.Item
                        name="rating"
                        label="Rating"
                        rules={[{ required: true, message: 'Please provide a rating' }]}
                    >
                        <Rate allowHalf />
                    </Form.Item>
                    <Form.Item
                        name="comment"
                        label="Review"
                        rules={[{ required: true, message: 'Please provide a review' }]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="default" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ReviewPage;

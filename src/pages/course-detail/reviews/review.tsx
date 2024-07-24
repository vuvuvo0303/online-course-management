import { useState, useCallback } from 'react';
import { Rate, Progress, Input, Button, Modal, Form, message } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import 'tailwindcss/tailwind.css'; // Make sure Tailwind CSS is configured
import axiosInstance from "../../../services/axiosInstance.ts";
import { API_CREATE_REVIEW, API_GET_REVIEWS } from "../../../consts";
import { Review } from "../../../models";



const ReviewPage: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([
        {
            reviewer_name: 'John Doe',
            created_at: new Date(),
            rating: 4.5,
            comment: 'Nam gravida elit a velit rutrum, eget dapibus ex elementum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce lacinia, nunc sit amet tincidunt venenatis.',
            _id: '',
            updated_at: new Date(),
            user_id: '',
            course_id: '',
            is_deleted: false,
            reviewer_id: '',
            course_name: ''
        },
        {
            reviewer_name: 'John Doe',
            created_at: new Date(),
            rating: 4.5,
            comment: 'Nam gravida elit a velit rutrum, eget dapibus ex elementum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce lacinia, nunc sit amet tincidunt venenatis.',
            _id: '',
            updated_at: new Date(),
            user_id: '',
            course_id: '',
            is_deleted: false,
            reviewer_id: '',
            course_name: ' ac ante ipsum primis in faucibus. Fusce lacinia, nunc sit amet tincidunt venenatis.',
        },
        {
            reviewer_name: 'John Doe',
            created_at: new Date(),
            rating: 4.5,
            comment: 'Nam gravida elit a velit rutrum, eget dapibus ex elementum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce lacinia, nunc sit amet tincidunt venenatis.',
            _id: '',
            updated_at: new Date(),
            user_id: '',
            course_id: '',
            is_deleted: false,
            reviewer_id: '',
            course_name: ' ac ante ipsum primis in faucibus. Fusce lacinia, nunc sit amet tincidunt venenatis.',
        },
        {
            reviewer_name: 'John Doe',
            created_at: new Date(),
            rating: 4.5,
            comment: 'Nam gravida elit a velit rutrum, eget dapibus ex elementum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce lacinia, nunc sit amet tincidunt venenatis.',
            _id: '',
            updated_at: new Date(),
            user_id: '',
            course_id: '',
            is_deleted: false,
            reviewer_id: '',
            course_name: ' ac ante ipsum primis in faucibus. Fusce lacinia, nunc sit amet tincidunt venenatis.',
        },
    ]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const fetchReviews = useCallback(async () => {
        try {
            const response = await axiosInstance.get(API_GET_REVIEWS);
            if (response.data.pageData) {
                setReviews(response.data.pageData);
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleAddNewReview = useCallback(
        async (values: Review) => {
            try {
                setLoading(true);
                const response = await axiosInstance.post(API_CREATE_REVIEW, values);
                if (response.data) {
                    const newReview = response.data;
                    setReviews((prevReviews) => [newReview, ...prevReviews]);
                    setIsModalVisible(false);
                    form.resetFields();
                    fetchReviews();
                    message.success('Review added successfully.');
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        },
        [form, fetchReviews]
    );

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleAddReview = (values: Review) => {
        handleAddNewReview(values);
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
                <div>
                    {[70, 40, 5, 1, 1].map((percent, index) => (
                        <div className="flex items-center mb-2" key={index}>
                            <Progress
                                percent={percent}
                                showInfo={false}
                                strokeColor="#ff4d4f"
                                trailColor="lightgray"
                                className="w-1/2"
                            />
                            <Rate
                                className="ml-4"
                                disabled
                                defaultValue={5 - index}
                                count={5}
                            />
                            <span className="ml-2">{percent}%</span>
                        </div>
                    ))}
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
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form form={form} onFinish={handleAddReview}>
                    <Form.Item
                        name="rating"
                        label="Rating"
                        rules={[{ required: true, message: 'Please provide a rating' }]}
                    >
                        <Rate allowHalf />
                    </Form.Item>
                    <Form.Item
                        name="comment"
                        label="Comment"
                        rules={[{ required: true, message: 'Please provide a review' }]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="default" onClick={handleCancel} className='border-none'>
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
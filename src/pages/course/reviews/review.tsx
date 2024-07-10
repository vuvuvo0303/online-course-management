import { useState } from 'react';
import { Rate, Progress, Input, Button, Modal, Form } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import 'tailwindcss/tailwind.css'; // Make sure Tailwind CSS is configured

interface Review {
    name: string;
    time: string;
    rating: number;
    text: string;
}

interface ReviewFormValues {
    rating: number;
    text: string;
}

const ReviewPage: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([
        {
            name: 'John Doe',
            time: '2 hours ago',
            rating: 4.5,
            text: 'Nam gravida elit a velit rutrum, eget dapibus ex elementum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce lacinia, nunc sit amet tincidunt venenatis.',
        },
        {
            name: 'Jessica William',
            time: '12 hours ago',
            rating: 4.0,
            text: 'Nam gravida elit a velit rutrum, eget dapibus ex elementum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce lacinia, nunc sit amet tincidunt venenatis.',
        },
        {
            name: 'Alice Johnson',
            time: '1 day ago',
            rating: 3.5,
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor.',
        },
        {
            name: 'Bob Smith',
            time: '2 days ago',
            rating: 5.0,
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor.',
        },
    ]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const handleAddReview = (values: ReviewFormValues) => {
        const newReview: Review = {
            name: 'New User',
            time: 'Just now',
            rating: values.rating,
            text: values.text,
        };
        setReviews([newReview, ...reviews]);
        form.resetFields();
        setIsModalVisible(false);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="flex flex-col p-4 bg-white min-h-screen text-black space-y-4 sm:flex-row sm:space-x-4">
            <div className="bg-gray-800 p-4 rounded-md w-full sm:w-1/2 lg:ml-[3rem]">
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
            <div className="bg-gray-900 p-4 rounded-md w-full sm:w-1/2">
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
                <div className="h-96 overflow-y-auto pr-2">
                    {reviews.map((review, index) => (
                        <div
                            className="bg-gray-900 p-4 rounded-md mb-4"
                            key={index}
                        >
                            <div className="flex items-center mb-2">
                                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-lg mr-4">
                                    {review.name[0]}
                                </div>
                                <div>
                                    <div className="text-lg">{review.name}</div>
                                    <div className="text-sm text-gray-400">{review.time}</div>
                                </div>
                            </div>
                            <Rate
                                allowHalf
                                defaultValue={review.rating}
                                disabled
                                className="mb-2"
                            />
                            <p>{review.text}</p>
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
                        name="text"
                        label="Review"
                        rules={[{ required: true, message: 'Please provide a review' }]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="default" htmlType="submit" className='border-none'>
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ReviewPage;

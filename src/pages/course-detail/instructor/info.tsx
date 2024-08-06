import { useEffect, useState } from 'react';
import { message, Skeleton } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Instructor } from '../../../models'; // Import the Course type
import { axiosInstance, getUserDetail, subscriptionByInstructorOrStudent } from '../../../services';
import { API_CLIENT_GET_COURSE_DETAIL } from '../../../consts';
import { useParams, useNavigate } from 'react-router-dom';
import { formatDate, upperCaseFirstLetter } from '../../../utils';

const Info = () => {
    const [subscribed, setSubscribed] = useState(false);
    const [dataInstructor, setDataInstructor] = useState<Instructor>();
    const user = localStorage.getItem("user");
    const [loading, setLoading] = useState(true);
    const course_id = useParams()._id;
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const instructorId = await getInstructorId();
            const responseInstructor = await getUserDetail(instructorId);
            const instructorInfo = responseInstructor.data;
            setDataInstructor(instructorInfo);
        } catch (error) {
            message.error('Failed to fetch instructor data');
        } finally {
            setLoading(false);
        }
    };

    const handleClick = async () => {
        try {
            const response = await subscriptionByInstructorOrStudent(dataInstructor?._id);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            if (response.is_subscribed) {
                message.success(`Change subscribed to ${dataInstructor?.name}`);
            } else {
                message.success(`Change subscribed to ${dataInstructor?.name}`);
            }
            setSubscribed(!subscribed);
        } catch (error) {
            message.error('Failed to handle subscription');
        }
    };

    const getInstructorId = async () => {
        const response = await axiosInstance.get(`${API_CLIENT_GET_COURSE_DETAIL}/${course_id}`);
        return response.data.instructor_id;
    };

    const handleInstructorClick = () => {
        if (user) {
            navigate(`/user/${dataInstructor?._id}`);
        } else {
            message.info('Please log in to view more information');
            navigate('/login');
        }
    };

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="bg-white rounded-lg shadow-md p-6">
                {loading ? (
                    <Skeleton active avatar paragraph={{ rows: 4 }} />
                ) : (
                    <>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">{upperCaseFirstLetter(dataInstructor?.role)}</h2>
                            {user && (
                                <button
                                    className={`px-4 py-2 rounded text-white font-semibold ${subscribed ? 'bg-red-500' : 'bg-blue-500'}`}
                                    onClick={handleClick}
                                >
                                    {subscribed ? "Unsubscribe" : (
                                        <>
                                            <PlusCircleOutlined className='mr-1' /> Subscribe
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                        <div className="flex items-center mb-4">
                            <img
                                src={typeof dataInstructor?.avatar === 'string' ? dataInstructor.avatar : ""}
                                alt={dataInstructor?.name}
                                className="rounded-full w-20 h-20 mr-4"
                            />
                            <div>
                                <button onClick={handleInstructorClick} className="text-xl font-bold text-blue-500">
                                    {dataInstructor?.name}
                                </button>
                                <p>Date of Birth: {formatDate(dataInstructor?.dob)}</p>
                                <p>Create Date: {formatDate(dataInstructor?.created_at)}</p>
                            </div>
                        </div>
                        <p className="mb-6 text-xl text-gray-700">
                            {dataInstructor?.description}
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default Info;

import { useEffect, useState } from 'react';
import { message, Skeleton } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Instructor } from '../../../models'; // Import the Course type
import { axiosInstance, getUserDetail, subscriptionByInstructorOrStudent } from '../../../services';
import { API_CLIENT_GET_COURSE_DETAIL } from '../../../consts';
import { useParams } from 'react-router-dom';
import { formatDate, upperCaseFirstLetter } from '../../../utils';
import { Link } from 'react-router-dom';

const Info = () => {
    const [subscribed, setSubscribed] = useState(false);
    const [dataInstructor, setDataInstructor] = useState<Instructor>();
    const [loading, setLoading] = useState(true);
    const course_id = useParams()._id;

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
        const response = await subscriptionByInstructorOrStudent(dataInstructor?._id);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        if (response.is_subscribed) {
            message.success(`Subscribed to ${dataInstructor?.name}`);
        } else {
            message.success(`Unsubscribed to ${dataInstructor?.name}`);
        }
        setSubscribed(!subscribed);
    };

    const getInstructorId = async () => {
        const response = await axiosInstance.get(`${API_CLIENT_GET_COURSE_DETAIL}/${course_id}`);
        return response.data.instructor_id;
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
                            <button
                                className={`px-4 py-2 rounded text-white font-semibold ${subscribed ? 'bg-red-500' : 'bg-blue-500'}`}
                                onClick={handleClick}
                            >
                                {subscribed ? "UnSubscribed" : (
                                    <>
                                        <PlusCircleOutlined className='mr-1' /> Subscribe
                                    </>
                                )}
                            </button>
                        </div>
                        <div className="flex items-center mb-4">
                            <img
                                src={typeof dataInstructor?.avatar === 'string' ? dataInstructor.avatar : ""}
                                alt={dataInstructor?.name}
                                className="rounded-full w-20 h-20 mr-4"
                            />
                            <div>
                                <Link to={`/user/${dataInstructor?._id}`}>
                                    <h3 className="text-xl font-bold">{dataInstructor?.name}</h3>
                                </Link>
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

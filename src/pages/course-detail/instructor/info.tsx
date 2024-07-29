import { useEffect, useState } from 'react';
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Instructor } from '../../../models'; // Import the Course type
import { axiosInstance } from '../../../services';
import { API_CLIENT_GET_COURSE_DETAIL, API_GET_USER_DETAIL } from '../../../consts';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

const Info = () => {
    const [subscribed, setSubscribed] = useState(false);
    const [dataInstructor, setDataInstructor] = useState<Instructor>();
    const course_id = useParams()._id;

    useEffect(() => {
        const fetchData = async () => {
            const instructorId = await getInstructorId();
            const instructor = await getInstructor(instructorId);
            setDataInstructor(instructor);
        }
        fetchData();
    }, [])

    const handleClick = () => {
        setSubscribed(!subscribed);
    };

    const getInstructorId = async () => {
        const response = await axiosInstance.get(`${API_CLIENT_GET_COURSE_DETAIL}/${course_id}`);
        return response.data.instructor_id;
    }

    const getInstructor = async (instructorId: string) => {
        const response = await axiosInstance.get(`${API_GET_USER_DETAIL}/${instructorId}`)
        return response.data
    }

    const formatDate = (date: Date | undefined): string => {
        return date ? format(new Date(date), "dd/MM/yyyy") : "";
    }


    return (
        <div className="container mx-auto px-4 py-16">
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">{dataInstructor?.role}</h2>
                    <Button
                        type={subscribed ? "default" : "primary"}
                        onClick={handleClick}
                    >
                        {subscribed ? "Subscribed" : (
                            <>
                                <PlusCircleOutlined className='mr-1' /> Subscribe
                            </>
                        )}
                    </Button>
                </div>
                <div className="flex items-center mb-4">
                    <img
                        src={typeof dataInstructor?.avatar === 'string' ? dataInstructor.avatar : ""}
                        alt="Jose Portilla"
                        className="rounded-full w-20 h-20 mr-4"
                    />
                    <div>
                        <h3 className="text-xl font-bold">{dataInstructor?.name}</h3>
                        <p className="text-gray-600">{dataInstructor?.role}</p>
                    </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <span className="ml-2">Create Date: {formatDate(dataInstructor?.created_at)}</span>
                    </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <span className="ml-2">Date of Birth: {formatDate(dataInstructor?.dob)}</span>
                    </div>
                    <div>
                        <span className="text-gray-500">
                            {/* <FileWordOutlined className="ml-3" /> {instructor.numLectures} lectures */}
                        </span>
                    </div>
                </div>
                <p className="mb-6 text-gray-700">
                    {dataInstructor?.description}
                </p>
            </div>
        </div>
    );
};

export default Info;

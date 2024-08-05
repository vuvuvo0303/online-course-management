import { API_GET_USER_DETAIL, API_INSTRUCTOR_OR_STUDENT_SUBSCRIPTIONS } from "../../consts";
import { useParams } from "react-router-dom";
import { axiosInstance, getItemsBySubscriber } from "../../services";
import { useCallback, useEffect, useState } from "react";
import {
    PlusCircleOutlined,
    PlayCircleOutlined
} from '@ant-design/icons';
import { Button, message, Modal, Skeleton } from "antd";
import { Instructor } from "../../models";

const User = () => {
    const { id } = useParams<{ id: string }>();
    const [dataUser, setDataUser] = useState<Instructor | undefined>(undefined);
    const [showFullDescription, setShowFullDescription] = useState<boolean>(false);
    const [subcribe, setSubcribe] = useState<string>("Subscribe");
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true); // Add loading state

    const getUserDetail = useCallback(async () => {
        try {
            const response = await axiosInstance.get(`${API_GET_USER_DETAIL}/${id}`);
            setDataUser(response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching user details:", error);
        } finally {
            setLoading(false); // Ensure loading state is turned off
        }
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            await getUserDetail();
            if (dataUser?.name) {
                await checkSubcribeOrNot(dataUser.name);
            }
        }
        fetchData();
    }, [getUserDetail, dataUser?.name]);

    const handleShowMore = () => {
        setShowFullDescription(!showFullDescription);
    };

    const handleSubcribe = async () => {
        try {
            const response = await axiosInstance.post(API_INSTRUCTOR_OR_STUDENT_SUBSCRIPTIONS, {
                "instructor_id": id
            });

            if (response.data && response.data.is_subscribed !== undefined) {
                if (response.data.is_subscribed) {
                    message.success(`Subscribed to ${dataUser?.name}`);
                    setSubcribe("Unsubscribe");
                } else {
                    message.success(`Unsubscribed from ${dataUser?.name}`);
                    setSubcribe("Subscribe");
                }
            } else {
                message.error("Unexpected response from the server.");
            }
        } catch (error) {
            console.error("Error subscribing/unsubscribing:", error);
        }
    };

    const checkSubcribeOrNot = async (name: string) => {
        try {
            const response = await getItemsBySubscriber(name, 1, 100);
            if (response && response.length > 0 && response[0].is_subscribed !== undefined) {
                const subcribtion = response[0];
                if (subcribtion.is_subscribed) {
                    setSubcribe("Unsubscribe");
                }
            }
        } catch (error) {
            console.error("Error checking subscription status:", error);
        }
    };

    const getAvatarSrc = (avatar: string | { file?: { originFileObj?: File } } | undefined): string | undefined => {
        if (typeof avatar === 'string') {
            return avatar;
        } else if (avatar && avatar.file && avatar.file.originFileObj) {
            return URL.createObjectURL(avatar.file.originFileObj);
        }
        return undefined;
    };

    const formatDescription = (description: string) => {
        if (!description) return "";

        const formattedDescription = description.split('.').join('.\n');

        const words = formattedDescription.split(' ');
        if (words.length > 150 && !showFullDescription) {
            return words.slice(0, 150).join(' ') + '...';
        }
        return formattedDescription;
    };

    const handlePlayVideo = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const buttonStyle = subcribe === "Subscribe"
        ? "bg-blue-500 text-white"
        : "bg-red-500 text-white";

    return (
        <div className="relative mt-10 max-w-screen-lg w-full mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
                <Skeleton active avatar paragraph={{ rows: 4 }} />
            ) : (
                <>
                    <div className="relative mb-4">
                        <Button
                            className={`absolute top-0 right-0 mt-4 mr-4 ${buttonStyle}`}
                            onClick={handleSubcribe}
                        >
                            <PlusCircleOutlined /> {subcribe}
                        </Button>
                    </div>
                    <div className="flex flex-col items-start mt-6 sm:mt-10">
                        <div className="font-bold text-lg text-gray-600">
                            {dataUser?.role.toUpperCase()}
                        </div>
                        <h1 className="text-2xl font-semibold text-gray-900">{dataUser?.name}</h1>
                        <div className="flex flex-col sm:flex-row items-start mt-4 space-y-4 sm:space-y-0 sm:space-x-4">
                            <img
                                width={150}
                                height={150}
                                alt={dataUser?.name}
                                className="border rounded-full w-32 h-32 mb-2"
                                src={getAvatarSrc(dataUser?.avatar)}
                            />
                            <div className="flex flex-col">
                                <div><strong>Email:</strong> {dataUser?.email}</div>
                                <div><strong>Phone:</strong> {dataUser?.phone_number}</div>
                                <div><strong>Role:</strong> {dataUser?.role}</div>
                                <div><strong>Degree:</strong> {dataUser?.degree}</div>
                            </div>
                        </div>
                        <div className="flex items-center mt-4">
                            <PlayCircleOutlined
                                className="text-blue-500 cursor-pointer"
                                onClick={handlePlayVideo}
                                style={{ fontSize: '24px' }}
                            />
                            <span className="ml-2 text-blue-500 cursor-pointer" onClick={handlePlayVideo}>Instructor Demo</span>
                        </div>
                        <div className="overflow-hidden relative w-full mt-4">
                            <p className="whitespace-pre-line text-sm text-gray-800">
                                {formatDescription(dataUser?.description || "")}
                            </p>
                            {dataUser?.description && dataUser?.description.split(' ').length > 150 && (
                                <button
                                    className="text-blue-500 mt-2 text-sm"
                                    onClick={handleShowMore}
                                >
                                    {showFullDescription ? "Show Less" : "Show More"}
                                    <span className="ml-2">
                                        {showFullDescription ? "▲" : "▼"}
                                    </span>
                                </button>
                            )}
                        </div>
                    </div>

                    <Modal
                        title="Video"
                        visible={isModalVisible}
                        onCancel={handleCancel}
                        footer={null}
                        width="90%"
                    >
                        <video
                            controls
                            width="100%"
                            src={dataUser?.video}
                            className="rounded"
                        >
                            Your browser does not support the video tag.
                        </video>
                    </Modal>
                </>
            )}
        </div>
    );
}

export default User;

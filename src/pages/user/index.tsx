import { API_GET_USER_DETAIL, API_INSTRUCTOR_OR_STUDENT_SUBSCRIPTIONS } from "../../consts";
import { useParams } from "react-router-dom";
import { axiosInstance, getItemsBySubscriber } from "../../services";
import { useCallback, useEffect, useState } from "react";
import { Instructor } from "../../models";
import styles from "./user.module.css";
import { Button, message } from "antd";

const User = () => {
    const { id } = useParams<{ id: string }>();
    const [dataUser, setDataUser] = useState<Instructor>();
    const [showFullDescription, setShowFullDescription] = useState<boolean>(false);
    const [subcribe, setSubcribe] = useState("Subcribe");


    const getUserDetail = useCallback(async () => {
        const response = await axiosInstance.get(`${API_GET_USER_DETAIL}/${id}`);
        setDataUser(response.data);
        return response.data;
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            const userData = await getUserDetail();
            if (userData?.name) {
                await checkSubcribeOrNot(userData.name);
            }
        }
        fetchData();
    }, []);

    const handleShowMore = () => {
        setShowFullDescription(!showFullDescription);
    };

    const handleSubcribe = async () => {
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
    };


    const checkSubcribeOrNot = async (name: string) => {
        try {
            const response = await getItemsBySubscriber(name, 1, 100);
            if (response && response.length > 0 && response[0].is_subscribed !== undefined) {
                const subcribtion = response[0];
                if (subcribtion.is_subscribed) {
                    setSubcribe("Unsubcribe");
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

    return (
        <div>
            <div className="relative mt-10 max-w-[65.2rem] w-full mx-auto px-[2.4rem]">
                <div className="relative">
                    <img width={150} height={150} alt={dataUser?.name}
                        className="rounded-full object-cover w-60 h-60 absolute top-0 right-9 max-w-full"
                        src={getAvatarSrc(dataUser?.avatar)} />
                    <Button className="top-60 right-[108px] absolute subcribe_custom_button" onClick={handleSubcribe}>{subcribe}</Button>
                </div>
                <div className={styles.instructor_profile_left_column}>
                    <div className="pt-0 font-bold text-lg text-[#6a6f73]">
                        {dataUser?.role.toUpperCase()}
                    </div>
                    <h1 className="main_h1 mb-5">{dataUser?.name}</h1>
                    <div className="flex flex-col items-start">
                        <div className="overflow-hidden max-h-none relative w-full">
                            <p className="main_p whitespace-pre-line">
                                {formatDescription(dataUser?.description || "")}
                            </p>
                            {dataUser?.description && dataUser?.description.split(' ').length > 150 && (
                                <button
                                    className="text-blue-500 mt-2"
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
                </div>
            </div>
        </div>
    )
}

export default User;

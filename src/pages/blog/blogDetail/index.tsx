import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Blog } from '../../../models/Blog';
import { Spin, Alert, Breadcrumb } from 'antd';
import styles from "./blogDetail.module.css"

const getShortTitle = (title: string) => {
    let count = 0;
    let index = 0;
    for (index; index < title.length; index++) {
        if (title[index] === " ") {
            count++;
            if (count === 2) {
                break;
            }
        }
    }
    return count === 2 ? `${title.substring(0, index)}` : title
}
const BlogDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`https://665fbf245425580055b0b23d.mockapi.io/blogs/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBlog(data);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("An unknown error occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);


    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin tip="Loading..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto mt-10">
                <Alert message="Error" description={error} type="error" showIcon />
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="container mx-auto mt-10">
                <Alert message="No blog found" type="warning" showIcon />
            </div>
        );
    }

    return (
        <div className={`${styles.blogDetailContainer}`}>
            <div className='container mx-auto'>
                <Breadcrumb className=''
                    items={[
                        {
                            title: <Link style={{ color: " #5624d0", fontWeight: "700" }} to={"/"}>Home</Link>,
                        },
                        {
                            title: <Link style={{ color: " #5624d0", fontWeight: "700" }} to={"/blog"}>Blog</Link>,
                        },
                        {
                            title: <div >{getShortTitle(blog.title)}...</div>,
                        },
                    ]}
                />
            </div>
            <div className={`${styles.blogHeaderContainer} pt-10 pb-10`}>
                <div className='container mx-auto'>
                    <p>{blog.category}</p>
                    <h1 className=' text-3xl font-bold mb-4'>{blog.title}</h1>
                </div>
            </div>
            <div className={` mb-10 container mx-auto mt-10`}>

                <div className={`${styles.in4} text-gray-600 mt-10 mb-4`}>
                    <p className='font-bold'>{blog.name_user}</p>
                    <p>{blog.position}</p>
                </div>
                <p className='text-lg mb-4'>{blog.introduce}</p>
                {/* <img className='text-center' src={blog.blog_image} alt="" /> */}
                {blog.description.map((desc, index) => (
                    <div key={index} className='mb-4'>
                        <h2 className='text-xl font-semibold'>{desc.title}</h2>

                        {desc.content.map((contentItem, contentIndex) => (
                            <div key={contentIndex} className='mb-2'>
                                <p className='text-lg'>{contentItem.text}</p>
                                <div className='grid grid-cols-1 md:grid-cols-3 gap-20'>
                                    {contentItem.images && contentItem.images.map((image, imgIndex) => (
                                        <img key={imgIndex} src={image} alt={`content image ${contentIndex}-${imgIndex}`} className='mt-2' />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogDetail;

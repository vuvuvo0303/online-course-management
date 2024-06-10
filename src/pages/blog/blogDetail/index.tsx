import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Blog } from '../../../models/Blog'; // Ensure this path is correct
import { Spin, Alert } from 'antd'; // Import Ant Design components
import styles from "./blogDetail.module.css"

const BlogDetail = () => {
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
            } catch (error: any) {
                setError(error.message);
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
        <div className={`${styles.blogDetailContainer} container mx-auto mt-10`}>
            <p>{blog.category}</p>
            <h1 className='text-3xl font-bold mb-4'>{blog.title}</h1>
            <div className='text-gray-600 mb-4'>
                <p>{blog.name_user}</p>
            </div>
            <p className='text-lg mb-4'>{blog.introduce}</p>
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
    );
};

export default BlogDetail;

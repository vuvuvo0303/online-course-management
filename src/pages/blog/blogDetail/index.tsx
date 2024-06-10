/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Blog } from '../../../models'; // Assuming you have a Blog model
import { Spin, Alert } from 'antd'; // Import Ant Design components
import "../blog.module.css"; // Ensure you have necessary styles here

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
        return <div className="flex justify-center items-center h-screen">
            <Spin tip="Loading..." />
        </div>;
    }

    if (error) {
        return <div className="container mx-auto mt-10">
            <Alert message="Error" description={error} type="error" showIcon />
        </div>;
    }

    if (!blog) {
        return <div className="container mx-auto mt-10">
            <Alert message="No blog found" type="warning" showIcon />
        </div>;
    }

    return (
        <div className='container mx-auto mt-10'>
            <h1 className='text-3xl font-bold mb-4'>{blog.title}</h1>
            <div className='text-gray-600 mb-4'>
                <p>Category: {blog.category}</p>
                <p>Author: {blog.name_user}</p>
                <p>Published on: {new Date(blog.time).toLocaleDateString()}</p>
                <p>Views: {blog.view}</p>
            </div>
            <img src={blog.blog_image} alt={blog.title} className='w-full h-auto mb-6' />
            <p className='text-lg'>{blog.description}</p>
        </div>
    );
};

export default BlogDetail;

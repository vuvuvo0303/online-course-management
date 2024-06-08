import React, { useEffect, useState } from 'react';
import "./Blog.css";
import { Blog } from '../../models';
import { Col, Row, Pagination } from 'antd';
import { Link } from 'react-router-dom';

const BlogList: React.FC = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<{ [key: string]: number }>({});
    const blogsPerPage = 3;

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('https://665fbf245425580055b0b23d.mockapi.io/blogs');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBlogs(data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return <p className='loading'>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const groupedBlogs = blogs.reduce((acc: { [key: string]: Blog[] }, blog) => {
        if (!acc[blog.category]) {
            acc[blog.category] = [];
        }
        acc[blog.category].push(blog);
        return acc;
    }, {});

    const categories = Object.keys(groupedBlogs);

    const handlePageChange = (category: string, page: number) => {
        setCurrentPage(prev => ({ ...prev, [category]: page }));
    };

    const popularBlogs = [...blogs].sort((a, b) => b.view - a.view).slice(0, 3);

    return (
        <>
            <div className='box1 pt-12 pb-12'>
                <div className='container mx-auto grid grid-cols-2 gap-20 content-center'>
                    <div className=''>
                        <h1 className=''>Where possibilities begin</h1>
                        <p className='storyteller_desc '>We’re a leading marketplace platform for learning and teaching online. Explore some of our most popular content and learn something new.</p>
                    </div>
                    <div>
                        <img src="https://blog.udemy.com/wp-content/uploads/2021/07/reading-girl-2.png" alt="picture" />
                    </div>
                </div>
            </div>
            <div className='category-bar'>
                
            </div>
            <div className='popular container mx-auto mt-10'>
                <h1 className='mb-10'>Popular Blog</h1>
                <Row className='grid grid-cols-3 gap-20'>
                    {popularBlogs.map(blog => (
                        <Col className='blog-container' key={blog.id}>
                            <Link to={`/blogs/${blog.id}`}>
                                <p className='title'>{blog.title}</p>
                            </Link>
                            <div>
                                <p>{blog.category}</p>
                                <p>{new Date(blog.time).toLocaleDateString()}</p>
                                <p>Name: {blog.name_user}</p>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
            <div className="container mx-auto pt-10 pb-10">
                <div>
                    <h1 className='blog-page text-center'>Blog</h1>
                </div>

                {categories.map(category => {
                    const categoryCurrentPage = currentPage[category] || 1;
                    const indexOfLastBlog = categoryCurrentPage * blogsPerPage;
                    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
                    const currentBlogs = groupedBlogs[category]?.slice(indexOfFirstBlog, indexOfLastBlog);

                    return (
                        <div className='category-box' key={category}>
                            <h1 className='category-title'>{category}</h1>
                            <Row className='grid grid-cols-3 gap-20'>
                                {currentBlogs?.map(blog => (
                                    <Col key={blog.id}>
                                        <div className='blog-container'>
                                            <Link to={`/blogs/${blog.id}`}>
                                                <p className='title'>{blog.title}</p>
                                            </Link>
                                            <div>
                                                <p>{blog.category}</p>
                                                <p>{new Date(blog.time).toLocaleDateString()}</p>
                                                <p>Name: {blog.name_user}</p>
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                            <Pagination
                                current={categoryCurrentPage}
                                total={groupedBlogs[category]?.length || 0}
                                pageSize={blogsPerPage}
                                onChange={page => handlePageChange(category, page)}
                                className='pagination text-center'
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default BlogList;

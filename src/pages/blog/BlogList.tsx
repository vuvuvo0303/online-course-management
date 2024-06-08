import{ useEffect, useState } from 'react';
import { Blog } from '../../models';
import { Col, Row, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import styles from './blog.module.css';
const BlogList = () => {
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
        return <p className={styles.loading}>Loading...</p>; // Use CSS module class
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
            <div className={styles.box1}>
                <div className={`container mx-auto grid grid-cols-2 gap-20 ${styles.contentCenter}`}>
                    <div>
                        <h1>Where possibilities begin</h1>
                        <p className={styles.storytellerDesc}>We’re a leading marketplace platform for learning and teaching online. Explore some of our most popular content and learn something new.</p>
                    </div>
                    <div>
                        <img src="https://blog.udemy.com/wp-content/uploads/2021/07/reading-girl-2.png" alt="picture" />
                    </div>
                </div>
            </div>
            <div className={styles.categoryBar}></div>
            <div className={`${styles.popular} container mx-auto mt-10`}>
                <h1 className="mb-10">Popular Blog</h1>
                <Row className="grid grid-cols-3 gap-20">
                    {popularBlogs.map(blog => (
                        <Col className={styles.blogContainer} key={blog.id}>
                            <Link to={`/blogs/${blog.id}`}>
                                <p className={styles.title}>{blog.title}</p>
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
                    <h1 className={`${styles.blogPage} text-center`}>Blog</h1>
                </div>

                {categories.map(category => {
                    const categoryCurrentPage = currentPage[category] || 1;
                    const indexOfLastBlog = categoryCurrentPage * blogsPerPage;
                    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
                    const currentBlogs = groupedBlogs[category]?.slice(indexOfFirstBlog, indexOfLastBlog);

                    return (
                        <div className={styles.categoryBox} key={category}>
                            <h1 className={styles.categoryTitle}>{category}</h1>
                            <Row className="grid grid-cols-3 gap-20">
                                {currentBlogs?.map(blog => (
                                    <Col key={blog.id}>
                                        <div className={styles.blogContainer}>
                                            <Link to={`/blogs/${blog.id}`}>
                                                <p className={styles.title}>{blog.title}</p>
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
                                className={`${styles.pagination} text-center`}
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default BlogList;

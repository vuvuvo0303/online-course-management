import { useEffect, useState } from 'react';
import { Blog } from '../../models';
import { Link } from 'react-router-dom';
import styles from './blog.module.css';
import { Pagination } from 'antd';
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

        fetchBlogs();
    }, []);

    if (loading) {
        return <p className={styles.loading}>Loading...</p>; // Use CSS module className
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
        <div className={styles.blogPageContainer}>
            <div id="animation-carousel" className="relative w-full" data-carousel="static">

                <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                 
                    <div className="hidden duration-200 ease-linear" data-carousel-item>
                        <img src="/docs/images/carousel/carousel-1.svg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
                    </div>
                   
                    <div className="hidden duration-200 ease-linear" data-carousel-item>
                        <img src="/docs/images/carousel/carousel-2.svg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
                    </div>
                   
                    <div className="hidden duration-200 ease-linear" data-carousel-item="active">
                        <img src="/docs/images/carousel/carousel-3.svg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
                    </div>
               
                    <div className="hidden duration-200 ease-linear" data-carousel-item>
                        <img src="/docs/images/carousel/carousel-4.svg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
                    </div>
                 
                    <div className="hidden duration-200 ease-linear" data-carousel-item>
                        <img src="/docs/images/carousel/carousel-5.svg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
                    </div>
                </div>
           
                <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
                        </svg>
                        <span className="sr-only">Previous</span>
                    </span>
                </button>
                <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                        </svg>
                        <span className="sr-only">Next</span>
                    </span>
                </button>
            </div>
            <div className={styles.box1}>
                <div className={`container mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 ${styles.contentCenter}`}>
                    <div>
                        <h1>Where possibilities begin</h1>
                        <p className={styles.storytellerDesc}>We’re a leading marketplace platform for learning and teaching online. Explore some of our most popular content and learn something new.</p>
                    </div>
                    <div >
                        <img src="https://blog.udemy.com/wp-content/uploads/2021/07/reading-girl-2.png" alt="picture" />
                    </div>
                </div>
            </div>
            <div className={styles.categoryBar}></div>
            <div className={`${styles.popular} container mx-auto mt-10`}>
                <h1 className={`${styles.popular} mb-10 font-bold`}>Popular Blog</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
                    {popularBlogs.map(blog => (
                        <div className={styles.blogContainer} key={blog.id}>
                            <p>{blog.category}</p>
                            <Link to={`/blogs/${blog.id}`}>
                                <p className={styles.title}>{blog.title}</p>
                            </Link>
                            <div>

                                <p>{new Date(blog.time).toLocaleDateString()}</p>
                                <p>Name: {blog.name_user}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="container mx-auto pt-10 pb-10">
                {/* <div>
                    <h1 className={`${styles.blogPage} text-center`}>Blog</h1>
                </div> */}

                {categories.map(category => {
                    const categoryCurrentPage = currentPage[category] || 1;
                    const indexOfLastBlog = categoryCurrentPage * blogsPerPage;
                    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
                    const currentBlogs = groupedBlogs[category]?.slice(indexOfFirstBlog, indexOfLastBlog);

                    return (
                        <div className={styles.categoryBox} key={category}>
                            <h1 className={styles.categoryTitle}>{category}</h1>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
                                {currentBlogs?.map(blog => (
                                    <div key={blog.id}>
                                        <div className={styles.blogContainer}>
                                            <Link to={`/blogs/${blog.id}`}>
                                                <p className={styles.title}>{blog.title}</p>
                                            </Link>
                                            <div>

                                                <p>{new Date(blog.time).toLocaleDateString()}</p>
                                                <p>Name: {blog.name_user}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
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
        </div>
    );
};

export default BlogList;

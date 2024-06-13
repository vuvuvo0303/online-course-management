import { useEffect, useState } from 'react';
import { Blog } from '../../models';
import { Link } from 'react-router-dom';
import styles from './blog.module.css';
import { Input, Pagination, Row } from 'antd';

const BlogList: React.FC = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>(""); // Thêm trạng thái cho giá trị tìm kiếm
    const blogsPerPage = 3;

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('https://665fbf245425580055b0b23d.mockapi.io/blogs');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const sortedBlogs = data.sort((a: Blog, b: Blog) => new Date(b.time).getTime() - new Date(a.time).getTime());
                setBlogs(sortedBlogs);
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

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Đặt lại trang hiện tại về 1 khi thay đổi giá trị tìm kiếm
    };

    const handleViewUpdate = async (blogId: string) => {
        const updatedBlogs = blogs.map(blog => {
            if (blog.id === blogId) {
                return { ...blog, view: blog.view + 1 };
            }
            return blog;
        });

        setBlogs(updatedBlogs);

        try {
            await fetch(`https://665fbf245425580055b0b23d.mockapi.io/blogs/${blogId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ view: updatedBlogs.find(blog => blog.id === blogId)?.view }),
            });
        } catch (error) {
            console.error('Failed to update view count:', error);
        }
    };

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.name_user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.introduce.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.description.some(desc =>
            desc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            desc.content.some(content =>
                content.text.toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
    );

    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

    return (
        <div className={styles.blogPageContainer}>
            <div className='container mx-auto grid grid-cols-1 md:grid-cols-6 gap-10'>
                <div className="md:col-span-2 mt-10">
                    <div className={styles.searchBox}>
                        <div className={styles.searchContainer}>
                            <Input
                                className='inputSearch'
                                type="text"
                                placeholder='Search'
                                value={searchTerm}
                                onChange={handleSearchChange} // Gắn hàm xử lý thay đổi giá trị tìm kiếm
                            />
                        </div>
                        <div className={styles.socialNetwork}>
                            <div className={`${styles.x} text-center mb-2`}>
                                <Link to={"https://www.facebook.com/gao.leminh"} className=''>Follow</Link>
                            </div>
                            <div className={`${styles.facebook} text-center`}>
                                <Link to={"https://www.facebook.com/gao.leminh"}>Follow</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:col-span-4 mt-10 pb-10">
                    <div className="grid gap-10">
                        {currentBlogs.map(blog => (
                            <Link to={`/blog/${blog.id}`} onClick={() => handleViewUpdate(blog.id)}>
                                <div key={blog.id} className={`${styles.blogContainer} grid gird-cols-1 md:grid-cols-2 gap-5 `}>
                                    <div className={`${styles.imgContainer}`}>
                                        <img className='xs:h-48 w-96' src={blog.blog_image} alt="Blog image" />
                                    </div>
                                    <div>
                                        <div >
                                        <p>{blog.category}</p>
                                       
                                        </div>
                                        <div className='grid grid-cols-2 gap-0'>
                                            <p >{blog.view === 1 ? `${blog.view} view` : `${blog.view} views`}  </p>
                                            <p>{new Date(blog.time).toLocaleDateString()}</p>
                                            
                                        </div>
                                        <p className={styles.title}>{blog.title}</p>

                                        <div>
                                        <p> {blog.name_user}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                        ))}
                    </div>
                    <Pagination
                        current={currentPage}
                        total={filteredBlogs.length}
                        pageSize={blogsPerPage}
                        onChange={handlePageChange}
                        className={`${styles.pagination} text-center`}
                    />
                </div>
            </div>
        </div>
    );
};

export default BlogList;

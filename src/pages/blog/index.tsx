import { useEffect, useState } from 'react';
import { Blog } from '../../models';
import { Link } from 'react-router-dom';
import styles from './blog.module.css';
import { Breadcrumb, Input, Pagination, Checkbox, Tag } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const BlogList: React.FC = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
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
        setCurrentPage(1);
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

    const uniqueCategories = [...new Set(blogs.map(blog => blog.category))];

    const handleCategoryChange = (category: string, checked: boolean) => {
        setSelectedCategories(prevCategories =>
            checked ? [...prevCategories, category] : prevCategories.filter(cat => cat !== category)
        );
        setCurrentPage(1);
    };

    const filteredBlogs = blogs.filter(blog =>
        (blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.name_user.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.introduce.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.description.some(desc =>
                desc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                desc.content.some(content =>
                    content.text.toLowerCase().includes(searchTerm.toLowerCase())
                )
            )) &&
        (selectedCategories.length === 0 || selectedCategories.includes(blog.category))
    );

    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

    return (
        <div className={styles.blogPageContainer}>
            <Breadcrumb className='container mx-auto mt-10'
                items={[
                    {
                        title: <Link style={{ color: " #5624d0", fontWeight: "700" }} to={"/"}>Home</Link>,
                    },
                    {
                        title: <div >Blog</div>,
                    },
                ]}
            />
            <div className='container mx-auto grid grid-cols-1 md:grid-cols-6 gap-10'>
                <div className="md:col-span-1 mt-10">
                    <div className={styles.searchBox}>
                        <div className={styles.searchContainer}>
                            <Input
                                className='inputSearch'
                                type="text"
                                placeholder='Search'
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </div>
                        <div className={styles.categoryFilter}>
                            {uniqueCategories.map(category => (
                                <div key={category}>
                                    <Checkbox
                                        checked={selectedCategories.includes(category)}
                                        onChange={e => handleCategoryChange(category, e.target.checked)}
                                    >
                                        {category}
                                    </Checkbox>
                                </div>
                            ))}
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
                <div className="md:col-span-5 mt-10 pb-10">
                    <div className="grid gap-5">
                        {currentBlogs.map(blog => (
                            <Link to={`/blog/${blog.id}`} onClick={() => handleViewUpdate(blog.id)} key={blog.id}>
                                <div className={`${styles.blogContainer} grid gird-cols-1 md:grid-cols-6  gap-10 `}>
                                    <div className={`${styles.imgContainer} md:col-span-2 `}>
                                        <img className='xs:h-48 w-96' src={blog.blog_image} alt="Blog image" />
                                    </div>
                                    <div className='md:col-span-4'>
                                        <Tag bordered={false} color="orange" className='float-right px-10 '>
                                            <p className=''>{blog.category}</p>
                                        </Tag>

                                        <div className=' grid grid-cols-2 md:grid-cols-6 gap-0'>
                                            <p className='md:col-span-1'>{blog.view === 1 ? `${blog.view} view` : `${blog.view} views`}  </p>
                                            <p className='md:col-span-1'>{new Date(blog.time).toLocaleDateString()}</p>
                                        </div>
                                        <p className={styles.title}>{blog.title}</p>
                                        <p className={styles.introduce}>{blog.introduce}</p>
                                        <div>
                                            <p> {blog.name_user}</p>
                                        </div>


                                        <button className={styles.readMore}>
                                            <div className={` font-bold`}>
                                                Read More
                                                <ArrowRightOutlined className={styles.arrowIcon} />
                                            </div>
                                            
                                        </button>



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
        </div >
    );
};

export default BlogList;

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Blog } from '../../../models/Blog';
import { Spin, Alert, Breadcrumb } from 'antd';
import styles from "./blogDetail.module.css"
import { ShareAltOutlined } from '@ant-design/icons';

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
                <Breadcrumb className='py-3'
                    items={[
                        {
                            title: <Link style={{ color: " #5624d0", fontWeight: "700" }} to={"/"}>Home</Link>,
                        },
                        {
                            title: <Link style={{ color: " #5624d0", fontWeight: "700" }} to={"/blog"}>Blog</Link>,
                        },
                        {
                            title: <div >{blog.title}</div>,
                        },
                    ]}
                />
            </div>
            <div className='px-0 w-full mx-auto'>
                <div className='bg-white-transparent py-11 px-3 w-full relative'>
                    <div className='max-w-[810px] px-7 mx-auto relative'>
                        <div>
                            <div>
                                <div className={styles.article_category}>{blog.category}</div>
                                <h1 className={styles.article_title}>{blog.title}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.meta_section_border}>
                <div className={styles.meta_section}>
                    <div className={styles.author_col}>
                        {/* <div className={styles.author_avatar_section}>{blog.avatar_user}</div> */}
                        <div className='pr-3'>
                            <div className={styles.author_name}>{blog.name_user}</div>
                            <div className={styles.author_title}>{blog.position}</div>
                        </div>
                    </div>
                    <div className={styles.share_col}>
                        <Link to="/" className={styles.share_article_button}>Share this article
                            <span className='mt-2'>
                                <ShareAltOutlined className='ml-2' />
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

            <div className={styles.main_article}>
                <p className='mt-0 mb-4 text-lg'>Are you a die-hard motorsports enthusiast? Do you dream of getting behind the wheel of a McLaren race car? Or, are you just wondering what’s all this racing hype about? If so, we have the perfect course to fuel your passion and accelerate your knowledge of racing. We’re excited to introduce the new McLaren 101 course, available for FREE on Udemy, created for individuals who love McLaren and want to see behind the scenes, or those who want to get a deeper understanding of McLaren Racing’s heritage and extraordinary accomplishments. I mean, they have 20 F1 World Championships!</p>
                <footer className='mb-6'>
                    <p className='mt-0 mb-4'>
                        <em>Page Last Updated: </em>
                        <span className='font-normal'> November 2023</span>
                    </p>
                    <div className={`${styles.footer_author_border_top} p-10`}>
                        <div className={styles.footer_author_section}>
                            <div className='flex'>
                                <div className='w-full flex'>
                                    {/* <div>{blog.avatar_user}</div> */}
                                    <div className='pr-4'>
                                        <div className={styles.author_name}>{blog.name_user}</div>
                                        <div className={styles.author_title}>{blog.position}</div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.author_link_header}>
                                Recent Articles by {blog.name_user}
                            </div>
                            <ul className='mt-0 mb-4'>
                                <li className='list-disc ml-10'>
                                    <a className="text-[#5624d0]" href="https://blog.udemy.com/mclaren-racing-learning-skills-partner/">How Racing and Skills Meet in the McLaren and FLearn Partnership</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </footer>
            </div>
            <div className={`${styles.teach_section}`}>
                <div className={styles.teach_section_container}>
                    <div className='items-center flex flex-wrap mx-[-15px]'>
                        <div className={`${styles.col_md_6} ${styles.padding_2side}`}>
                            <h3 className={styles.teach_title}>Teach the World Online</h3>
                            <div>
                                Create an online video course, reach students across the globe, and earn money.
                            </div>
                        </div>
                        <div className={`${styles.col_md_6} text-right`}>
                            <Link to="/teaching" target='_blank' className={styles.teach_button}>Teach on FLearn</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;

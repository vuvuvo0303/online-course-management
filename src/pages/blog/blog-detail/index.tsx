import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Blog } from '../../../models/Blog';
import { Spin, Alert } from 'antd';
import styles from "./blogDetail.module.css"
import { ShareAltOutlined } from '@ant-design/icons';
import axiosInstance from '../../../services/axiosInstance';
import { API_CLIENT_GET_BLOG, paths } from '../../../consts';
import { format } from 'date-fns';
import CustomBreadcrumb from '../../../components/breadcrumb';
import parse from 'html-react-parser';

const BlogDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const getBlog = async () => {
        const response = await axiosInstance.get(`${API_CLIENT_GET_BLOG}/${id}`);
        setBlog(response.data);
        setLoading(false);
    };


    useEffect(() => {
        getBlog();
    }, []);


    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin tip="Loading..." />
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
                <CustomBreadcrumb currentTitle='Blog' currentHref={paths.HOME} />
            </div>
            <div className='px-0 w-full mx-auto'>
                <div className='bg-white-transparent py-11 px-3 w-full relative'>
                    <div className='max-w-[810px] px-7 mx-auto relative'>
                        <div>
                            <div>
                                <div className={styles.article_category}>{blog.category_name}</div>
                                <h1 className={styles.article_title}>{blog.name}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.meta_section_border}>
                <div className={styles.meta_section}>
                    <div className={styles.author_col}>
                        <div className='pr-3'>
                            <div className={styles.author_name}>{blog.user_name}</div>
                            <div className=''>FLearn</div>
                        </div>
                    </div>
                    <div className={styles.share_col}>
                        <Link to={paths.HOME} className={styles.share_article_button}>Share this article
                            <span className='mt-2'>
                                <ShareAltOutlined className='ml-2' />
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

            <div className={styles.main_article}>
                <img className={styles.image_url} src={blog.image_url} alt={blog.name} />
                <h2 className='main_h2 mt-5'>{blog.description}</h2>
                <p className='mt-0 mb-4 text-lg'>{parse(blog.content)}</p>
                <footer className='mb-6'>
                    <p className='mt-0 mb-4'>
                        <em>Page Last Updated: </em>
                        <span className='font-normal'> {format(blog.updated_at, "dd/MM/yyyy")}</span>
                    </p>
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
                            <Link to={paths.TEACHING} target='_blank' className={styles.teach_button}>Teach on FLearn</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;

import { useEffect, useState } from 'react';
import { Blog } from '../../models';
import styles from './blog.module.css';
import { useNavigate } from 'react-router-dom';
import { getBlogs, handleGetBlogDetail } from '../../services';

const BlogList: React.FC = () => {
    const [dataBlogs, setDataBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await getBlogs();
        setDataBlogs(response.data.pageData);
        setLoading(false);
    }


    if (loading) {
        return <p className={styles.loading}>Loading...</p>;
    }

    return (
        <>
            <div className='pt-12 pb-4'>
                <div className='flex flex-wrap ml-10'>
                    <h1 className='main_h1'>All Blogs</h1>
                </div>
            </div>
            <div className={styles.blog_grid}>

                {dataBlogs.map(blog => (
                    <div
                        key={blog._id}
                        onClick={() => handleGetBlogDetail(blog._id, navigate)}
                        className={styles.blog_card}
                    >
                        <div className={styles.blog_card_border}>
                            <div>
                                <div className={styles.blog_categories}>{blog.category_name}</div>
                                <h3 className={'text-[#1c1d1f] main_h3'}>{blog.name}</h3>
                                <div className={styles.author_name}>
                                    <span className={styles.align_middle}></span>
                                    <span>{blog.user_name}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default BlogList;

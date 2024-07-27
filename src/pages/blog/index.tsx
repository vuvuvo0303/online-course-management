import { useEffect, useState } from 'react';
import { Blog } from '../../models';
import styles from './blog.module.css';
import axiosInstance from '../../services/axiosInstance';
import { API_CLIENT_GET_BLOG, API_CLIENT_GET_BLOGS } from '../../consts/index';
import { useNavigate } from 'react-router-dom';

const BlogList: React.FC = () => {
    const [dataBlogs, setDataBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    const getBlogs = async () => {
        try {
            const response = await axiosInstance.post(API_CLIENT_GET_BLOGS,
                {
                    "searchCondition": {
                        "category_id": "",
                        "is_deleted": false
                    },
                    "pageInfo": {
                        "pageNum": 1,
                        "pageSize": 100
                    }
                }
            );
            setDataBlogs(response.data.pageData)
        } catch (error) {
            //
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {


        getBlogs();
    }, []);

    if (loading) {
        return <p className={styles.loading}>Loading...</p>; // Use CSS module className
    }

    const handleGetBlogDetail = (_id: string) => {
        navigate(`/blog/${_id}`)
    }


    return (
        <div>
            {
                dataBlogs.map(blog => (
                    <div key={blog._id} className={styles.blogItem}>
                        <h3>{blog.name}</h3>
                        <button onClick={() => handleGetBlogDetail(blog._id)}>
                            View Details
                        </button>
                    </div>
                ))
            }
        </div>
    );
};

export default BlogList;

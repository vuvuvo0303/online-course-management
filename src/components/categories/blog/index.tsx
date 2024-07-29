import { Card } from 'antd';
import "react-multi-carousel/lib/styles.css";
import Carousel from 'react-multi-carousel';
import './blog.css';
import { useEffect, useState } from 'react';
import { Blog } from '../../../models';
import { getBlogs, handleGetBlogDetail } from '../../../services';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

const HomeBlog: React.FC = () => {
    const [dataBlog, setDataBlog] = useState<Blog[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await getBlogs();
        setDataBlog(response.data.pageData);
    }


    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };


    return (
        <div className="section_blog-1 w-full">
            <div className="container-1">
                <div className="block-title-1">
                    <p>Blog &amp; Updated</p>
                    <h2 title="Daily News">Daily Blog</h2>
                </div>
                <div className="block-content">
                    <div className="margin-am">
                        <Carousel responsive={responsive}>
                            {dataBlog.map((blog) => (
                                <div key={blog._id}>
                                    <a target="_blank" rel="noopener noreferrer">
                                        <Card
                                            onClick={() => handleGetBlogDetail(blog._id, navigate)}
                                            hoverable
                                            style={{ margin: '10px', backgroundColor: 'lightgray' }}
                                            cover={<img alt={blog.name} src={blog.image_url} style={{ borderRadius: '10px', height: '200px' }} />}
                                        >
                                            <Meta
                                                title={blog.name}
                                                description={format(blog.updated_at, "dd/MM/yyyy")}
                                            />
                                        </Card>
                                    </a>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeBlog;
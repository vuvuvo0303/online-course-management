import { Component } from 'react';
import './New.css';

interface BlogPost {
    title: string;
    link: string;
    imgSrc: string;
    imgAlt: string;
    date: string;
    author: string;
}

interface BlogSectionProps { }
interface BlogSectionState {
    blogPosts: BlogPost[];
}

class BlogSection extends Component<BlogSectionProps, BlogSectionState> {
    constructor(props: BlogSectionProps) {
        super(props);
        this.state = {
            blogPosts: [
                {
                    title: "FPT Software Japan develops IT for the Japanese airline...",
                    link: "https://vnexpress.net/fpt-software-japan-phat-trien-cntt-cho-tap-doan-hang-khong-nhat-4747733.html",
                    imgSrc: "https://media.istockphoto.com/id/1456699734/vi/anh/k%E1%BB%B9-s%C6%B0-trao-%C4%91%E1%BB%95i-v%E1%BB%9Bi-nh%C3%A0-th%E1%BA%A7u-%C4%91%E1%BB%83-gi%C3%A1m-s%C3%A1t-v%C3%A0-l%C3%AAn-k%E1%BA%BF-ho%E1%BA%A1ch-cho-c%C3%B4ng-vi%E1%BB%87c.jpg?s=612x612&w=0&k=20&c=evg_rR5foq8HDcVxtr7OeiUXMDUDUDD-y8idYQ3NIr4=",
                    imgAlt: "FPT Software Japan develops IT for the Japanese airline group",
                    date: "Monday, March 11, 2024",
                    author: "admin",
                },
                {
                    title: "What do Vietnamese technology enterprises care...",
                    link: "https://vnexpress.net/doanh-nghiep-cong-nghe-viet-quan-tam-gi-khi-ra-nuoc-ngoai-4576554.html",
                    imgSrc: "https://media.istockphoto.com/id/1334261969/vi/anh/c%C3%A1c-k%E1%BB%B9-s%C6%B0-x%C3%A2y-d%E1%BB%B1ng-th%E1%BA%A3o-lu%E1%BA%ADn-v%E1%BB%9Bi-nh%C3%A0-thi%E1%BA%BFt-k%E1%BA%BF-t%E1%BA%A1i-c%C3%B4ng-tr%C6%B0%E1%BB%9Dng-x%C3%A2y-d%E1%BB%B1ng-ho%E1%BA%B7c-c%C3%B4ng-tr%C6%B0%E1%BB%9Dng-x%C3%A2y.jpg?s=612x612&w=0&k=20&c=PEa7agsKdWVtz56YrfvI5vFo3InhxwFcDgLu3XikcnI=",
                    imgAlt: "What do Vietnamese technology enterprises care about when going abroad?",
                    date: "Monday, March 11, 2024",
                    author: "admin",
                },
                {
                    title: "Can I get my money back if I leave mid-course?",
                    link: "https://vnexpress.net/co-lay-lai-duoc-tien-khi-nghi-giua-khoa-hoc-khong-4670412.html",
                    imgSrc: "https://media.istockphoto.com/id/1334261969/vi/anh/c%C3%A1c-k%E1%BB%B9-s%C6%B0-x%C3%A2y-d%E1%BB%B1ng-th%E1%BA%A3o-lu%E1%BA%ADn-v%E1%BB%9Bi-nh%C3%A0-thi%E1%BA%BFt-k%E1%BA%BF-t%E1%BA%A1i-c%C3%B4ng-tr%C6%B0%E1%BB%9Dng-x%C3%A2y-d%E1%BB%B1ng-ho%E1%BA%B7c-c%C3%B4ng-tr%C6%B0%E1%BB%9Dng-x%C3%A2y.jpg?s=612x612&w=0&k=20&c=PEa7agsKdWVtz56YrfvI5vFo3InhxwFcDgLu3XikcnI=",
                    imgAlt: "Can I get my money back if I leave mid-course?",
                    date: "Monday, March 11, 2024",
                    author: "admin",
                },
                {
                    title: "A 17-year-old male student studying FUNiX transferred...",
                    link: "https://vnexpress.net/nam-sinh-17-tuoi-hoc-funix-chuyen-tiep-du-hoc-dai-hoc-my-4648421.html",
                    imgSrc: "https://media.istockphoto.com/id/1334261969/vi/anh/c%C3%A1c-k%E1%BB%B9-s%C6%B0-x%C3%A2y-d%E1%BB%B1ng-th%E1%BA%A3o-lu%E1%BA%ADn-v%E1%BB%9Bi-nh%C3%A0-thi%E1%BA%BFt-k%E1%BA%BF-t%E1%BA%A1i-c%C3%B4ng-tr%C6%B0%E1%BB%9Dng-x%C3%A2y-d%E1%BB%B1ng-ho%E1%BA%B7c-c%C3%B4ng-tr%C6%B0%E1%BB%9Dng-x%C3%A2y.jpg?s=612x612&w=0&k=20&c=PEa7agsKdWVtz56YrfvI5vFo3InhxwFcDgLu3XikcnI=",
                    imgAlt: "A 17-year-old male student studying FUNiX transferred to study at an American university",
                    date: "Monday, March 11, 2024",
                    author: "admin",
                }
            ]
        };
    }

    render() {
        return (
            <div className="section_blog-1">
                <div className="container-1">
                    <div className="block-title-1">
                        <p>News &amp; Updated</p>
                        <h2><a href="#" title="Daily News">Daily News</a></h2>
                    </div>
                    <div className="block-content">
                        <div className="margin-am">
                            <div className="swiper-container swiper-blog swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events" style={{ cursor: "grab" }}>
                                <div className="swiper-wrapper">
                                    {this.state.blogPosts.map((post, index) => (
                                        <div key={index} className="swiper-slide" style={{ width: "270px", marginRight: "30px" }}>
                                            <div className="item-blog">
                                                <div className="block-thumb">
                                                    <a className="thumb" href={post.link} title={post.title}>
                                                        <img className="img-responsive lazyload loaded" src={post.imgSrc} alt={post.imgAlt} data-was-processed="true" />
                                                    </a>
                                                </div>
                                                <div className="block-info">
                                                    <div className="post">
                                                        <div className="time-post f">
                                                            <b>{post.date}</b>
                                                        </div>
                                                        -
                                                        <div className="time-post">
                                                            <span>{post.author}</span>
                                                        </div>
                                                    </div>
                                                    <h3 style={{ fontWeight: 'bold' }}>
                                                        <a href={post.link} title={post.title}>{post.title}</a>
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BlogSection;
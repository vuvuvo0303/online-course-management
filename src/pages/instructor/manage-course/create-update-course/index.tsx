import axios from "axios";
// import { useEffect, useState } from "react";
import { Course } from "../../../../models";
import { host_main } from "../../../../consts";
import { useParams } from "react-router-dom";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Form, Input } from 'antd';
import { toast } from "react-toastify";

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};

const InstructorCreateCourse = () => {
    // const [cates, setCates] = useState<Category[]>([]);
    // const [loading, setLoading] = useState<boolean>(false);
    const { _id } = useParams<{ _id: string }>();
    console.log("check id: ", _id);

    // useEffect(() => {
    //     const fetchCategories = async () => {
    //         try {
    //             const res = await axios.get<Category[]>(`${host_main}/api/categories`);
    //             if (res) {
    //                 setCates(res.data);
    //             }
    //         } catch (error) {
    //             console.log("Erro occurred: ", error);
    //         }
    //     };
    //     fetchCategories();
    // }, []);

    // if (loading) {
    //     return <p className="text-center">Loading ...</p>;
    // }

    const onFinish = async (value: Course) => {
      
        if (typeof value.price === 'string') {
            value.price = parseFloat(value.price);
        }
        if (typeof value.discount === 'string') {
            value.discount = parseFloat(value.discount);
        }
        console.log("check value: ", value);
        try {
            // const token = localStorage.getItem("token");
            const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ODRhYjg2NjYzMDUyNzk1ZGIwMjY4NyIsInJvbGUiOiJpbnN0cnVjdG9yIiwiaWF0IjoxNzE5OTc0NjIxLCJleHAiOjE3MjAwMDM0MjF9.eyv56158E0AMX-6kV8c4h69JTZQVDU4jAMoIlxRLUTY`;
           //Update Course
            if (_id) {
                await axios.post<Course>(`${host_main}/api/course/${_id}`, value,
                     {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                toast.success("Update New Course Successfully");

            } 
               //Create Course
            else {
                await axios.post<Course>(`${host_main}/api/course`, value, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                toast.success("Create New Course Successfully");
            }
        } catch (error) {
            console.log("Error Occurred: ", error.response.data.errors[0].message);
            toast.error(error.response.data.errors[0].message);
        }
    };
    // const sampleData = {
    //     name: "JavaScript Basics",
    //     category_id: "66846866d0453f1d754a5aa2", // ID của danh mục mẫu
    //     description: "This course covers the basics of JavaScript, including syntax, variables, functions, and more.",
    //     content: "Introduction to JavaScript, Variables and Data Types, Functions, Control Flow, Loops, Objects, Arrays, DOM Manipulation, Events, AJAX, ES6+ features.",
    //     video_url: "https://example.com/js-basics-video",
    //     image_url: "https://example.com/js-basics-image.jpg",
    //     price: 100,
    //     discount: 20,
    // };
    return (
        <>
            <Breadcrumb
                items={[
                    {
                        href: '/instructor/dashboard',
                        title: <HomeOutlined />,
                    },
                    {
                        href: '/instructor/manage-courses',
                        title: (
                            <>
                                <UserOutlined />
                                <span>Manage Courses</span>
                            </>
                        ),
                    },
                    {
                        title: <>{_id ? "Update Course" : "Create Course"}</>,
                    },
                ]}
            />
            {_id !== undefined && _id !== "" ? (
                <h1 className="text-center">Update Course</h1>
            ) : (
                <h1 className="text-center">Create Course</h1>
            )}


            <div>
                <Form {...formItemLayout} onFinish={onFinish} variant="filled" className="text-center">
                    <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        initialValue={"66846866d0453f1d754a5aa2"}
                        label="Category"
                        name="category_id"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Input />
                        {/* <Select>
                            {cates.map((cate) => (
                                <Select.Option key={cate._id} value={cate._id}>
                                    {cate.name}
                                </Select.Option>
                            ))}
                        </Select> */}
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item
                        label="Content"
                        name="content"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item
                        label="Video_url"
                        name="video_url"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item  label="Image_url" name="image_url" rules={[{ required: true, message: 'Please input!' }]}>
                        <Input  />
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Please input a number!' }]}
                    >
                        <Input type="number " />
                    </Form.Item>
                    <Form.Item
                        label="Discount"
                        name="discount"
                        rules={[{ required: true, message: 'Please input a number!' }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default InstructorCreateCourse;

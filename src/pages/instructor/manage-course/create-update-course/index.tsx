import { Category, Course } from "../../../../models";
import { API_CREATE_COURSE, API_GET_COURSE, API_UPDATE_COURSE } from "../../../../consts";
import { useNavigate, useParams } from "react-router-dom";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Form, Input, message, Select } from 'antd';
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { Editor } from '@tinymce/tinymce-react';
import axiosInstance from "../../../../services/axiosInstance.ts";
import { getCategories } from "../../../../services/category.ts";
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

const InstructorCreateCourse: React.FC = () => {
    const [des, setDes] = useState<string>("");
    const navigate = useNavigate();
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { id, _id } = useParams<{ _id: string, id: string }>();
    const [form] = useForm();
    const token = localStorage.getItem("token");
    const [value, setValue] = useState<string>('Enter something here');
    // Fetch course
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await
                    axiosInstance.get(`${API_GET_COURSE}/${_id}`)
                if (response) {
                    const data = response.data
                    form.setFieldsValue({
                        name: data?.name,
                        category_id: data?.category_id,
                        description: data?.description,
                        status: data?.status,
                        video_url: data?.video_url,
                        image_url: data?.image_url,
                        price: data?.price,
                        discount: data?.discount
                    })
                    setValue(data.description);
                }
            } catch (error) {
                console.log("Error occurred: ", error);
            }
        }
        if (_id) {
            fetchCourse();
        }
    }, [_id, form])

    useEffect(() => {
        const fetchData = async () => {
            const dataCategories = await getCategories();
            setCategories(dataCategories);
        }
        fetchData();
    }, [token]);

    if (loading) {
        return <p className="text-center">Loading ...</p>;
    }
    function isValidHttpUrl(string: string) {
        let url;

        try {
            url = new URL(string);
        } catch (_) {
            return false;
        }

        return url.protocol === "http:" || url.protocol === "https:";
    }

    const onFinish = async (values: Course) => {
        if (typeof values.price === 'string') {
            values.price = parseFloat(values.price);
        }
        if (typeof values.discount === 'string') {
            values.discount = parseFloat(values.discount);
        }
        if (!des) {
            //if instructor don't change description
            values.description = value;
        } else {
            values.description = des;
        }

        try {
            //Update Course
            if (_id) {
                await axiosInstance.put<Course>(`${API_UPDATE_COURSE}/${_id}`, values,);
                message.success("Update New Course Successfully");
                if (id) {
                    navigate(`/instructor/manage-courses/${_id}`);
                } else {
                    navigate(`/instructor/manage-courses`);
                }
            }
            //Create Course
            else {
                await axiosInstance.post(API_CREATE_COURSE, values, {

                });
                message.success("Create New Course Successfully");
                navigate(`/instructor/manage-courses`);
            }
        } catch (error) {
            //
        }
    };

    const handleEditorChange = (value: string) => {
        setDes(value);
    };

    return (
        <>
            {
                id ?
                    (
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
                                    href: (`/instructor/manage-courses/${id}`),
                                    title: (
                                        <>
                                            <UserOutlined />
                                            <span>Course Detail </span>
                                        </>
                                    ),
                                },

                                {
                                    title: <>{_id ? "Update Course" : "Create Course"}</>,
                                },
                            ]}
                        />
                    )
                    :
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
                                        <span>Manage Courses</span>
                                    </>
                                ),
                            },
                            {
                                title: <>{_id ? "Update Course" : "Create Course"}</>,
                            },
                        ]}
                    />
            }
            {_id !== undefined && _id !== "" ? (
                <h1 className="text-center">Update Course</h1>
            ) : (
                <h1 className="text-center">Create Course</h1>
            )}


            <div>
                <Form {...formItemLayout} onFinish={onFinish} form={form} variant="filled" >
                    <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item

                        label="Category"
                        name="category_id"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >

                        <Select>
                            {categories.map((category) => (
                                <Select.Option key={category._id} value={category._id}>
                                    {category.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                    >
                        <Editor
                            apiKey="oppz09dr2j6na1m8aw9ihopacggkqdg19jphtdksvl25ol4k"
                            init={{
                                placeholder: "Description",
                                height: 200,
                                menubar: true,
                                plugins: [
                                    "advlist autolink lists link image charmap print preview anchor",
                                    "searchreplace visualblocks code fullscreen textcolor",
                                    "insertdatetime media table paste code help wordcount",
                                ],
                                forced_root_block: '', // Thiết lập này vô hiệu hóa thẻ <p>
                                textcolor_rows: "4",
                                toolbar:
                                    "undo redo | styleselect | fontsizeselect| code | bold italic | alignleft aligncenter alignright alignjustify | outdent indent",
                                // Bạn có thể thêm các cấu hình khác nếu cần
                            }}
                            onEditorChange={handleEditorChange}
                        />
                    </Form.Item>
                    {
                        !_id && <Form.Item
                            label="Content"
                            name="content"
                            rules={[{ required: true, message: 'Please input!' }]}
                        >
                            <Input.TextArea />
                        </Form.Item>
                    }
                    <Form.Item
                        label="Video_url"
                        name="video_url"
                        rules={[{ required: true, message: 'Please input!' },
                        {
                            validator: (_, value) =>
                                isValidHttpUrl(value) ? Promise.resolve() : Promise.reject('This is not a video url'),
                        }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    {
                        <Form.Item label="Image_url"
                            name="image_url"
                        // rules={[
                        //     {
                        //         validator: (_, value) =>
                        //             !value || isValidHttpUrl(value)
                        //                 ? Promise.resolve() : Promise.reject(new Error('This is not a valid image URL')),

                        //     }
                        // ]}
                        >
                            <Input />
                        </Form.Item>
                    }
                    <Form.Item
                        label="Price(vnd)"
                        name="price"
                        rules={[{ required: true, message: 'Please input a number!' },
                        {
                            validator: (_, value) =>
                                value > 1000 ? Promise.resolve() : Promise.reject('Price must be greater than 1000!'),
                        },]}
                    >
                        <Input type="number" />
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

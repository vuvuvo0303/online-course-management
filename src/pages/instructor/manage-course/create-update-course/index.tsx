import axios from "axios";
// import { useEffect, useState } from "react";
import { Category, Course } from "../../../../models";
import { host_main } from "../../../../consts";
import { useNavigate, useParams } from "react-router-dom";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Form, Input, Select } from 'antd';
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { Editor } from '@tinymce/tinymce-react';
import axiosInstance from "../../../../services/axiosInstance.ts";
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
    const navigate = useNavigate();
    const [cates, setCates] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { id, _id } = useParams<{ _id: string, id: string }>();
    const [form] = useForm();
    console.log("check id: ", _id);
    const token = localStorage.getItem("token");
    const [value, setValue] = useState<string>('TinyMCE editor text');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await
                    axios.get(`${host_main}/api/course/${_id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }

                    })
                if (res) {
                    console.log("check ress: ", res);
                    const data = res.data.data
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
            fetchData();
        }
    }, [_id, form, token])

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axiosInstance.post(`/api/category/search`, {
                    "searchCondition": {
                        "keyword": "",
                        "is_delete": false
                    },
                    "pageInfo": {
                        "pageNum": 1,
                        "pageSize": 10
                    }
                });

                if (res) {
                    console.log("check fetchCategories res: ", res);
                    setCates(res.data.pageData);
                }
            } catch (error) {
                console.log("Erro occurred: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
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
        console.log("check value: ", values)
        if (typeof values.price === 'string') {
            values.price = parseFloat(values.price);
        }
        if (typeof values.discount === 'string') {
            values.discount = parseFloat(values.discount);
        }
        values.description = value;
        try {
            //Update Course
            if (_id) {

                console.log("check value: ", value);
                await axios.put<Course>(`${host_main}/api/course/${_id}`, values,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                toast.success("Update New Course Successfully");
                if (id) {
                    navigate(`/instructor/manage-courses/${_id}`);
                } else {
                    navigate(`/instructor/manage-courses`);
                }
            }
            //Create Course
            else {
                await axiosInstance.post(`/api/course`, values, {
                    
                });
                toast.success("Create New Course Successfully");
                navigate(`/instructor/manage-courses`);
            }
        } catch (error) {
            console.log("Error Occurred: ", error);
            // toast.error(error.response.data.errors[0].message);
        }
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
                            {cates.map((cate) => (
                                <Select.Option key={cate._id} value={cate._id}>
                                    {cate.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
      
                    >
                        <Editor
                        
                            apiKey="lt4vdqf8v4f2upughnh411hs6gbwhtw3iuz6pwzc9o3ddk7u"
                            onEditorChange={(newValue) => setValue(newValue)}
                            initialValue={value}
                            init={{
                                directionality: 'ltr',
                                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
                                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                tinycomments_mode: 'embedded',
                                tinycomments_author: 'Author name',
                                mergetags_list: [
                                    { value: 'First.Name', title: 'First Name' },
                                    { value: 'Email', title: 'Email' },
                                ],
                                ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                            }}
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
                    {!_id &&
                        <Form.Item label="Image_url"
                            name="image_url"
                            rules={[
                                {
                                    validator: (_, value) =>
                                        !value || isValidHttpUrl(value)
                                            ? Promise.resolve() : Promise.reject(new Error('This is not a valid image URL')),

                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    }
                    <Form.Item
                        label="Price"
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

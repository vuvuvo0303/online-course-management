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
    const { _id } = useParams<{ _id: string }>();
    const [form] = useForm();
    console.log("check id: ", _id);
    const token = localStorage.getItem("token");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await
                    axios.get<Course>(`${host_main}/api/course/${_id}`, {
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
                const res = await axios.post<Category[]>(`${host_main}/api/category/search`, {
                    "searchCondition": {
                        "keyword": "",
                        "is_delete": false
                    },
                    "pageInfo": {
                        "pageNum": 1,
                        "pageSize": 10
                    }
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }

                });

                if (res) {
                    console.log("check res: ", res);
                    setCates(res.data.data.pageData);
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
            const token = localStorage.getItem("token")
            //Update Course
            if (_id) {
                await axios.put<Course>(`${host_main}/api/course/${_id}`, value,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                toast.success("Update New Course Successfully");
                navigate(`/instructor/manage-courses`);
            }
            //Create Course
            else {
                await axios.post<Course>(`${host_main}/api/course`, value, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                toast.success("Create New Course Successfully");
                navigate(`/instructor/manage-courses`);
            }
        } catch (error: any) {
            console.log("Error Occurred: ", error.response.data.errors[0].message);
            toast.error(error.response.data.errors[0].message);
        }
    };

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
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Input.TextArea />
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
                    {_id&&
                        <Form.Item
                            label="Status"
                            name="status"
                            rules={[{ required: true, message: 'Please input!' }]}
                        >
                            <Select>
                                <Select.Option key="1" value="new">
                                    new
                                </Select.Option>
                                <Select.Option key="2" value="waiting-approve">
                                    waiting-approve
                                </Select.Option>
                                <Select.Option key="3" value="approve">
                                    approve
                                </Select.Option>
                                <Select.Option key="4" value="reject">
                                    reject
                                </Select.Option>
                                <Select.Option key="5" value="active">
                                    active
                                </Select.Option>
                                <Select.Option key="6" value="inactive">
                                    inactive
                                </Select.Option>
                            </Select>
                        </Form.Item>
                    }
                    <Form.Item
                        label="Video_url"
                        name="video_url"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Input />
                    </Form.Item>
                    {!_id &&
                        <Form.Item label="Image_url" name="image_url" rules={[{ required: true, message: 'Please input!' }]}>
                            <Input />
                        </Form.Item>
                    }
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Please input a number!' }]}
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

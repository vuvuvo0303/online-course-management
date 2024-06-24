import React, { useEffect, useState } from 'react';
import { Button, Form, Input, DatePicker, Breadcrumb } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

import { HomeOutlined } from '@ant-design/icons';
import { Session } from '../../../../../models';
import { toast } from 'react-toastify';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14, offset: 5 },
    },
};

const CreateUpdateSession = () => {
    const { courseId, sessionId } = useParams<{ courseId: string, sessionId: string }>();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const [courseId2, setCourseId2] = useState<string>('');
    useEffect(() => {
        if (courseId) {
            setCourseId2(courseId);
        }
        if (sessionId) {
            const fetchData = async () => {
                try {
                    const res = await axios.get(`https://665fbf245425580055b0b23d.mockapi.io/session/${sessionId}`);
                    const data = res.data;
                    form.setFieldsValue({
                        title: data.title,
                        description: data.description,
                        updatedDate: moment(),
                        courseId: data.courseId,
                        sessionId: data.sessionId
                    });
                } catch (error) {
                    console.error("Error fetching data:", error);
                } finally {
                    setLoading(false);

                }
            };
            fetchData();
        } else {
            form.setFieldsValue({
                createdDate: moment()
            })
            setLoading(false);

        }
    }, [courseId, form, sessionId]);

    const onFinish = async (values: Session) => {
        setLoading(true);
        try {
            if (sessionId) {
                await axios.put(`https://665fbf245425580055b0b23d.mockapi.io/session/${sessionId}`, values);
                toast.success("Update Session Successfully!")
            } else {
                await axios.post(`https://665fbf245425580055b0b23d.mockapi.io/session`, { ...values, courseId: courseId2 });
                toast.success("Create Session Successfully!")
            }
            navigate(`/instructor/manage-course/${courseId}/manage-session`);
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-full mt-10">
            {loading ? (
                <div>Loading ...</div>
            ) : (
                <div className="w-full max-w-2xl bg-white p-8 rounded shadow">
                    <Breadcrumb className="py-2" >
                        <Breadcrumb.Item href="/dashboard">
                            <HomeOutlined />
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href="/instructor/manage-courses">
                            Manage Courses
                        </Breadcrumb.Item>
                        <Breadcrumb.Item
                            href={`/instructor/manage-course/${courseId}/manage-session`}
                        >Manage Session</Breadcrumb.Item>
                        <Breadcrumb.Item
                            href={`/instructor/manage-course/${courseId}/manage-session/${sessionId}/lecture`}
                        >Manage Lecture</Breadcrumb.Item>
                        <Breadcrumb.Item >
                            {sessionId ? "Update Session" : "Create Session"}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <h1 className="text-center mb-8">{sessionId ? "Update Session" : "Create Session"}</h1>
                    <Form onFinish={onFinish} form={form} {...formItemLayout} initialValues={{}}>
                        <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input title!' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input description!' }]}>
                            <Input.TextArea />
                        </Form.Item>
                        {
                            !sessionId && (
                                <Form.Item label="Created Date" name="createdDate" rules={[{ required: true, message: 'Please select created date!' }]}>
                                    <DatePicker defaultValue={moment()} disabled />
                                </Form.Item>
                            )
                        }

                        {
                            sessionId && (
                                <Form.Item label="Updated Date" name="updatedDate" rules={[{ required: true, message: 'Please select updated date!' }]}>
                                    <DatePicker defaultValue={moment()} disabled />
                                </Form.Item>
                            )
                        }

                        <Form.Item hidden label="Course Id" name="courseId" initialValue={courseId2}>
                            <Input />
                        </Form.Item>

                        <Form.Item wrapperCol={{ span: 24, offset: 6 }}>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            )}
        </div>
    );
};

export default CreateUpdateSession;

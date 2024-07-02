import { useEffect, useState } from "react";
import { Category } from "../../../../models";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { host_main } from "../../../../consts";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Table } from "antd";
import styles from "../managecategory.module.css";

const CategoryDetail = () => {
    const [cate, setCate] = useState<Category | null>(null);
    const { _id } = useParams<{ _id: string }>();

    useEffect(() => {
        const fetchCate = async () => {
            try {
                const token = localStorage.getItem("token");
                console.log("check _id: ", _id);
                const res = await axios.get(
                    `${host_main}/api/category/${_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log("check res: ", res);

                if (res.data.data) {
                    setCate(res.data.data);
                }
            } catch (error) {
                console.log("Error occurred: ", error);
            }
        };
        fetchCate();
    }, [_id]);

    const columns = [
        {
            title: 'CateID',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Parent Category ID',
            dataIndex: 'parent_category_id',
            key: 'parent_category_id',
        },
        {
            title: 'User ID',
            dataIndex: 'user_id',
            key: 'user_id',
        },
        {
            title: 'Is Deleted',
            dataIndex: 'is_deleted',
            key: 'is_deleted',
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
        },
        {
            title: 'Updated At',
            dataIndex: 'updated_at',
            key: 'updated_at',
        },
        {
            title: '__v',
            dataIndex: '__v',
            key: '__v',
        },
    ];

    return (
        <>
            <Breadcrumb className={styles.breadcrumb}>
                <Breadcrumb.Item>
                    <Link to="/">
                        <HomeOutlined />
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to="/dashboard/admin">
                        <UserOutlined style={{ marginRight: "8px" }} />
                        <span>Admin</span>
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to="/admin/manage-categories">
                        <UserOutlined style={{ marginRight: "8px" }} />
                        <span>Manage Categories</span>
                    </Link>
                </Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-center my-10"> Category Detail </h1>
            {cate ? (
                <Table dataSource={[cate]} columns={columns} rowKey="_id" />
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
};

export default CategoryDetail;

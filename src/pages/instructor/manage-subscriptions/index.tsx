import { Breadcrumb, Input, Table, TableProps, Tabs, TabsProps, Tag } from "antd";
import { API_INSTRUCTOR_GET_SUBSCRIBER, API_INSTRUCTOR_GET_SUBSCRIPTIONS, getColorStatusSubscribe } from "../../../consts/index";
import { format } from "date-fns";
import { Subscription } from "models/Subscription";
import { useEffect, useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import useDebounce from "../../../hooks/useDebounce";
import { HomeOutlined, SearchOutlined } from "@ant-design/icons";
const InstructorManageSubscriptions = () => {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [keyword, setKeyword] = useState<string>("");
    const debouncedSearchTerm = useDebounce(keyword, 500);
    const [loading, setLoading] = useState<boolean>(true);
    const [apiLink, setApiLink] = useState<string>(API_INSTRUCTOR_GET_SUBSCRIPTIONS);
    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                const res = await axiosInstance.post(apiLink, {
                    "searchCondition": {
                        "keyword": debouncedSearchTerm,
                        "is_delete": false
                    },
                    "pageInfo": {
                        "pageNum": 1,
                        "pageSize": 100
                    }
                })
                if (res) {
                    console.log("check res: ", res);
                    setSubscriptions(res.data.pageData)
                    setLoading(false)
                }
            } catch (error) {
                console.log("Error occurred: ", error);
            }
        }
        fetchSubscriptions();
    }, [debouncedSearchTerm, apiLink])

    //search student by student name
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };

    if (loading) {
        return <p className="text-center">Loading ...</p>
    }

    const onChange = (key: string) => {
        console.log("check key: ", key)
        if (key === "subscription") {
            setApiLink(API_INSTRUCTOR_GET_SUBSCRIPTIONS)
        } else {
            setApiLink(API_INSTRUCTOR_GET_SUBSCRIBER)

        }

    };
    const items: TabsProps['items'] = [
        {
            key: 'subscription',
            label: 'Subscription',
        },
        {
            key: 'subscriber',
            label: 'Subscriber',
        },
    ];
    const columns: TableProps<Subscription>['columns'] = [
        {
            title: 'Subscriber Name',
            dataIndex: 'subscriber_name',
            key: 'subscriber_name',
        },
        {
            title: 'Status',
            dataIndex: 'is_subscribed',
            key: 'is_subscribed',
            render: (is_subscribed: boolean) => (
                <>           
                        <div >
                            <Tag color={getColorStatusSubscribe(is_subscribed)}>
                                {is_subscribed === true ? "Subscribed" : "Un subscribed"}
                            </Tag>
                        </div>
                </>
            )
        },
        {
            title: 'Created At ',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (created_at: Date) => format(new Date(created_at), "dd/MM/yyyy"),
        },
        {
            title: 'Updated Date ',
            dataIndex: 'updated_at',
            key: 'updated_at',
            render: (update_at: Date) => format(new Date(update_at), "dd/MM/yyyy"),
        },
    ];
    return (
        <>
            <Breadcrumb
                className="py-2"
                items={[
                    {
                        href: "/",
                        title: <HomeOutlined />,
                    },
                    {
                        title: "Manage Subscriptions",
                    },
                ]}
            />
            <h1 className="text-center my-10">Manage Subscriptions</h1>
            <Tabs defaultActiveKey="subscription" items={items} onChange={onChange} />
            <Input.Search
                placeholder="Search"
                value={keyword}
                onChange={handleSearch}
                className="m-5"
                style={{ width: 200 }}
                enterButton={<SearchOutlined className="text-white" />}
            />
            <Table columns={columns} dataSource={subscriptions} />
        </>
    )
}

export default InstructorManageSubscriptions;
import { Input, message, Table, TableProps, Tag } from "antd";
import { getColorStatusSubscribe } from "../../../consts";
import { Subscription } from "../../../models";
import { useEffect, useState } from "react";
import { useDebounce } from "../../../hooks";
import { getItemsBySubscriber, subscriptionByInstructorOrStudent } from "../../../services";
import { SearchOutlined } from "@ant-design/icons";
import { LoadingComponent } from "../../../components";
import { formatDate } from "../../../utils";
const StudentSubscription = () => {
    const [keyword, setKeyword] = useState<string>("");
    const [subscriber, setSubscriber] = useState<Subscription[]>([]);
    const debouncedSearchTerm = useDebounce(keyword, 500);
    const [loading, setLoading] = useState(true);
    //search instructor by student name
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };

    const getSubscriber = async () => {
        setLoading(true)
        try {
            const res = await getItemsBySubscriber(debouncedSearchTerm, 1, 100);
            setSubscriber(res);
        } finally {

            setLoading(false);
        }
    }

    useEffect(() => {
        getSubscriber();
    }, [])

    const handleSubscribe = async (instructor_id: string, instructor_name: string) => {
        const res = await subscriptionByInstructorOrStudent(instructor_id);
        if (res) {
            message.success(`Subscribe ${instructor_name} successfully`);
            getSubscriber();
        } else {
            message.success(`Un Subscribe ${instructor_name}  successfully`)
            getSubscriber();
        }
    }
    if (loading) {
        return (<>
            <LoadingComponent />
        </>)
    }

    const columns: TableProps<Subscription>['columns'] = [
        {
            title: 'Instructor Name',
            dataIndex: 'instructor_name',
            key: 'instructor_name',
        },
        {
            title: 'Status',
            dataIndex: 'is_subscribed',
            key: 'is_subscribed',
            render: (is_subscribed: boolean, record: Subscription) => (
                <>
                    <div >
                        <Tag onClick={() => handleSubscribe(record.instructor_id, record.instructor_name)} className="cursor-pointer" color={getColorStatusSubscribe(is_subscribed)}>
                            {is_subscribed === true ? "Subscribed" : "Un Subscribed"}
                        </Tag>
                    </div>
                </>
            )
        },
        {
            title: 'Created At ',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (created_at: Date) => formatDate(created_at),
        },
        {
            title: 'Updated Date ',
            dataIndex: 'updated_at',
            key: 'updated_at',
            render: (update_at: Date) => formatDate(update_at),
        },
    ];
    return (
        <div className="px-10">
            <h1 className="text-center my-10">Manage Subscriptions</h1>
            <Input.Search
                placeholder="Search"
                value={keyword}
                onChange={handleSearch}
                className="m-5"
                style={{ width: 200 }}
                enterButton={<SearchOutlined className="text-white" />}
            />
            <Table rowKey="_id" columns={columns} dataSource={subscriber} />
        </div>
    )
}
export default StudentSubscription;
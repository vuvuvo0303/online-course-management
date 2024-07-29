import { Payout, Transaction } from "../../../models";
import { useEffect, useState } from "react";
import { getPayouts, updateStatusPayout } from "../../../services";
import { format } from "date-fns";
import { Table, TableProps, Tag, Button, Modal, TabsProps, Tabs, message } from "antd";
import { getColorPayout } from "../../../consts/index";
import { createStyles } from "antd-style";
import LoadingComponent from "../../../components/loading";
const useStyle = createStyles(({ token }) => ({
    "my-modal-body": {
        background: token.blue1,
        padding: token.paddingSM,
    },
    "my-modal-mask": {
        boxShadow: `inset 0 0 15px #fff`,
    },
    "my-modal-header": {
        borderBottom: `1px dotted ${token.colorPrimary}`,
    },
    "my-modal-footer": {
        color: token.colorPrimary,
    },
    "my-modal-content": {
        border: "1px solid #333",
    },
}));

const InstructorManagePayout = () => {
    const [payouts, setPayouts] = useState<Payout[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isModalOpen, setIsModalOpen] = useState([false, false]);
    const { styles } = useStyle();
    const [statusPayout, setStatusPayout] = useState<string>("new")

    const toggleModal = (idx: number, target: boolean, transactions?: Transaction[]) => {
        if (transactions) {
            setTransactions(transactions);
        }
        setIsModalOpen((p) => {
            p[idx] = target;
            return [...p];
        });
    };

    const classNames = {
        body: styles["my-modal-body"],
        mask: styles["my-modal-mask"],
        header: styles["my-modal-header"],
        footer: styles["my-modal-footer"],
        content: styles["my-modal-content"],
    };

    const getPayoutsByInstructor = async () => {
        setLoading(true);
        const response = await getPayouts("", "", statusPayout, 1, 100);
        console.log("response: ", response);
        setPayouts(response);
        setLoading(false);
    };

    useEffect(() => {
        getPayoutsByInstructor();
    }, [statusPayout]);

    if (loading) {
        return (<>
            <LoadingComponent />
        </>)
    }
    const handleRequestPayout = async (payout_id: string, status: string, comment: string) => {
        const res = await updateStatusPayout(payout_id, status, comment)
        console.log("handleRequestPayout: ", res)
        message.success(`Send Request Successfully!`)
        getPayoutsByInstructor();
    }
    const hasActionColumn = payouts.some(payout => payout.status === "new" || payout.status === "rejected");
    const columns: TableProps<Payout>["columns"] = [
        {
            title: 'Payout No',
            dataIndex: 'transactions',
            key: 'transactions',
            width: '20%',
            render: (transactions: Transaction[], record: Payout) => (
                <div onClick={() => toggleModal(0, true, transactions)} className="text-blue-500 cursor-pointer">
                    {record.payout_no}
                </div>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <>
                    <Tag color={getColorPayout(status)}>
                        {status === "request_payout" ? "request payout" : status}
                    </Tag>
                </>
            )
        },
        {
            title: 'Balance Origin',
            dataIndex: 'balance_origin',
            key: 'balance_origin',
        },
        {
            title: 'Balance Instructor Paid',
            dataIndex: 'balance_instructor_paid',
            key: 'balance_instructor_paid',
        },
        {
            title: 'Balance Instructor Received',
            dataIndex: 'balance_instructor_received',
            key: 'balance_instructor_received',
        },
        {
            title: 'Created Date',
            dataIndex: 'created_at',
            key: 'created_at',
            width: '10%',
            render: (created_at: string) => format(new Date(created_at), "dd/MM/yyyy"),
        },
        ...(hasActionColumn ? [{
            title: 'Action',
            dataIndex: 'status',
            key: 'action',
            render: (status: string, record: Payout) => (
                (status === "new" || status === "rejected") && (
                    <Button onClick={() => handleRequestPayout(record._id, "request_payout", "")} type="primary">
                        Request Payout
                    </Button>
                )
            )
        }] : []),
       
    ];
    const items: TabsProps['items'] = [
        {
            key: 'new',
            label: 'New',
        },
        {
            key: 'request_payout',
            label: 'Request Payout',
        },
        {
            key: 'completed',
            label: 'Completed',
        },
        {
            key: 'rejected',
            label: 'Rejected',
        },
    ];
  
    const onChange = (key: string) => {
        setStatusPayout(key);
    };

    const columnsTransactions :TableProps['columns']= [
        {
          title: 'Price',
          dataIndex: 'price',
          key: 'price',
        },
        {
          title: 'Discount',
          dataIndex: 'discount',
          key: 'discount',
        },
        {
          title: 'Price Paid',
          dataIndex: 'price_paid',
          key: 'price_paid',
        },
        {
            title: 'Created Date',
            dataIndex: 'created_at',
            key: 'craeted_at',
            render: (created_at: string) => format(new Date(created_at), "dd/MM/yyyy"),
          },
      ];

      
    return (
        <>
            <Modal
                title="Transactions"
                open={isModalOpen[0]}
                onOk={() => toggleModal(0, false)}
                onCancel={() => toggleModal(0, false)}
                classNames={classNames}
                footer={null}
            >
                <Table dataSource={transactions} pagination={false} columns={columnsTransactions} />
            </Modal>
            <div className="container mx-auto px-10">
                <h1 className="text-center my-10">Manage Payout</h1>
                <Tabs defaultActiveKey={statusPayout} items={items} onChange={onChange} />
                {
                    <Table rowKey={(record: Payout) => record._id} dataSource={payouts} columns={columns} />
                }
            </div>
        </>
    );
};

export default InstructorManagePayout;

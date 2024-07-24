import { Payout, Transaction } from "../../../models";
import { useEffect, useState } from "react";
import { getPayouts } from "../../../services";
import { format } from "date-fns";
import { Table, TableProps, Tag, Button, ConfigProvider, Modal, Space } from "antd";
import { getColorPurchase } from "../../../consts/index";
import { createStyles, useTheme } from "antd-style";
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
  const token = useTheme();

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
  const modalStyles = {
    // header: {
    //     borderLeft: `5px solid ${token.colorPrimary}`,
    //     borderRadius: 0,
    //     paddingInlineStart: 5,
    // },
    // body: {
    //     boxShadow: 'inset 0 0 5px #999',
    //     borderRadius: 5,
    // },
    // mask: {
    //     backdropFilter: 'blur(10px)',
    // },
    // content: {
    //     boxShadow: '0 0 30px #999',
    // },
  };

  const getPayoutsByInstructor = async () => {
    setLoading(true);
    const response = await getPayouts("", "", "", 1, 100);
    console.log("response: ", response);
    setPayouts(response);
    setLoading(false);
  };

  useEffect(() => {
    getPayoutsByInstructor();
  }, []);

  if (loading) {
    return (
      <>
        <p className="items-center text-center">Loading ...</p>
      </>
    );
  }

  const columns: TableProps<Payout>["columns"] = [
    {
      title: "Pay No",
      dataIndex: "transactions",
      key: "transactions",
      width: "20%",
      render: (transactions: Transaction[], record: Payout) => (
        <div onClick={() => toggleModal(0, true, transactions)} className="text-blue-500 cursor-pointer">
          {record.payout_no}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <>
          <Tag color={getColorPurchase(status)}>{status === "request_paid" ? "request paid" : status}</Tag>
        </>
      ),
    },
    {
      title: "Balance Origin",
      dataIndex: "balance_origin",
      key: "balance_origin",

      render: (balance_origin: number) => (
        <>{balance_origin.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</>
      ),
    },
    {
      title: "Balance Instructor Paid",
      dataIndex: "balance_instructor_paid",
      key: 'balance_instructor_paid',
            render:(balance_instructor_paid:number)=> <>{balance_instructor_paid.toLocaleString("vi-VN",{style:"currency",currency:"VND"})}</>
    },
    {
      title: "Balance Instructor Received",
      dataIndex: "balance_instructor_received",
      key: 'balance_instructor_received',
      render:(balance_instructor_received:number)=> <>{balance_instructor_received.toLocaleString("vi-VN",{style:"currency",currency:"VND"})}</>
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      width: "10%",
      render: (created_at: string) => format(new Date(created_at), "dd/MM/yyyy"),
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
      width: "10%",
      render: (updated_at: string) => format(new Date(updated_at), "dd/MM/yyyy"),
    },
  ];

  return (
    <>
      <Modal
        title="Transactions"
        open={isModalOpen[0]}
        onOk={() => toggleModal(0, false)}
        onCancel={() => toggleModal(0, false)}
        footer=""
        classNames={classNames}
        styles={modalStyles}
      >
        {transactions.map((transaction) => (
          <div className="bg-white" key={transaction._id}>
            <p>Price: {transaction.price.toLocaleString("vi-VN",{style:"currency",currency:"VND"})}</p>
            <p>Discount: {transaction.discount}%</p>
            <p>Price Paid: {transaction.price_paid.toLocaleString("vi-VN",{style:"currency",currency:"VND"})}</p>
            <p>Created At: {format(new Date(transaction.created_at), "dd/MM/yyyy")}</p>
          </div>
        ))}
      </Modal>
      <div className="container mx-auto px-10">
        <h1 className="text-center my-10">Manage Payout</h1>
        <Table rowKey={(record: Payout) => record._id} dataSource={payouts} columns={columns} />
      </div>
    </>
  );
};

export default InstructorManagePayout;

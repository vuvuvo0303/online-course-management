import { Purchase, TransactionsPurchase } from "../../../models";
import { useEffect, useState } from "react";
import { getItemsByInstructor } from "../../../services";

import { format } from "date-fns";
import { Button, Checkbox, Table, TableProps, Tabs, TabsProps, Tag } from "antd";
import { createPayout } from "../../../services/payout";
import { getColorPurchase } from "../../../consts";
import LoadingComponent from "../../../components/loading";

const InstructorManagePurchase = () => {
  const [instructor_id, setInstructor_id] = useState<string>("");
  const [purchasesChecked, setPurchasesChecked] = useState<TransactionsPurchase[]>([]);
  const [indexPurchasesChecked, setIndexPurchasesChecked] = useState<number>(0);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [statusPurchase, setStatusPurchase] = useState<string>("new");
  const getPurchasesByInstructor = async () => {
    setLoading(true);
    const response = await getItemsByInstructor("", "", "", statusPurchase, 1, 100);
    console.log("response: ", response);
    setPurchases(response);
    setLoading(false);
  };

  useEffect(() => {
    getPurchasesByInstructor();
  }, [statusPurchase]);

  if (loading) {
    return (
      <>
        <LoadingComponent />
      </>
    );
  }

  const columns: TableProps<Purchase>["columns"] = [
    {
      render: (record: Purchase) =>
        record.status === "new" ? <Checkbox onChange={() => onChangeCheckbox(record)}></Checkbox> : null,
    },
    {
      title: "Purchase No",
      dataIndex: "purchase_no",
      key: "purchase_no",
      width: "20%",
    },
    {
      title: "Course Name",
      dataIndex: "course_name",
      key: "course_name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => <>{price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</>,
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (discount: number) => `${discount}%`,
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
      title: "Price paid",
      dataIndex: "price_paid",
      key: "price_paid",
      render: (price_paid: number) => <>{price_paid.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</>,
    },
    {
      title: "Created Date",
      dataIndex: "created_at",
      key: "created_at",
      width: "10%",
      render: (created_at: string) => format(new Date(created_at), "dd/MM/yyyy"),
    },
  ];

  const columnsNotCheckbox: TableProps<Purchase>["columns"] = [
    {
      title: "Purchase No",
      dataIndex: "purchase_no",
      key: "purchase_no",
      width: "20%",
    },
    {
      title: "Course Name",
      dataIndex: "course_name",
      key: "course_name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => <>{price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</>,
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (discount: number) => `${discount}%`,
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
      title: "Price paid",
      dataIndex: "price_paid",
      key: "price_paid",
      render: (price_paid: number) => <>{price_paid.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</>,
    },
    {
      title: "Created Date",
      dataIndex: "created_at",
      key: "created_at",
      width: "10%",
      render: (created_at: string) => format(new Date(created_at), "dd/MM/yyyy"),
    },
  ];

  const handleCreatePayout = async () => {
    const res = await createPayout(instructor_id, purchasesChecked);
    console.log("res: ", res);
    if (res) {
      getPurchasesByInstructor();
    }
  };

  const onChangeCheckbox = (purchase: Purchase) => {
    setInstructor_id(purchase.instructor_id);
    let index = indexPurchasesChecked;
    // found purchase
    let foundPurchaseId = purchasesChecked.find(
      (purchaseCurrentCheck) => purchaseCurrentCheck.purchase_id === purchase._id
    );
    let newArray: TransactionsPurchase[] = [];
    // if purchase exist
    if (foundPurchaseId) {
      console.log("foundPurchaseId: ", foundPurchaseId);
      newArray = purchasesChecked.filter((item) => item.purchase_id !== foundPurchaseId?.purchase_id);
      console.log("newArray found: ", newArray);
      index--;
      setIndexPurchasesChecked(index);
      setPurchasesChecked([...newArray]);
      foundPurchaseId = undefined;
    } else {
      const newTransaction = new TransactionsPurchase(purchase._id);
      if (indexPurchasesChecked === 0) {
        newArray[indexPurchasesChecked] = newTransaction;
        purchasesChecked[index] = newTransaction;
        index++;
        setIndexPurchasesChecked(index);
      } else if (indexPurchasesChecked >= 1) {
        newArray[indexPurchasesChecked] = newTransaction;
        purchasesChecked[index] = newTransaction;
        index++;
        setIndexPurchasesChecked(index);
      }
      setPurchasesChecked([...purchasesChecked]);
    }
    // if (foundPurchaseId) {

    // } else {

    // }
    console.log("purchasesChecked: ", purchasesChecked);
  };
  const items: TabsProps["items"] = [
    {
      key: "new",
      label: "New",
    },
    {
      key: "request_paid",
      label: "Request Paid",
    },
    {
      key: "completed",
      label: "completed",
    },
  ];
  const onChangeStatus = (key: string) => {
    setStatusPurchase(key);
  };
  return (
    <div className="container mx-auto px-10">
      <h1 className="text-center my-10">Manage Purchased</h1>
      {statusPurchase === "new" && (
        <Button onClick={() => handleCreatePayout()} className="float-right " type="primary">
          Create Payout
        </Button>
      )}
      <Tabs defaultActiveKey={statusPurchase} items={items} onChange={onChangeStatus} />
      {statusPurchase === "new" ? (
        <Table rowKey={(record: Purchase) => record._id} dataSource={purchases} columns={columns} />
      ) : (
        <Table rowKey={(record: Purchase) => record._id} dataSource={purchases} columns={columnsNotCheckbox} />
      )}
    </div>
  );
};

export default InstructorManagePurchase;

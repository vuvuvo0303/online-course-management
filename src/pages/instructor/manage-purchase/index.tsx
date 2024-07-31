import { Purchase, TransactionsPurchase } from "../../../models";
import { useEffect, useState } from "react";
import { getItemsByInstructor } from "../../../services";

import { format } from "date-fns";
import { Button, Checkbox, Input, Table, TableProps, Tabs, TabsProps, Tag } from "antd";
import { createPayout } from "../../../services/payout";
import { getColorPurchase } from "../../../consts";
import LoadingComponent from "../../../components/loading";
import { useDebounce } from "../../../hooks";
import { SearchOutlined } from "@ant-design/icons";
import CustomBreadcrumb from "../../../components/breadcrumb";
import { formatCurrency } from '../../../utils';

const InstructorManagePurchase = () => {
  const [searchPurchase, setSearchPurchase] = useState<string>("");
  const purchaseNoSearch = useDebounce(searchPurchase, 500);

  const [instructor_id, setInstructor_id] = useState<string>("");
  const [purchasesChecked, setPurchasesChecked] = useState<TransactionsPurchase[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [statusPurchase, setStatusPurchase] = useState<string>("new");

  const getPurchasesByInstructor = async () => {
    setLoading(true);
    const response = await getItemsByInstructor(purchaseNoSearch, "", "", statusPurchase, 1, 100);
    setPurchases(response);
    setLoading(false);
  };

  useEffect(() => {
    getPurchasesByInstructor();
  }, [statusPurchase, purchaseNoSearch]);

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
        record.status === "new" ? (
          <Checkbox
            onChange={() => onChangeCheckbox(record)}
            checked={purchasesChecked.some(purchase => purchase.purchase_id === record._id)}
          ></Checkbox>
        ) : null,
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
      render: (price: number) => <>{formatCurrency(price)}</>,
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
      render: (price_paid: number) => <>{formatCurrency(price_paid)}</>,
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
      render: (price: number) => <>{formatCurrency(price)}</>,
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
      render: (price_paid: number) => <>{formatCurrency(price_paid)}</>,
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
    const newArray: TransactionsPurchase[] = [...purchasesChecked];
    const purchaseIndex = newArray.findIndex((p) => p.purchase_id === purchase._id);

    if (purchaseIndex >= 0) {
      // Nếu đã được chọn, bỏ chọn nó
      newArray.splice(purchaseIndex, 1);
    } else {
      // Nếu chưa được chọn, chọn nó
      newArray.push({ purchase_id: purchase._id });
    }

    setPurchasesChecked(newArray);
  };

  const handleCheckAllPurchased = () => {
    if (purchasesChecked.length === purchases.length) {
      setPurchasesChecked([]);
    } else {
      const allPurchasesChecked = purchases.map((purchase) => ({
        purchase_id: purchase._id,
      }));
      setPurchasesChecked(allPurchasesChecked);
    }
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
      <CustomBreadcrumb />
      <div className="flex justify-between mb-5">
        <div>
          {statusPurchase === "new" && (
            <>
              <Button onClick={() => handleCreatePayout()} className="" type="primary">
                Create Payout
              </Button>
              <Checkbox onChange={handleCheckAllPurchased} className="ml-2"> (Check all purchased)</Checkbox>
            </>
          )}
        </div>
        <Input.Search
          placeholder="Search By Purchase No"
          value={searchPurchase}
          onChange={(e) => setSearchPurchase(e.target.value)}
          className=" "
          style={{ width: 250 }}
          enterButton={<SearchOutlined className="text-white" />}
        />
      </div>
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

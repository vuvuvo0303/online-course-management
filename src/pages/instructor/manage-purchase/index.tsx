import { Purchase, TransactionsPurchase } from "../../../models";
import { useEffect, useState } from "react";
import { getItemsByInstructor } from "../../../services";

import { format } from "date-fns";
import {
  Button,
  Checkbox,
  Input,
  message,
  Pagination,
  PaginationProps,
  Table,
  TablePaginationConfig,
  TableProps,
  Tabs,
  TabsProps,
  Tag,
} from "antd";
import { createPayout } from "../../../services/payout";
import { getColorPurchase } from "../../../consts";
import LoadingComponent from "../../../components/loading";
import { useDebounce } from "../../../hooks";
import { SearchOutlined } from "@ant-design/icons";
import CustomBreadcrumb from "../../../components/breadcrumb";
import { formatCurrency } from "../../../utils";

const InstructorManagePurchase = () => {
  const [searchPurchase, setSearchPurchase] = useState<string>("");
  const purchaseNoSearch = useDebounce(searchPurchase, 500);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [instructor_id, setInstructor_id] = useState<string>("");
  const [purchasesChecked, setPurchasesChecked] = useState<TransactionsPurchase[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [statusPurchase, setStatusPurchase] = useState<string>("new");

  const getPurchasesByInstructor = async () => {

    const response = await getItemsByInstructor(purchaseNoSearch, "", "", statusPurchase, 1, 100);
    setPurchases(response.data.pageData);
    setPagination({
      ...pagination,
      total: response.data.pageInfo.totalItems,
      current: response.data.pageInfo.pageNum,
      pageSize: response.data.pageInfo.pageSize,
    });
    setLoading(false);
  };

  useEffect(() => {
    getPurchasesByInstructor();
  }, [statusPurchase, purchaseNoSearch, pagination.current, pagination.pageSize]);

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
        record.status === "new" && record.price_paid != 0 ? (
          <Checkbox
            onChange={() => onChangeCheckbox(record)}
            checked={purchasesChecked.some((purchase) => purchase.purchase_id === record._id)}
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
    if (purchasesChecked.length > 0) {
      setLoading(true);
      const res = await createPayout(instructor_id, purchasesChecked);
      console.log("res: ", res);
      if (res) {
        getPurchasesByInstructor();
        setPurchasesChecked([]);// reset array
      } else {
        setLoading(false);
      }
    }else{
      message.error("Please select at least 1 purchase to create payout!");
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
    console.log("purchasesChecked:", purchasesChecked)
  };

  const handleCheckAllPurchased = () => {
    // if all purchases checked
    if (purchasesChecked.length === purchases.length) {
      setPurchasesChecked([]);
    } else {
      const allPurchasesChecked = purchases
        .filter(purchase => purchase.price_paid !== 0) // Choose purchaes have price paid != 0
        .map(purchase => ({
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
      label: "Completed",
    },
  ];

  const onChangeStatus = (key: string) => {
    setStatusPurchase(key);
  };
  const handleTableChange = async (pagination: PaginationProps) => {
    setPagination({
      ...pagination,
      current: pagination.current ?? 1,
      pageSize: pagination.pageSize ?? 10,
      total: pagination.total ?? 0,
    });
    await await getItemsByInstructor(purchaseNoSearch, "", "", statusPurchase, 1, 100);
  };

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPagination({ ...pagination, current: page, pageSize });
  };
  return (
    <div className="container mx-auto px-10">
      <CustomBreadcrumb />
      <div className="flex justify-between mb-5">
        <Input.Search
          placeholder="Search By Purchase No"
          value={searchPurchase}
          onChange={(e) => setSearchPurchase(e.target.value)}
          className=" "
          style={{ width: 250 }}
          enterButton={<SearchOutlined className="text-white" />}
        />
        <div>
          {statusPurchase === "new" && (
            <>
              <Button onClick={() => handleCreatePayout()} className="" type="primary">
                Create Payout
              </Button>
              <Checkbox onChange={handleCheckAllPurchased} className="ml-2">
                {" "}
                (Check all purchased)
              </Checkbox>
            </>
          )}
        </div>
      </div>
      <Tabs defaultActiveKey={statusPurchase} items={items} onChange={onChangeStatus} />
      {statusPurchase === "new" ? (
        <Table
          rowKey={(record: Purchase) => record._id}
          dataSource={purchases}
          columns={columns}
          onChange={handleTableChange}
          pagination={false}
        />
      ) : (
        <Table
          rowKey={(record: Purchase) => record._id}
          dataSource={purchases}
          columns={columnsNotCheckbox}
          onChange={handleTableChange}
          pagination={false}
        />
      )}
      <div className="flex justify-end py-8">
        <Pagination
          total={pagination.total}
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
          current={pagination.current}
          pageSize={pagination.pageSize}
          onChange={handlePaginationChange}
          showSizeChanger
        />
      </div>
    </div>
  );
};

export default InstructorManagePurchase;

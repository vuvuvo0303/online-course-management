
import PaymentSubscriptions from "./subscriptions";
import PaymentRefunds from "./refunds";

import { Tabs, TabsProps } from "antd";
import { useState } from "react";
import ManagePaymentCourse from "./courses";


const StudentPaymentHistory: React.FC = () => {
  const [selectComponent, setSelectComponent] = useState("courses");

  const onChange = (key: string) => {
    setSelectComponent(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "courses",
      label: "Courses",
    },
    {
      key: "subscriptions",
      label: "Subscriptions",
    },
    {
      key: "refunds",
      label: "Refunds",
    }
  ];
  const renderComponent = () => {
    switch (selectComponent) {
      case "refunds":
        return <PaymentRefunds />;
      case "subscriptions":
        return <PaymentSubscriptions />;
      case "courses":
        return <ManagePaymentCourse />;
      default:
        return <ManagePaymentCourse />;
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-center my-10">Payment History</h1>
      <Tabs defaultActiveKey="courses" onChange={onChange}>
        {items.map((item) => (
          <Tabs.TabPane key={item.key} tab={item.label} />
        ))}
      </Tabs>
      {renderComponent()}
    </div>

  );



};

export default StudentPaymentHistory;

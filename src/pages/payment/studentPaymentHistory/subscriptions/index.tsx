import { ShoppingCartOutlined } from "@ant-design/icons";

const PaymentSubscriptions = () => {
  return (
    <div className={`containerShopIcon text-center`}>
      <ShoppingCartOutlined className="shopIcon" />
      <p>You don't have any transactions for a subscription plan.</p>
    </div>
  );
};
export default PaymentSubscriptions;

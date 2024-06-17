import { ShoppingCartOutlined } from "@ant-design/icons";
import styles from "../paymentHistory.module.css";
const PaymentSubscriptions = () => {
  return (
    <div className={`${styles.containerShopIcon} text-center`}>
      <ShoppingCartOutlined className={styles.shopIcon} />
      <p>You don't have any transactions for a subscription plan.</p>
    </div>
  );
};
export default PaymentSubscriptions;

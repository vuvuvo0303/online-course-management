import { ShoppingCartOutlined } from "@ant-design/icons";
import styles from "../paymentHistory.module.css"
const PaymentCourses: React.FC = () => {
    return (
        <div className={`${styles.containerShopIcon} text-center`}>
            <ShoppingCartOutlined className={styles.shopIcon} />
            <p>You don't have any course purchases.</p>
        </div>
    )
}

export default PaymentCourses;
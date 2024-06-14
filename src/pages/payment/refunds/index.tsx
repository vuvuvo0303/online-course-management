import { ShoppingCartOutlined } from "@ant-design/icons";

import styles from "../paymentHistory.module.css"
const PaymentRefunds = ()=>{
    return(
        <div className={`${styles.containerShopIcon} text-center`}>
            <ShoppingCartOutlined className={styles.shopIcon} />
            <p>You don't have any pending or completed refunds.</p>
        </div>
    )
}

export default PaymentRefunds;
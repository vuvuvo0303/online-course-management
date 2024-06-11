import { useState } from 'react';
import styles from './paymentHistory.module.css';
import PaymentCourses from './courses';
import PaymentSubscriptions from './Subscriptions';
import PaymentRefunds from './refunds';


const PaymentHistory = () => {
    const [selectComponent, setSelectComponent] = useState("default");

    const renderComponent = () => {
        switch (selectComponent) {
            case "refunds":
                return <PaymentRefunds />
            case "subscriptions":
                return <PaymentSubscriptions />
            default:
                return <PaymentCourses />
        }
    }

    return (
        <div className="container mx-auto mt-10">
            <h1>Payment History</h1>
            <div className={styles.paymentBar}>
                <div>
                    <button onClick={() => setSelectComponent("courses")}>
                        Courses
                    </button>
                </div>
                <div>
                    <button onClick={() => setSelectComponent("subscriptions")}>
                        Subscriptions
                    </button>
                </div>
                <div>
                    <button onClick={() => setSelectComponent("refunds")}>
                        Refunds
                    </button>
                </div>
            </div>
            {renderComponent()}
        </div>
    )
};

export default PaymentHistory;

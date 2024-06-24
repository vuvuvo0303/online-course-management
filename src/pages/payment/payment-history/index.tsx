import { useState } from 'react';
import PaymentSubscriptions from '../studentPaymentHistory/subscriptions';
import { Breadcrumb, Tabs, TabsProps } from 'antd';
import ManagePaymentCourse from './courses';
import ManagePaymentRefund from './refunds';
import { HomeOutlined} from '@ant-design/icons';

const PaymentHistory: React.FC = () => {
    const [selectComponent, setSelectComponent] = useState("default");
    const renderComponent = () => {
        switch (selectComponent) {
            case "refunds":
                return <ManagePaymentRefund />
            case "subscriptions":
                return <PaymentSubscriptions />
            case "courses":
                return <ManagePaymentCourse />
        }
    }
    const onChange = (key: string) => {
        setSelectComponent(key)
    }
    const items: TabsProps['items'] = [
        {
            key: 'courses',
            label: 'courses'
        },
        {
            key: 'subscriptions',
            label: 'subscriptions',
        },
        {
            key: 'refunds',
            label: 'refunds',
        },
    ];
    return (
        <div className="container mx-auto mt-10">
            <Breadcrumb
                items={[
                    {
                        href: '/instructor/dashboard',
                        title: <HomeOutlined />,
                    },
                    {
                        
                        title: (
                            <>
                                <span>Payment History</span>
                            </>
                        ),
                    }
                ]}
            />
            <h1 className='text-center'>Payment History</h1>
            <Tabs defaultActiveKey="courses" items={items} onChange={onChange} />
            {renderComponent()}
        </div>
    );
};

export default PaymentHistory;

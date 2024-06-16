import { StockOutlined } from "@ant-design/icons";
import { Steps, Button, Row, Col } from "antd";
import { useState } from "react";
import BasicStep from "./basic"; // Import các component cho từng bước
import CurriculumStep from "./curriculum";
import MediaStep from "./media";
import PriceStep from "./price";
import PublishStep from "./publish";
import styles from "./newCourse.module.css"
const { Step } = Steps;

const InstructorCreateCourse: React.FC = () => {
    const [current, setCurrent] = useState(0);

    const handleStepChange = (currentStep) => {
        setCurrent(currentStep);
    };

    const steps = [
        { title: "BASIC", content: <BasicStep /> },
        { title: "CURRICULUM", content: <CurriculumStep /> },
        { title: "MEDIA", content: <MediaStep /> },
        { title: "PRICE", content: <PriceStep /> },
        { title: "PUBLISH", content: <PublishStep /> },
    ];

    const next = () => {
        setCurrent((prev) => Math.min(prev + 1, steps.length - 1));
    };

    const prev = () => {
        setCurrent((prev) => Math.max(prev - 1, 0));
    };

    return (
        <div className={`${styles.backGround} container mx-auto pt-10 px-3 pb-10`}>
            <Row gutter={10}>
                <Col className="py-2"><StockOutlined className={styles.icon} /></Col>
                <Col >
                    <h1 className="font-bold">
                        Create New Course
                    </h1>
                </Col>

            </Row>
            <Steps
                current={current}
                onChange={handleStepChange}
                className="my-10 py-10 px-10"
            >
                {steps.map((step, index) => (
                    <Step
                        key={index}
                        title={<span>{step.title}</span>}
                        status={index === current || index < current ? 'finish' : 'wait'}
                        className={index === current || index < current ? 'text-red-500' : ''}
                    />
                ))}
            </Steps>
            <div className="my-4">
                {steps[current].content}
            </div>
            <div className="flex justify-between mt-4">
                <Button onClick={prev} disabled={current === 0} className="px-6">
                    Previous
                </Button>
                <Button onClick={next} type="primary" disabled={current === steps.length - 1} className="px-6">
                    Next
                </Button>
            </div>
            <style>
                {`
                    .custom-steps .ant-steps-item {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }
                    .custom-steps .ant-steps-item-icon {
                        margin-bottom: 8px;
                    }
                    .ant-steps-item-finish .ant-steps-item-icon {
                        border-color: red;
                    }
                    .ant-steps-item-finish .ant-steps-item-content .ant-steps-item-title, 
                    .ant-steps-item-finish .ant-steps-item-content .ant-steps-item-description {
                        color: black !important;
                    }
                    .ant-steps-item-finish .ant-steps-item-tail::after {
                        background-color: red !important;
                    }
                    .ant-steps .ant-steps-item-finish .ant-steps-item-icon {
                        background-color: red;
                    }
                `}
            </style>
        </div>
    );
};

export default InstructorCreateCourse;

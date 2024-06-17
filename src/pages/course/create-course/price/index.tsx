import { useState } from "react";
import { Button, Col, Input, Row, Switch, Tag } from "antd";
import { SnippetsOutlined } from "@ant-design/icons";
import styles from "./price.module.css";

const PriceStep: React.FC = () => {
    const [selectedButton, setSelectedButton] = useState<string>("Free");
    const [currentComponent, setCurrentComponent] = useState<JSX.Element | null>(<FreeComponent />); // Set initial component

    const handleButtonClick = (buttonLabel: string, component: JSX.Element) => {
        setSelectedButton(buttonLabel);
        setCurrentComponent(component);
    };

    return (
        <>
            <div className={`${styles.Border} border-t-2 border-b-2`}>
                <Row gutter={10}>
                    <Col>
                        <SnippetsOutlined className={`${styles.icon} py-6`} />
                    </Col>
                    <Col>
                        <h1 className={` font-bold py-5`}>Price</h1>
                    </Col>
                </Row>
            </div>
            <div className="bg-white p-10">
                <div className=" bg-white ">
                    <Row gutter={10}>
                        <Col span={12}>
                            <Button
                                type="primary"
                                className={`w-full h-14 ${selectedButton === "Free" ? "bg-red-500 text-white border-red-500" : "bg-white text-black border-gray-300"}`}
                                danger={selectedButton === "Free"}
                                onClick={() => handleButtonClick("Free", <FreeComponent />)}
                            >
                                Free
                            </Button>
                        </Col>
                        <Col span={12}>
                            <Button
                                type="primary"
                                className={`w-full h-14 ${selectedButton === "Paid" ? "bg-red-500 text-white border-red-500" : "bg-white text-black border-gray-300"}`}
                                danger={selectedButton === "Paid"}
                                onClick={() => handleButtonClick("Paid", <PaidComponent />)}
                            >
                                Paid
                            </Button>
                        </Col>
                    </Row>
                </div>
                <div className="mt-5">
                    {currentComponent}
                </div>
            </div>
        </>
    );
};

const FreeComponent: React.FC = () => {
    return (
        <>
             <Row gutter={10} justify="center" className="mb-4">
                <Col>
                    <Switch className="bg-red-500" defaultChecked onChange={onChange} />
                </Col>
                <Col>
                    <p>Require Log In</p>
                </Col>
            </Row>
            <Row gutter={10} justify="center" className="mb-4">
                <Col>
                    <Switch className="bg-red-500" defaultChecked onChange={onChange} />
                </Col>
                <Col>
                    <p>Require Enroll</p>
                </Col>
            </Row>
           <div className=" md:px-10 md:mx-10  text-center">
           <p className=" ">If the course is free, if student require to enroll your course, if not required enroll, if students required sign in to your website to take this course.</p>
           </div>
        </>
    );
};

const PaidComponent: React.FC = () => {
    return (
        <>
            <div className="mt-10">
                <p>Regular Price*</p>
            </div>
            <div className="mt-4">
                <Input placeholder="$0" className="py-3 w-2/6 " addonAfter={<Tag className="" color="#020617">USD</Tag>} />
            </div>
            <div className="mt-10">
                <p>Discount Price*</p>
            </div>
            <div className="mt-4">
                <Input placeholder="$0" className="py-3 w-2/6" addonAfter={<Tag className="" color="#020617">USD</Tag>} />
            </div>
        </>
    );
};

const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
};

export default PriceStep;

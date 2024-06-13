import { DeleteOutlined, EditOutlined, FileOutlined, GroupOutlined, MenuOutlined, PlusSquareOutlined, SnippetsOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import styles from "./curriculm.module.css"
const CurriculumStep: React.FC = () => {
    return (
        <>
            <div className={`${styles.Border} border-t-2 border-b-2`}>
                <Row gutter={10}>
                    <Col>
                        <SnippetsOutlined className={`${styles.icon} py-6`} />
                    </Col>
                    <Col>
                        <h1 className=" font-bold py-5">Curriculum</h1>
                    </Col>
                </Row>
            </div>
            <div className={`${styles.Border} bg-white mt-10 border-2 p-5`}>
                <Row justify={"space-between"}>
                    <Col>
                        <Row gutter={10}>
                            <Col>
                                <UnorderedListOutlined className={`${styles.icon} py-1`} />
                            </Col>
                            <Col className="">

                                <h1 className=" font-bold">
                                    Curriculum
                                </h1>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Button className="w-32 h-12" type="primary" danger>
                            New Section
                        </Button>
                    </Col>
                </Row>
            </div>
            <div className={`${styles.Border} bg-white mt-10 border-2 `}>
                <div className={`${styles.Border}  border-b-2 `}>
                    <Row className="p-5" justify={"space-between"}>
                        <Col>
                            <Row gutter={10}>
                                <Col><MenuOutlined className={`${styles.icon} py-1`} /></Col>
                                <Col>
                                    <h1 className="font-bold">Introduction</h1>
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row gutter={10}>
                                <Col><EditOutlined className={styles.icon} /></Col>
                                <Col><DeleteOutlined className={styles.icon} /></Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
                <div className="p-5">
                    <div className={`${styles.Border, styles.backGround} border-2 px-5 `}>
                        <Row gutter={10} className="p-5">
                            <Col>
                                <FileOutlined />
                            </Col>
                            <Col >
                                <p>Lecture Title</p>
                            </Col>
                            <Col>
                                <Row gutter={10}>
                                    <Col><EditOutlined /></Col>
                                    <Col><DeleteOutlined /></Col>
                                    <Col><MenuOutlined /></Col>
                                </Row>
                            </Col>
                        </Row>

                    </div>
                    <div className={`${styles.Border, styles.backGround} mt-10  border-2 px-5 `}>
                        <Row gutter={10} className="p-5">
                            <Col>
                                <Col><MenuOutlined /></Col>
                            </Col>
                            <Col >
                                <p>Quiz Title</p>
                            </Col>
                            <Col>
                                <Row gutter={10}>
                                    <Col><EditOutlined /></Col>
                                    <Col><DeleteOutlined /></Col>
                                    <Col><MenuOutlined /></Col>
                                </Row>
                            </Col>
                        </Row>

                    </div>
                    <div className={`${styles.Border, styles.backGround} mt-10 border-2 px-5 `}>
                        <Row gutter={10} className="p-5">
                            <Col>
                                <GroupOutlined />
                            </Col>
                            <Col >
                                <p>Assignment Title</p>
                            </Col>
                            <Col>
                                <Row gutter={10}>
                                    <Col><EditOutlined /></Col>
                                    <Col><DeleteOutlined /></Col>
                                    <Col><MenuOutlined /></Col>
                                </Row>
                            </Col>
                        </Row>

                    </div>
                </div>
            </div>
            <div className={`${styles.backContainer} bg-black px-5 text-white p-5`}>
                <Row gutter={20}>
                    <Col>
                        <Row>
                            <Col><PlusSquareOutlined className={`${styles.icon} py-1`} /></Col>
                            <h1>Lecture</h1>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Col><PlusSquareOutlined className={`${styles.icon} py-1`} /></Col>
                            <h1>Lecture</h1>
                            <h1>Quiz</h1>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Col><PlusSquareOutlined className={`${styles.icon} py-1`} /></Col>
                            <h1>Lecture</h1>
                            <h1>Assignment</h1>
                        </Row>
                    </Col>
                </Row>

            </div>
        </>
    )
};

export default CurriculumStep;

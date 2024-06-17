import { Badge, Button, Card, Col, Row, Typography } from 'antd';
import { LinkedinFilled } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Achieved = () => {
    return (
        <div className="p-4">
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Card bordered={false} className="rounded-lg">
                        <Row gutter={[16, 16]}>
                            <Col span={24}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded-md bg-gray-200 flex items-center justify-center">
                                            <LinkedinFilled />
                                        </div>
                                        <div className="ml-4">
                                            <Title level={4} className="font-semibold text-blue-500">
                                                Turn Ethical Frameworks into Actionable Steps
                                            </Title>
                                            <Paragraph className="text-gray-600">
                                                CertNexus
                                            </Paragraph>
                                            <Badge status="success" text="100%" />
                                        </div>
                                    </div>
                                    <Button type="primary" className="flex items-center justify-center">
                                        <span className="mr-2">Add to LinkedIn</span>
                                        <LinkedinFilled />
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={24}>
                    <Card bordered={false} className="rounded-lg">
                        <Row gutter={[16, 16]}>
                            <Col span={24}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded-md bg-gray-200 flex items-center justify-center">
                                            <LinkedinFilled />
                                        </div>
                                        <div className="ml-4">
                                            <Title level={4} className="font-semibold text-blue-500">
                                                Promote the Ethical Use of Data-Driven Technologies
                                            </Title>
                                            <Paragraph className="text-gray-600">
                                                CertNexus
                                            </Paragraph>
                                            <Badge status="success" text="100%" />
                                        </div>
                                    </div>
                                    <Button type="primary" className="flex items-center justify-center">
                                        <span className="mr-2">Add to LinkedIn</span>
                                        <LinkedinFilled />
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={24}>
                    <Card bordered={false} className="rounded-lg">
                        <Row gutter={[16, 16]}>
                            <Col span={24}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded-md bg-gray-200 flex items-center justify-center">
                                            <LinkedinFilled />
                                        </div>
                                        <div className="ml-4">
                                            <Title level={4} className="font-semibold text-blue-500">
                                                International Marketing Entry and Execution
                                            </Title>
                                            <Paragraph className="text-gray-600">
                                                Yonsei University
                                            </Paragraph>
                                            <Badge status="success" text="97.20%" />
                                        </div>
                                    </div>
                                    <Button type="primary" className="flex items-center justify-center">
                                        <span className="mr-2">Add to LinkedIn</span>
                                        <LinkedinFilled />
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Achieved;
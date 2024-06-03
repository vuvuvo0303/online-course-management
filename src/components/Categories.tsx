import React, { useState } from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Row, Col, Pagination } from 'antd';
import { categoryFilters } from "../consts/index";

const { Meta } = Card;

const Categories: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize: number = 12; // 4 columns * 3 rows

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Calculate the indices for the current page
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentFilters = categoryFilters.slice(startIndex, endIndex);

    return (
        <div className="w-full">
            <Row gutter={[16, 16]}>
                {currentFilters.map((filter) => (
                    <Col key={filter} span={6}>
                        <Card
                            cover={
                                <img
                                    alt="example"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                />
                            }
                            actions={[
                                <SettingOutlined key="setting" />,
                                <EditOutlined key="edit" />,
                                <EllipsisOutlined key="ellipsis" />,
                            ]}
                        >
                            <Meta
                                avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                                title={filter}
                                description="This is the description"
                            />
                        </Card>
                    </Col>
                ))}
            </Row>
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={categoryFilters.length}
                onChange={handlePageChange}
                style={{ textAlign: 'center', marginTop: '20px' }}
            />
        </div>
    );
};

export default Categories;

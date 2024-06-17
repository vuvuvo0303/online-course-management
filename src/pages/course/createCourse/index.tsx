import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import styles from "./newCourse.module.css"
const PublishStep: React.FC = () => {
    return (
        <>
            <div className={`${styles.Border} border-t-2 border-b-2`} >
                <Row gutter={10}>
                    <Col>

                        <UploadOutlined className={`${styles.icon} py-6`} />
                    </Col>
                    <Col>
                        <h1 className={`font-bold py-5`}>Submit</h1>
                    </Col>
                </Row>
            </div>
            <div className="mt-10 text-center bg-white">
                <EditOutlined className={`${styles.icon}  py-6`} />
                <p className="px-10 pb-5">Your course is in a draft state. Students cannot view, purchase or enroll in this course. For students that are already enrolled, this course will not appear on their student Dashboard.</p>
            </div>
        </>
    );
};

export default PublishStep;
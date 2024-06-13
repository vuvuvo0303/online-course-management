import { LoadingOutlined, PlusOutlined, SnippetsOutlined } from "@ant-design/icons";
import { Button, Col, Flex, GetProp, Input, Row, Upload, UploadProps, message } from "antd";
import styles from "./media.module.css"
import { useState } from "react";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};




const MediaStep = () => {
    const [selectedButton, setSelectedButton] = useState<string>("HTML5(mp4)");

    const buttons = [
        "HTML5(mp4)",
        "External URL",
        "YouTube",
        "Vimeo",
        "Embedded"
    ];

    const handleButtonClick = (buttonLabel: string) => {
        setSelectedButton(buttonLabel);
    };
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    const handleChange: UploadProps['onChange'] = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as FileType, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    }
    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );
    return (
        <>

            <div className={`${styles.Border} border-t-2 border-b-2`}>
                <Row gutter={10}>
                    <Col>
                        <SnippetsOutlined className={`${styles.icon} py-6`} />
                    </Col>
                    <Col>
                        <h1 className="font-bold py-5">Media</h1>
                    </Col>
                </Row>
            </div>
            <div className="mt-5">
                <p>
                    Intro Course overview provider type. (.mp4, YouTube, Vimeo etc.)
                </p>
            </div>
            <div className="mt-5">
                <Row gutter={10}>
                    {buttons.map((buttonLabel) => (
                        <Col key={buttonLabel}>
                            <Button
                                type="primary"
                                className={`w-32 h-10 ${selectedButton === buttonLabel ? "bg-red-500 text-white" : "bg-white text-black"} border-2 border-gray-200`}
                                danger={selectedButton === buttonLabel}
                                onClick={() => handleButtonClick(buttonLabel)}
                            >
                                {buttonLabel}
                            </Button>
                        </Col>
                    ))}
                </Row>
            </div>
            <div className="mt-10">
                <p>
                    Vimeo URL*
                </p>
                <Input className="mt-5 py-3" placeholder="Vimeo Video URL" />
                <p className="mt-10">Course thumbnail*</p>
                <div className="mt-5">
                    <Flex gap="middle" wrap >
                        <Upload

                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                        >
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                    </Flex>
                </div>
            </div>
        </>
    );
};

export default MediaStep;

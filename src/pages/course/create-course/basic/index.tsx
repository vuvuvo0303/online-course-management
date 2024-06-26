import { InfoCircleOutlined, } from "@ant-design/icons";
import styles from "./basic.module.css"
import { Col, Input, Row, Select, SelectProps, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
};

const CourseOption: SelectProps['options'] = [

    {
        desc: 'Beginner',
    },
    {
        desc: 'Intermediate',
    },
    {
        desc: 'Expert',
    },
];

const AudioOption: SelectProps['options'] = [

    {
        desc: 'English',
    },
    {
        desc: 'Espanol',
    },
    {
        desc: 'Portugues',
    },
    {
        desc: '日本語',
    },
    {
        desc: 'Deutsch',
    },
];

const CloseCaptionOption: SelectProps['options'] = [

    {
        desc: 'English',
    },
    {
        desc: 'Espanol',
    },
    {
        desc: 'Portugues',
    },
    {
        desc: 'Italiano',
    },
    {
        desc: 'Francais',
    },
];

const BasicStep: React.FC = () => {
    return (
        <div className={styles.backGround}>
            <div className={`${styles.Border} border-t-2 border-b-2`}>
                <Row gutter={10}>
                    <Col>
                        <InfoCircleOutlined className={styles.icon} />
                    </Col>
                    <Col>
                        <h1 className=" font-bold">Basic Infomation</h1>
                    </Col>
                </Row>

            </div>
            <div className={` container mx-auto mt-10 border-2 border-black p-10 bg-white `}>
                <div>
                    <p className="mb-2">
                        Course Title <span className="text-red-300">*</span>
                    </p>
                    <Input placeholder="Course title here" />
                    <p className={`${styles.note} mt-2`}>
                        (Please make this a maximum of 100 characters and unique.)
                    </p>
                </div>
                <div className="mt-10">
                    <p>
                        Short Description <span className="text-red-300">*</span>
                    </p>
                    <TextArea placeholder="Item description here" className="mt-2" rows={4} />
                    <p className={`${styles.note} mt-2`}>
                        220 words
                    </p>
                </div>
                <div className="mt-10">
                    <p>
                        Course Description <span className="text-red-300">*</span>
                    </p>
                </div>
                <div className="mt-10">
                    <Row gutter={10}>
                        <Col xs={24} sm={12} className="flex flex-col">
                            <p className="mb-2">What will students learn in your course? <span className="text-red-300">*</span></p>
                            <div className="flex-grow">
                                <Input.TextArea rows={4} className="border border-gray-300 rounded p-2 w-full" />
                            </div>
                            <p className="text-sm mt-2">
                                Students will gain these skills and knowledge after completing this course. (One per line).
                            </p>
                        </Col>
                        <Col xs={24} sm={12} className="flex flex-col mt-5 sm:mt-0">
                            <p className="mb-2">Requirements <span className="text-red-300">*</span></p>
                            <div className="flex-grow">
                                <Input.TextArea rows={4} className="border border-gray-300 rounded p-2 w-full" />
                            </div>
                            <p className="text-sm mt-2">
                                What knowledge, technology, tools are required by users to start this course. (One per line).
                            </p>
                        </Col>
                    </Row>
                </div>
                <div className="mt-10">
                    <Row gutter={10}>
                        <Col span={12}>
                            Course Level <span className="text-red-300">*</span>
                            <Select className="mt-2"
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="Nothing selected"
                                // defaultValue={['']}
                                onChange={handleChange}
                                options={CourseOption}
                                optionRender={(option) => (
                                    <Space>
                                        <span role="img" aria-label={option.data.label}>
                                            {option.data.emoji}
                                        </span>
                                        {option.data.desc}
                                    </Space>
                                )}
                            />
                        </Col>
                        <Col span={12}>
                            Audio Language <span className="text-red-300">*</span>
                            <Select className="mt-2"
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="Select Audio"
                                // defaultValue={['']}
                                onChange={handleChange}
                                options={AudioOption}
                                optionRender={(option) => (
                                    <Space>
                                        <span role="img" aria-label={option.data.label}>
                                            {option.data.emoji}
                                        </span>
                                        {option.data.desc}
                                    </Space>
                                )}
                            />
                        </Col>
                    </Row>
                </div>
                <div className="mt-10">
                    <Row gutter={10}>
                        <Col span={12}>
                            Close Caption <span className="text-red-300">*</span>
                            <Select className="mt-2"
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="Select Caption"
                                // defaultValue={['']}
                                onChange={handleChange}
                                options={CloseCaptionOption}
                                optionRender={(option) => (
                                    <Space>
                                        <span role="img" aria-label={option.data.label}>
                                            {option.data.emoji}
                                        </span>
                                        {option.data.desc}
                                    </Space>
                                )}
                            />
                        </Col>
                        <Col span={12}>
                            Course Category <span className="text-red-300">*</span>
                            <Select className="mt-2"
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="Select Audio"
                                // defaultValue={['']}
                                onChange={handleChange}
                                options={AudioOption}
                                optionRender={(option) => (
                                    <Space>
                                        <span role="img" aria-label={option.data.label}>
                                            {option.data.emoji}
                                        </span>
                                        {option.data.desc}
                                    </Space>
                                )}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};

export default BasicStep;

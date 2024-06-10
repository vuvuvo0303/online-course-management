import React from 'react';
import { Collapse } from 'antd';
import { VideoCameraOutlined, PlayCircleOutlined, FileWordOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

const Courses: React.FC = () => {
    const dividerStyle = {
        borderBottom: '1px solid lightgray', // Changed border color to lightgray
        paddingBottom: '10px', // Adjust padding as needed
        marginBottom: '10px', // Adjust margin as needed
    };

    // Function to generate random time in the format "xx:xx"
    const generateRandomTime = () => {
        const padZero = (num: number) => (num < 10 ? `0${num}` : num.toString());
        const hours = padZero(Math.floor(Math.random() * 24)); // Random hours between 00 and 23
        const minutes = padZero(Math.floor(Math.random() * 60)); // Random minutes between 00 and 59
        return `${hours}:${minutes}`;
    };

    return (
        <Collapse accordion>
            <Panel
                header={
                    <div style={{ backgroundColor: 'lightgray', padding: '10px' }}>
                        <VideoCameraOutlined /> Introduction to Programming
                    </div>
                }
                key="1"
                showArrow={false}
            >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <PlayCircleOutlined />
                    <p className='ml-[0.2rem]'>vvv</p>
                    <p style={{ marginLeft: '87rem' }}>{generateRandomTime()}</p>
                </div>
            </Panel>
            <Panel
                header={
                    <div style={{ backgroundColor: 'lightgray', padding: '10px' }}>
                        <VideoCameraOutlined /> Web Development
                    </div>
                }
                key="2"
                showArrow={false}
            >
                <div style={{ ...dividerStyle, display: 'flex', alignItems: 'center' }}>
                    <PlayCircleOutlined />
                    <p className='ml-[0.2rem]'>vvv</p>
                    <p style={{ marginLeft: '87rem' }}>{generateRandomTime()}</p>
                </div>
                <div style={{ ...dividerStyle, display: 'flex', alignItems: 'center' }}>
                    <PlayCircleOutlined />
                    <p className='ml-[0.2rem]'>vvv</p>
                    <p style={{ marginLeft: '87rem' }}>{generateRandomTime()}</p>
                </div>
                <div style={{ ...dividerStyle, display: 'flex', alignItems: 'center' }}>
                    <FileWordOutlined />
                    <p className='ml-[0.2rem]'>vvv</p>
                    <p style={{ marginLeft: '87rem' }}>{generateRandomTime()}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FileWordOutlined />
                    <p className='ml-[0.2rem]'>vvv</p>
                    <p style={{ marginLeft: '87rem' }}>{generateRandomTime()}</p>
                </div>
            </Panel>
            <Panel
                header={
                    <div style={{ backgroundColor: 'lightgray', padding: '10px' }}>
                        <VideoCameraOutlined /> Data Science
                    </div>
                }
                key="3"
                showArrow={false}
            >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <PlayCircleOutlined />
                    <p className='ml-[0.2rem]'>vvv</p>
                    <p style={{ marginLeft: '87rem' }}>{generateRandomTime()}</p>
                </div>
            </Panel>
        </Collapse>
    );
};

export default Courses;

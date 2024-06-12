import { Collapse } from 'antd';
import { VideoCameraOutlined, PlayCircleOutlined, FileWordOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

const Courses: React.FC = () => {
    const headerStyle = {
        backgroundColor: 'lightgray',
        color: 'black',
        padding: '10px',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    const itemStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5px 0',
        color: 'black',
    };

    const contentStyle = {
        backgroundColor: 'white',
        padding: '10px',
        color: '#000',
    };

    const iconTextStyle = {
        marginLeft: '1rem',
        flex: 1,
    };

    return (
        <div className='p-8 bg-white rounded-md'>
            <h2 className='text-black mb-[1rem]'>Course content</h2>
            <Collapse accordion ghost>
                <Panel
                    header={
                        <div style={headerStyle}>
                            <div className='flex items-left'>
                                <VideoCameraOutlined />
                                <span style={iconTextStyle}>Introduction to this Course</span>
                            </div>
                            <div>
                                <span>22:08</span>
                            </div>
                        </div>
                    }
                    key="1"
                    showArrow={false}
                >
                    <div style={contentStyle}>
                        <div style={itemStyle}>
                            <div className="flex items-left">
                                <PlayCircleOutlined />
                                <p style={iconTextStyle}>Unit Objectives</p>
                            </div>
                            <span>Preview 01:40</span>
                        </div>
                    </div>
                </Panel>
                <Panel
                    header={
                        <div style={headerStyle}>
                            <div className='flex items-left'>
                                <VideoCameraOutlined />
                                <span style={iconTextStyle}>Introduction to Front End Development</span>
                            </div>
                            <div>
                                <span>27:26</span>
                            </div>
                        </div>
                    }
                    key="2"
                    showArrow={false}
                >
                    <div style={contentStyle}>
                        <div style={itemStyle}>
                            <div className="flex items-left">
                                <PlayCircleOutlined />
                                <p style={iconTextStyle}>Unit Objectives</p>
                            </div>
                            <span>Preview 01:40</span>
                        </div>
                        <div style={itemStyle}>
                            <div className="flex items-left">
                                <FileWordOutlined className='mt-[1.1rem]' />
                                <p style={{ ...iconTextStyle, marginTop: '1rem' }}>Note about Setting Up Front-End Developer Environment</p>
                            </div>
                            <span>00:30</span>
                        </div>
                        <div style={itemStyle}>
                            <div className="flex items-left">
                                <PlayCircleOutlined className='mt-[1.1rem]' />
                                <p style={{ ...iconTextStyle, marginTop: '1rem' }}>Setting Up Front-End Developer Environment</p>
                            </div>
                            <span>03:11</span>
                        </div>
                        <div style={itemStyle}>
                            <div className="flex items-left">
                                <FileWordOutlined className='mt-[1.1rem]' />
                                <p style={{ ...iconTextStyle, marginTop: '1rem' }}>Note about Introduction to the Web</p>
                            </div>
                            <span>00:11</span>
                        </div>
                        <div style={itemStyle}>
                            <div className="flex items-left">
                                <PlayCircleOutlined className='mt-[1.1rem]' />
                                <p style={{ ...iconTextStyle, marginTop: '1rem' }}>Introduction to the Web</p>
                            </div>
                            <span>10:08</span>
                        </div>
                        <div style={itemStyle}>
                            <div className="flex items-left">
                                <PlayCircleOutlined className='mt-[1.1rem]' />
                                <p style={{ ...iconTextStyle, marginTop: '1rem' }}>The Front End Holy Trinity</p>
                            </div>
                            <span>Preview 11:46</span>
                        </div>
                    </div>
                </Panel>
                <Panel
                    header={
                        <div style={headerStyle}>
                            <div className='flex items-left'>
                                <VideoCameraOutlined />
                                <span style={iconTextStyle}>Introduction to HTML</span>
                            </div>
                            <div>
                                <span>58:55</span>
                            </div>
                        </div>
                    }
                    key="3"
                    showArrow={false}
                >
                    <div style={contentStyle}>
                        <div style={itemStyle}>
                            <div className="flex items-left">
                                <PlayCircleOutlined />
                                <p style={iconTextStyle}>Unit Objectives</p>
                            </div>
                            <span>Preview 01:40</span>
                        </div>
                    </div>
                </Panel>
                <Panel
                    header={
                        <div style={headerStyle}>
                            <div className='flex items-left'>
                                <VideoCameraOutlined />
                                <span style={iconTextStyle}>Intermediate HTML</span>
                            </div>
                            <div>
                                <span>01:12:29</span>
                            </div>
                        </div>
                    }
                    key="4"
                    showArrow={false}
                >
                    <div style={contentStyle}>
                        <div style={itemStyle}>
                            <div className="flex items-left">
                                <PlayCircleOutlined />
                                <p style={iconTextStyle}>Unit Objectives</p>
                            </div>
                            <span>Preview 01:40</span>
                        </div>
                    </div>
                </Panel>
            </Collapse>
        </div>
    );
};

export default Courses;

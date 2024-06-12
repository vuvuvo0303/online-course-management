import React from 'react';
import { Collapse } from 'antd';
import 'tailwindcss/tailwind.css';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items = [
    {
        key: '1',
        label: 'This is panel header 1',
        children: <p>{text}</p>,
    },
    {
        key: '2',
        label: 'This is panel header 2',
        children: <p>{text}</p>,
    },
    {
        key: '3',
        label: 'This is panel header 3',
        children: <p>{text}</p>,
    },
];

const App: React.FC = () => {
    const onChange = (key: string | string[]) => {
        console.log(key);
    };

    return (
        <div className="min-h-screen flex">
            <div className="w-4/5 p-6 bg-white">
                <div className="text-center mb-4">
                    <h1 className="text-2xl font-bold">Node & ExpressJS</h1>
                    <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
                        <iframe
                            src="https://www.youtube.com/embed/ZmU6BxxvzeU"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Node & ExpressJS"
                            className="absolute top-0 left-0 w-full h-full"
                        />
                    </div>
                </div>
                <div>
                    <h2 className="text-xl font-semibold mt-4">Description</h2>
                    <p>This section can contain the description of the course or video content.</p>
                </div>
            </div>
            <div className="w-1/5 bg-white p-4">
                <Collapse defaultActiveKey={['1']} onChange={onChange}>
                    {items.map((item) => (
                        <Collapse.Panel header={item.label} key={item.key}>
                            {item.children}
                        </Collapse.Panel>
                    ))}
                </Collapse>
            </div>
        </div>
    );
};

export default App;

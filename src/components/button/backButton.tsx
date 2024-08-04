import React from 'react';
import { Button } from "antd";
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
    path: string;
    label?: string;
    className?: string;
    style?: React.CSSProperties;
}

const BackButton: React.FC<BackButtonProps> = ({
    path,
    label = "Home",
    className = "absolute top-4 left-4 text-blue-500 bg-white bg-opacity-70 font-bold py-2 px-4 rounded-lg inline-flex items-center",
    style
}) => {
    const navigate = useNavigate();

    return (
        <Button
            type="link"
            icon={<LeftOutlined />}
            onClick={() => navigate(path)}
            className={className}
            style={style}
        >
            {label}
        </Button>
    );
};

export default BackButton;

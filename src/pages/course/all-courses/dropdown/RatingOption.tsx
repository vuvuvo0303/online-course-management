// RatingOption.tsx
import React from 'react';
import { StarFilled } from '@ant-design/icons';

interface RatingOptionProps {
    value: number;
    label: string;
}

const RatingOption: React.FC<RatingOptionProps> = ({ value, label }) => {
    return (
        <div className="flex items-center">
            {Array.from({ length: value }).map((_, index) => (
                <StarFilled key={index} className="text-yellow-400" />
            ))}
            {Array.from({ length: 5 - value }).map((_, index) => (
                <StarFilled key={index + value} className="text-gray-300" />
            ))}
            <span className="ml-2 text-gray-800">{label}</span>
        </div>
    );
};

export default RatingOption;

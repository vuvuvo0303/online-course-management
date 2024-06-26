import { useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { categoryFilters } from '../consts/index';

const SearchTool = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        // Implement your search logic here
        const results = categoryFilters.filter(filter =>
            filter.toLowerCase().includes(searchTerm.toLowerCase())
        );
        console.log(results);
    };

    return (
        <div className="flex items-center">
            <Input
                className="w-full"
                placeholder="Search categories"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onPressEnter={handleSearch}
                prefix={<SearchOutlined />}
            />
        </div>
    );
};

export default SearchTool;
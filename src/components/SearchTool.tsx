import { useState } from 'react';
import { Input, Dropdown, Typography, Button } from 'antd';
import type { MenuProps } from 'antd';
import { SearchOutlined, TagOutlined, FileTextOutlined, ImportOutlined } from '@ant-design/icons';
import { categoryFilters } from '../consts';

const SearchTool = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItem, setSelectedItem] = useState('All'); // Default selected item

    const handleSearch = () => {
        // Implement your search logic here
        const results = categoryFilters.filter(filter =>
            filter.toLowerCase().includes(searchTerm.toLowerCase())
        );
        console.log(results);
    };

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: 'All',
            icon: <SearchOutlined />,
        },
        {
            key: '2',
            label: 'Course',
            icon: <FileTextOutlined />,
        },
        {
            key: '3',
            label: 'Category',
            icon: <ImportOutlined />,
        },
        {
            key: '4',
            label: 'Keyword',
            icon: <TagOutlined />,
        },
    ];

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        const selectedItem = items.find(item => item && 'label' in item && item.key === e.key);
        if (selectedItem && 'label' in selectedItem) {
            setSelectedItem(selectedItem.label as string || 'Selectable');
        } else {
            setSelectedItem('Selectable');
        }
    };

    return (
        <div className="relative w-full md:w-[650px] md:ml-[9rem]">
            <div className="flex items-center">
                <Dropdown
                    menu={{
                        items,
                        selectable: true,
                        defaultSelectedKeys: ['1'],
                        onClick: handleMenuClick,
                    }}
                >
                    <Typography.Link>
                        <Button className="rounded-l-lg md:rounded-r-none border border-black md:border-r-0">
                            {selectedItem}
                        </Button>
                    </Typography.Link>
                </Dropdown>
                <Input
                    className="w-full md:rounded-l-none rounded-r-lg border-black"
                    placeholder="Search categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onPressEnter={handleSearch}
                    suffix={<SearchOutlined className='ml-2' />}
                />
            </div>
        </div>
    );
};

export default SearchTool;

import { useState } from 'react';
import { Input, Dropdown, Typography, Button, Drawer, Popover, List } from 'antd';
import { SearchOutlined, TagOutlined, FileTextOutlined, ImportOutlined } from '@ant-design/icons';
import { categoryFilters } from '../consts';


const SearchTool = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItem, setSelectedItem] = useState('All');
    const [drawerVisible, setDrawerVisible] = useState(false);

    const handleSearch = () => {
        // Implement your search logic here
        const results = categoryFilters.filter(filter =>
            filter.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
    };

    const [searchResults, setSearchResults] = useState<string[]>([]);

    const items = [
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

    const handleMenuClick = (e: { key: string; }) => {
        const selectedItem = items.find(item => item.key === e.key);
        if (selectedItem) {
            setSelectedItem(selectedItem.label);
        } else {
            setSelectedItem('All'); // Default fallback
        }
    };

    const toggleDrawer = () => {
        setDrawerVisible(!drawerVisible);
    };

    const content = (
        <div>
            <List
                dataSource={searchResults}
                renderItem={item => (
                    <List.Item>
                        {item}
                    </List.Item>
                )}
                size="small"
            />
        </div>
    );

    return (
        <div className="relative w-full md:w-[650px] md:ml-[3.5rem]">
            <div className="flex items-center">
                <Popover
                    content={content}
                    trigger="click"
                    placement="bottomLeft"
                    visible={searchTerm.length > 0 && searchResults.length > 0}
                >
                    <Input.Search
                        addonBefore={<Dropdown
                            menu={{
                                items,
                                selectable: true,
                                defaultSelectedKeys: ['1'],
                                onClick: handleMenuClick,
                            }}
                        >
                            <Typography.Link>
                                <Button className="border-none h-[1rem]">
                                    {selectedItem}
                                </Button>
                            </Typography.Link>
                        </Dropdown>}
                        className="w-full hidden md:block"
                        placeholder="Search categories..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onSearch={handleSearch}
                    />
                </Popover>
                <Button
                    className="md:hidden border border-none h-[31.6px]"
                    onClick={toggleDrawer}
                    icon={<SearchOutlined />}
                />
            </div>
            <Drawer
                placement="right"
                closable={true}
                onClose={toggleDrawer}
                open={drawerVisible}
                width={Math.min(window.innerWidth - 100, 320)}
            >
                <Input.Search
                    className="w-full rounded-lg border-black"
                    placeholder="Search categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onSearch={handleSearch}
                />
            </Drawer>
        </div>
    );
};

export default SearchTool;

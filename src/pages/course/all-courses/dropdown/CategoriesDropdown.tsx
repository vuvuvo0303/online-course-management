// import React from "react";
// import { Select } from "antd";
// import { Category } from "../../../../models/Category";

// interface CategoriesDropdownProps {
//     onSelect: (value: string, name: string) => void;
// }

// const CategoriesDropdown: React.FC<CategoriesDropdownProps> = ({ onSelect }) => {
//     const categories: Category[] = [ /* populate with your categories */ ];

//     const handleChange = (value: string, option: string) => {
//         onSelect(value, option.children);
//     };

//     return (
//         <Select placeholder="Select a category" onChange={handleChange}>
//             {categories.map((category) => (
//                 <Select.Option key={category._id} value={category._id}>
//                     {category.name}
//                 </Select.Option>
//             ))}
//         </Select>
//     );
// };

// export default CategoriesDropdown;

import React from "react";
import { Card } from "antd";
import { Category } from "models/Category";

interface CategoryCardProps {
    category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
    return (
        <Card
            hoverable
            className="m-2"
            style={{ width: 200, textAlign: "center" }}
        >
            <div className="text-xl font-semibold">{category.name}</div>
        </Card>
    );
};

export default CategoryCard;

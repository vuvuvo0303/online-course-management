import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import React from "react";
import { useLocation, Link } from "react-router-dom";

interface CustomBreadcrumbProps {
    homeHref?: string;
}

const CustomBreadcrumb: React.FC<CustomBreadcrumbProps> = ({
    homeHref = "/dashboard",
}) => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((item) => item);

    // Xác định vai trò dựa trên đường dẫn
    const isInstructorOrAdmin = pathnames.includes("instructor") || pathnames.includes("admin");

    // Format các phần breadcrumb
    const formatTitle = (title: string) => {
        return title.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
    };

    let currentPath = "";

    const breadcrumbItems = [
        {
            title: (
                <Link to={homeHref}>
                    <HomeOutlined />
                </Link>
            ),
        },
        ...pathnames.map((value, index) => {
            // Bỏ qua các phần breadcrumb nếu vai trò là instructor hoặc admin
            if (isInstructorOrAdmin) {
                if (value === "instructor" || value === "admin") {
                    return null;
                }
            }

            currentPath += `/${value}`;
            const isLast = index === pathnames.length - 1;

            // Skip IDs assuming they are numeric or are MongoDB ObjectIDs
            if (!isNaN(Number(value)) || value.match(/^[0-9a-fA-F]{24}$/)) {
                return null;
            }

            return {
                title: isLast ? (
                    formatTitle(value)
                ) : (
                    <Link to={currentPath}>{formatTitle(value)}</Link>
                ),
            };
        }).filter(item => item !== null),
    ];

    return (
        <Breadcrumb className="py-2" items={breadcrumbItems} />
    );
};

export default CustomBreadcrumb;

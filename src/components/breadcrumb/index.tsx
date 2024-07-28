import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";

interface CustomBreadcrumbProps {
    currentTitle: string;
    currentHref?: string;
}

const CustomBreadcrumb: React.FC<CustomBreadcrumbProps> = ({ currentTitle, currentHref }) => {
    const breadcrumbItems = [
        {
            title: (
                <a href={currentHref}>
                    <HomeOutlined />
                </a>
            ),
        },
        {
            title: currentTitle,
        },
    ];

    return (
        <Breadcrumb className="py-2" items={breadcrumbItems} />
    );
};

export default CustomBreadcrumb;

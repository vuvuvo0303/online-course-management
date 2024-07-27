import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";

interface CustomBreadcrumbProps {
    currentTitle: string;
    currentHref?: string;
}

const CustomBreadcrumb: React.FC<CustomBreadcrumbProps> = ({ currentTitle, currentHref }) => {
    return (
        <Breadcrumb className="py-2">
            <Breadcrumb.Item href={currentHref}>
                <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item>{currentTitle}</Breadcrumb.Item>
        </Breadcrumb>
    );
};

export default CustomBreadcrumb;

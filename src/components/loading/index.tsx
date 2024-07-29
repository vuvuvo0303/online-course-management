import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";

const LoadingComponent = () =>{    
    return (
        <>
            <p className="flex items-center justify-center h-96">

                <Flex align="center" gap="middle">
                    <Spin indicator={<LoadingOutlined spin />} size="large" />
                </Flex></p>
        </>
    );
}

export default LoadingComponent;
import { Button, Form } from "antd";

interface ButtonItemProps {
  loading: boolean;
  buttonText: string;
  htmlType: "button" | "submit" | "reset";
  className?: string;
  ariaLabel?: string;
  size?: "small" | "middle" | "large";
  style?: React.CSSProperties;
  onClick?: () => void;
}

const ButtonItem: React.FC<ButtonItemProps> = ({
  loading,
  buttonText,
  htmlType,
  className = "w-full mt-2 hover:opacity-90 shadow-sky-600",
  ariaLabel = "Button",
  size = "large",
  style,
  onClick
}) => {
  return (
    <Form.Item>
      <Button
        type="primary"
        size={size}
        htmlType={htmlType}
        className={className}
        loading={loading}
        disabled={loading}
        aria-label={ariaLabel}
        style={style}
        onClick={onClick}
      >
        {loading ? "Processing..." : buttonText}
      </Button>
    </Form.Item>
  );
};

export default ButtonItem;

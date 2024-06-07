
import { MouseEventHandler } from "react";

type CustomButtonProps = {
  title: string;
  containerStyles?: string;
  width?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

const CustomButton = ({ title, containerStyles, width, handleClick }: CustomButtonProps) => {
  return (
    <button disabled={false} type={"button"} className={`custom-btn ${containerStyles} w-${width} p-5 cursor-pointer border-none rounded text-white`} onClick={handleClick}>
      <span className={`flex-1`}>{title}</span>
    </button>
  )
}

export default CustomButton
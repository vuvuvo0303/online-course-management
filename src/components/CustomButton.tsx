
// import { MouseEventHandler } from "react";
// //

type CustomButtonProps = {
  title: string;
  containerStyles?: string;
  width?: string;
  handlePayment?:()=>void;
}

const CustomButton = ({ title, containerStyles, width , handlePayment}: CustomButtonProps) => {
  return (
    <button disabled={false} type={"button"} className={`custom-btn ${containerStyles} w-${width} p-5 cursor-pointer border-none rounded text-white`} onClick={handlePayment}>
      <span className={`flex-1`}>{title}</span>
    </button>
  )
}

export default CustomButton
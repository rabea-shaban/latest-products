import { HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLSpanElement> {
  bgColor: string;
}
const CircelColor = ({ bgColor, ...rest }: IProps) => {
  return (
    <span
      style={{ backgroundColor: bgColor }}
      className="w-5 h-5 mb-2 rounded-full  cursor-pointer"
      {...rest}
    />
  );
};

export default CircelColor;

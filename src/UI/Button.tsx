import { ButtonHTMLAttributes, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  width?: "w-full" | "w-fit";
}
const Button = ({ children, className, width, ...rest }: IProps) => {
  return (
    <button
      className={` ${width}  text-white p-2 text-center rounded-lg transition ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;

interface IProps {
  msg: string;
}
const ErrorMessage = ({ msg }: IProps) => {
  return msg ? (
    <p className="text-red-500 ms-3 pt-0.5 text-sm font-medium">{msg}</p>
  ) : null;
};

export default ErrorMessage;

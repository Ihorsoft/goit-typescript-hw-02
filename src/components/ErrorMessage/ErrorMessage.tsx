import css from "./ErrorMessage.module.css";

const ErrorMessage: React.FC = () => {
  return <p className={css.text}>Error. Please reload</p>;
};

export default ErrorMessage;

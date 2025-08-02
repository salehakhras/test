import type { IconType } from "react-icons";

interface ButtonProps {
  title?: string;
  onClick?: (event: React.FormEvent) => void;
  isPrimary?: boolean;
  color?: string;
  isWidthFull?: boolean;
  textColor?: string;
  isDisabled?: boolean;
  Icon?: IconType;
  extraClassName?: string;
}

const Button = ({
  title,
  onClick,
  isPrimary = false,
  color,
  isWidthFull = false,
  textColor,
  isDisabled = false,
  Icon,
  extraClassName = "",
}: ButtonProps) => {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={`btn ${isPrimary ? "btn-primary" : color} ${
        isWidthFull ? "w-full" : "w-fit"
      } ${textColor} ${extraClassName}`}
    >
      {Icon && <Icon className={`${textColor}`}></Icon>}
      {title}
    </button>
  );
};

export default Button;

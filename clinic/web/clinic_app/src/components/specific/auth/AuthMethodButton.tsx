import type { IconType } from "react-icons";

interface AuthMethodButtonProps {
  authMethodText: string;
  onClick: () => void;
  Icon: IconType;
}

const AuthMethodButton = ({
  Icon,
  onClick,
  authMethodText,
}: AuthMethodButtonProps) => {

  return (
    <button
      className="btn bg-base-200 dark:border-gray-400 shadow-md flex-1"
      onClick={onClick}
    >
      {Icon && <Icon className="size-5" />}
      {authMethodText}
    </button>
  );
};

export default AuthMethodButton;

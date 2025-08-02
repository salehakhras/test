import { Link } from "react-router-dom";

interface AuthFooterPromptProps {
  message: string;
  linkText: string;
  linkTo: string;
}

const AuthFooterPrompt = ({ message, linkText, linkTo }: AuthFooterPromptProps) => {
  return (
    <div>
      <span className="text-gray-500">{message} </span>
      <Link className="text-primary font-bold" to={linkTo}>
        {linkText}
      </Link>
    </div>
  );
};

export default AuthFooterPrompt;
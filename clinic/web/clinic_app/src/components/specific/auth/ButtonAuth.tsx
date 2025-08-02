interface ButtonAuthProps {
  title: string;
  onClick: (event: React.FormEvent) => void;
  children?: React.ReactNode;
}

const ButtonAuth = ({ title, onClick, children }: ButtonAuthProps) => {
  return (
    <button className="btn btn-primary w-full" onClick={onClick}>
      {title} {children}
    </button>
  );
};

export default ButtonAuth;

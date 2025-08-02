interface StepListProps {
  isPrimary: boolean;
  title: string;
}

const StepList = ({ title, isPrimary }: StepListProps) => {
  return (
    <li
      className={`step  ${
        isPrimary ? "step-primary" : "scale-95"
      } transition-all duration-300 ease-in-out`}
    >
      {title}
    </li>
  );
};

export default StepList;

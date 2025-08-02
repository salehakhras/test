interface TimeInputProps {
  isDisabled?: boolean;
  dayIndex?: number;
  rangeIndex?: number;
  field: "start" | "end";
  value: string;
  min?: string;
  max?: string;
  className?: string;
  onChange: (
    field: "start" | "end",
    value: string,
    dayIndex?: number,
    rangeIndex?: number
  ) => void;
}

const TimeInput = ({
  isDisabled = false,
  onChange,
  dayIndex,
  rangeIndex,
  field,
  value,
  className,
  min,
  max,
}: TimeInputProps) => {
  return (
    <input
      type="time"
      className={`input shadow-sm border-none bg-transparent outline-none input-sm w-24 input-primary ${className}`}
      disabled={isDisabled}
      value={value}
      min={min}
      max={max}
      onChange={(e) => onChange(field, e.target.value, dayIndex, rangeIndex)}
    />
  );
};

export default TimeInput;

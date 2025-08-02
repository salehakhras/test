import type { workingHourModel } from "../../../utils/constants/models/workingHoursModel";
import { convertTo12HourFormat } from "../../../utils/helpers/transformTime";

const workingDays = [
  { day: "Sunday", symbol: "S" },
  { day: "Monday", symbol: "M" },
  { day: "Tuesday", symbol: "T" },
  { day: "Wednesday", symbol: "W" },
  { day: "Thursday", symbol: "T" },
  { day: "Friday", symbol: "F" },
];

interface WorkingDaysCirclesProps {
  workingHours: workingHourModel[];
}

const WorkingDaysCircles = ({ workingHours }: WorkingDaysCirclesProps) => {
  return (
    <div className="flex flex-row ">
      {workingDays.map(({ day, symbol }) => {
        const matches = workingHours.filter((hour) => hour.day === day);
        const isWorkingDay = matches.length > 0;
        return (
          <div
            key={day}
            className={`tooltip ${
              isWorkingDay && "tooltip-primary cursor-pointer"
            }`}
          >
            {isWorkingDay && (
              <div className="tooltip-content">
                {matches.map((range, index) => (
                  <div key={index} className="font-black">
                    {convertTo12HourFormat(range?.start)} -{" "}
                    {convertTo12HourFormat(range?.end)}
                  </div>
                ))}
              </div>
            )}
            <div
              key={day}
              className={`p-2 rounded-full w-5 h-5 flex  text-xs items-center justify-center mx-0.5 ${
                isWorkingDay ? "bg-primary text-white" : "bg-base-300"
              }`}
            >
              {symbol}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WorkingDaysCircles;

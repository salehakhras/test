import type { preWorkingHourModel } from "../../../features/dashboard/manager/schemas/clinicInfoSchema";
import { convertTo12HourFormat } from "../../../utils/helpers/transformTime";

interface WorkingHoursTableProps {
  days: preWorkingHourModel[];
  height?: string;
  className?: string;
}

const WorkingHoursTable = ({
  days,
  height,
  className,
}: WorkingHoursTableProps) => {
  const groupedByDay = days.reduce<
    Record<string, { start: string; end: string }[]>
  >((acc, curr) => {
    if (!acc[curr.day]) acc[curr.day] = [];
    acc[curr.day].push({ start: curr.start, end: curr.end });
    return acc;
  }, {});
  return (
    <div className={`${height} overflow-x-auto`}>
      <table className={`table table-pin-rows ${className}`}>
        <thead>
          <tr>
            <th>Day</th>
            <th>Time Range</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(groupedByDay).map(([day, timeRanges]) => (
            <tr key={day}>
              <td className="font-medium align-top">{day}</td>
              <td className="p-0">
                <table className="table table-sm">
                  <tbody>
                    {timeRanges.map((range, index) => (
                      <tr key={index}>
                        <td> {convertTo12HourFormat(range.start)}</td>
                        <td> {convertTo12HourFormat(range.end)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkingHoursTable;

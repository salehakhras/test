import type { workingHourModel } from "../../../utils/constants/models/workingHoursModel";
import TimeInput from "../../specific/CreateClinic/TimeInput";
import { useStaffWorkingHours } from "../../../features/dashboard/manager/hooks/useStaffWorkingHours";
import { useEffect } from "react";

interface SetWorkingHoursTableProps {
  clinicWorkingHours: workingHourModel[];
  onChange: (value: workingHourModel[], isValid: boolean) => void;
}

const SetStaffWorkingHoursTable = ({
  clinicWorkingHours,
  onChange,
}: SetWorkingHoursTableProps) => {
  const {
    staffWorkingHours,
    isTimeInvalid,
    handleToggle,
    handleTimeChange,
    minRange,
    maxRange,
    areDaysValid,
  } = useStaffWorkingHours(clinicWorkingHours!);
  useEffect(() => {
    const updated = staffWorkingHours
      .filter((d) => d.isWorking)
      .map((d) => ({
        day: d.day,
        start: d.start,
        end: d.end,
      }));

    const isValid = areDaysValid();
    console.log("isValid", isValid);
    onChange(updated, isValid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staffWorkingHours]);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-pin-rows">
          <thead>
            <tr>
              <th></th>
              <th>Day</th>
              <th>Start time</th>
              <th>End time</th>
            </tr>
          </thead>

          <tbody>
            {staffWorkingHours.map((day, index) => (
              <tr key={index} className={isTimeInvalid(day) ? "bg-red-50" : ""}>
                <td>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={day.isWorking}
                      onChange={() => handleToggle(index)}
                    />
                  </label>
                </td>
                <th>
                  {day.day}{" "}
                  {isTimeInvalid(day) && (
                    <span className="text-xs text-error block mt-1">
                      Invalid time range
                    </span>
                  )}
                </th>

                <td>
                  <TimeInput
                    isDisabled={!day.isWorking}
                    index={index}
                    field="start"
                    value={day.start}
                    min={minRange(day)}
                    max={maxRange(day)}
                    onChange={(field, value, index) =>
                      handleTimeChange(index!, field, value)
                    }
                  />
                </td>
                <td>
                  <TimeInput
                    isDisabled={!day.isWorking}
                    index={index}
                    field="end"
                    value={day.end}
                    min={minRange(day)}
                    max={maxRange(day)}
                    onChange={(field, value, index) =>
                      handleTimeChange(index!, field, value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SetStaffWorkingHoursTable;

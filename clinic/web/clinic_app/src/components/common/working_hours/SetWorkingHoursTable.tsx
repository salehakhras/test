import { useEffect } from "react";
import { useWorkingHours } from "../../../features/createClinic/hooks/useWorkingHours";
import type { workingHourModel } from "../../../utils/constants/models/workingHoursModel";
import TimeInput from "../../specific/CreateClinic/TimeInput";
import Button from "../button/button";
import { IoMdAdd } from "react-icons/io";
import { MdRemove } from "react-icons/md";

interface SetWorkingHoursTableProps {
  prevWorkingHours?: workingHourModel[];
  onChange: (value: workingHourModel[], areValid: boolean) => void;
}

const SetWorkingHoursTable = ({
  prevWorkingHours,
  onChange,
}: SetWorkingHoursTableProps) => {
  const {
    days,
    sharedTime,
    useSameTime,
    handleTimeChange,
    isInvalidDay,
    areDaysValid,
    handleSharedTimeChange,
    handleSetUseSameTime,
    addTimeRange,
    removeTimeRange,
  } = useWorkingHours(prevWorkingHours);

  useEffect(() => {
    const updated = days
      .filter((d) => d.isOn)
      .flatMap((d) =>
        d.timeRanges.map((range) => ({
          day: d.name,
          start: range.start,
          end: range.end,
        }))
      );

    const isSame = JSON.stringify(updated) === JSON.stringify(prevWorkingHours);
    const isValid = areDaysValid();
    if (!isSame) {
      onChange(updated, isValid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);
  return (
    <>
      <label className="flex items-center gap-2 mb-3">
        <input
          type="checkbox"
          className="checkbox"
          checked={useSameTime}
          onChange={(e) => handleSetUseSameTime(e.target.checked)}
        />
        Use same time for all days
      </label>
      {useSameTime && (
        <div className="flex gap-4 items-center mb-3">
          <table className="table table-xs">
            <thead>
              <td>Start</td>
              <td>End</td>
            </thead>
            <tbody>
              <tr>
                <td>
                  <TimeInput
                    field="start"
                    value={sharedTime.start}
                    onChange={handleSharedTimeChange}
                  />
                </td>
                <td>
                  <TimeInput
                    field="end"
                    value={sharedTime.end}
                    onChange={handleSharedTimeChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <div>
        <table className="table table-sm  table-pin-rows">
          <thead>
            <tr>
              <th></th>
              <th>Day</th>
              <th>Working Time Range</th>
            </tr>
          </thead>

          <tbody>
            {days.map((day, dayIndex) => (
              <tr
                key={day.name}
                className={isInvalidDay(day) ? "bg-red-50" : ""}
              >
                <td>
                  <Button
                    Icon={IoMdAdd}
                    extraClassName="btn-xs bg-base-300"
                    onClick={() => addTimeRange(dayIndex)}
                  ></Button>
                </td>
                <th>
                  {day.name}{" "}
                  {isInvalidDay(day) && (
                    <span className="text-xs text-error block mt-1">
                      Invalid time range
                    </span>
                  )}
                </th>

                <td>
                  <table className="table ">
                    <tbody>
                      {day.timeRanges.map((range, rangeIndex) => (
                        <tr key={rangeIndex}>
                          <td>
                            <TimeInput
                              isDisabled={!day.isOn}
                              dayIndex={dayIndex}
                              rangeIndex={rangeIndex}
                              field="start"
                              value={range.start}
                              onChange={(field, value, dayIndex, rangeIndex) =>
                                handleTimeChange(
                                  dayIndex!,
                                  rangeIndex!,
                                  field,
                                  value
                                )
                              }
                            />
                          </td>
                          <td>
                            <TimeInput
                              isDisabled={!day.isOn}
                              dayIndex={dayIndex}
                              rangeIndex={rangeIndex}
                              field="end"
                              value={range.end}
                              onChange={(field, value, dayIndex, rangeIndex) =>
                                handleTimeChange(
                                  dayIndex!,
                                  rangeIndex!,
                                  field,
                                  value
                                )
                              }
                            />
                          </td>
                          <td>
                            <Button
                              Icon={MdRemove}
                              extraClassName="btn-xs "
                              isWidthFull={true}
                              onClick={() =>
                                removeTimeRange(dayIndex, rangeIndex)
                              }
                            ></Button>
                          </td>
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
    </>
  );
};

export default SetWorkingHoursTable;

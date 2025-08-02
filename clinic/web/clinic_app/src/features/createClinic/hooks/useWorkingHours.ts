import { useCallback, useState } from "react";
import type { workingHourModel } from "../../../utils/constants/models/workingHoursModel";

interface TimeRange {
  start: string;
  end: string;
}

interface DaySchedule {
  name: string;
  isOn: boolean;
  timeRanges: TimeRange[];
}

const defaultDays: DaySchedule[] = [
  {
    name: "Sunday",
    isOn: true,
    timeRanges: [{ start: "09:00", end: "17:00" }],
  },
  {
    name: "Monday",
    isOn: true,
    timeRanges: [{ start: "09:00", end: "17:00" }],
  },
  {
    name: "Tuesday",
    isOn: true,
    timeRanges: [{ start: "09:00", end: "17:00" }],
  },
  {
    name: "Wednesday",
    isOn: true,
    timeRanges: [{ start: "09:00", end: "17:00" }],
  },
  {
    name: "Thursday",
    isOn: true,
    timeRanges: [{ start: "09:00", end: "17:00" }],
  },
  {
    name: "Friday",
    isOn: true,
    timeRanges: [{ start: "09:00", end: "17:00" }],
  },
  {
    name: "Saturday",
    isOn: true,
    timeRanges: [{ start: "09:00", end: "17:00" }],
  },
];

export const useWorkingHours = (initialWorkingHours?: workingHourModel[]) => {
  const [days, setDays] = useState<DaySchedule[]>(() => {
    if (initialWorkingHours && initialWorkingHours.length > 0) {
      return defaultDays.map((day) => {
        const matches = initialWorkingHours.filter((w) => w.day === day.name);
        return {
          ...day,
          isOn: matches.length > 0,
          timeRanges: matches.map(({ start, end }) => ({ start, end })),
        };
      });
    }
    return defaultDays.map((day) => ({
      ...day,
      timeRanges: day.timeRanges.map((range) => ({ ...range })),
    }));
  });

  const [useSameTime, setUseSameTime] = useState(false);
  const [sharedTime, setSharedTime] = useState({
    start: "09:00",
    end: "17:00",
  });
  const handleToggle = (index: number) => {
    const updated = [...days];
    updated[index].isOn = !updated[index].isOn;

    // Reset times when closed
    if (!updated[index].isOn) {
      updated[index].timeRanges = [];
    } else if (updated[index].timeRanges.length === 0) {
      updated[index].timeRanges = [{ start: "09:00", end: "17:00" }];
    }

    setDays(updated);
  };
  const handleTimeChange = (
    dayIndex: number,
    rangeIndex: number,
    field: "start" | "end",
    value: string
  ) => {
    const updated = [...days];
    updated[dayIndex].timeRanges[rangeIndex][field] = value;
    setDays(updated);
  };
  const addTimeRange = (dayIndex: number) => {
    const updated = [...days];
    updated[dayIndex].timeRanges.push({ start: "09:00", end: "17:00" });
    if (updated[dayIndex].isOn === false) {
      updated[dayIndex].isOn = true;
    }
    setDays(updated);
  };
  const removeTimeRange = (dayIndex: number, rangeIndex: number) => {
    const updated = [...days];
    updated[dayIndex].timeRanges.splice(rangeIndex, 1);

    if (updated[dayIndex].timeRanges.length === 0) {
      updated[dayIndex].isOn = false;
    }

    setDays(updated);
  };
  const isInvalidDay = (day: DaySchedule) => {
    return day.timeRanges.some((range) => range.start >= range.end);
  };
  const areDaysValid = useCallback(() => {
    return days.every((day) => !isInvalidDay(day));
  }, [days]);

  const handleSharedTimeChange = (field: "start" | "end", value: string) => {
    const newShared = { ...sharedTime, [field]: value };
    setSharedTime(newShared);

    if (useSameTime) {
      const updated = days.map((day) =>
        day.isOn
          ? {
              ...day,
              timeRanges: [newShared],
            }
          : day
      );
      setDays(updated);
    }
  };
  const handleSetUseSameTime = (isSameTimeChecked: boolean) => {
    setUseSameTime(isSameTimeChecked);

    if (isSameTimeChecked) {
      const updated = days.map((day) =>
        day.isOn
          ? {
              ...day,
              timeRanges: [sharedTime],
            }
          : day
      );
      setDays(updated);
    }
  };
  return {
    days,
    sharedTime,
    useSameTime,
    handleToggle,
    handleTimeChange,
    addTimeRange,
    removeTimeRange,
    isInvalidDay,
    areDaysValid,
    handleSharedTimeChange,
    handleSetUseSameTime,
  };
};

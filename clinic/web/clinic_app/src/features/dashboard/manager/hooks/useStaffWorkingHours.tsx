import { useCallback, useState } from "react";
import type { workingHourModel } from "../../../../utils/constants/models/workingHoursModel";

interface StaffDaySchedule {
  day: string;
  isWorking: boolean;
  start: string;
  end: string;
}

export const useStaffWorkingHours = (
  clinicWorkingHours: workingHourModel[]
) => {
  const [staffWorkingHours, setStaffWorkingHours] = useState<
    StaffDaySchedule[]
  >(
    clinicWorkingHours.map((day) => {
      return {
        ...day,
        isWorking: true,
      };
    })
  );
  const minRange = (day: workingHourModel) => {
    const clinicDay = clinicWorkingHours.find(
      (clinicDay) => clinicDay.day === day.day // Assuming day has a property that matches with clinicWorkingHours
    );
    return clinicDay?.start;
  };

  const maxRange = (day: workingHourModel) => {
    const clinicDay = clinicWorkingHours.find(
      (clinicDay) => clinicDay.day === day.day // Assuming day has a property that matches with clinicWorkingHours
    );
    return clinicDay?.end;
  };
  const isTimeInvalid = (day: StaffDaySchedule): boolean => {
    if (!day.isWorking) return false;

    const clinicDay = clinicWorkingHours.find((cd) => cd.day === day.day);
    if (!clinicDay) return true;

    const isStartMissing = !day.start;
    const isEndMissing = !day.end;
    const isStartBeforeClinic = day.start < clinicDay.start;
    const isEndAfterClinic = day.end > clinicDay.end;
    const isStartAfterEnd = day.start >= day.end;

    return (
      isStartMissing ||
      isEndMissing ||
      isStartBeforeClinic ||
      isEndAfterClinic ||
      isStartAfterEnd
    );
  };
  const areDaysValid = useCallback(() => {
    return staffWorkingHours.every((day) => !isTimeInvalid(day));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staffWorkingHours]);

  const handleToggle = (index: number) => {
    const updated = [...staffWorkingHours];
    updated[index].isWorking = !updated[index].isWorking;

    // Reset times when closed
    if (!updated[index].isWorking) {
      updated[index].start = "";
      updated[index].end = "";
    }

    setStaffWorkingHours(updated);
  };

  const handleTimeChange = (
    index: number,
    field: "start" | "end",
    value: string
  ) => {
    setStaffWorkingHours((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  return {
    staffWorkingHours,
    isTimeInvalid,
    handleToggle,
    handleTimeChange,
    minRange,
    maxRange,
    areDaysValid,
  };
};

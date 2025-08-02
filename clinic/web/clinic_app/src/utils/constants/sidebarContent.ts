import type { IconType } from "react-icons";
import {
  MdOutlineDashboard,
  MdOutlinePerson,
  MdOutlineSettings,
  MdOutlineMedicalServices,
} from "react-icons/md";
import { AiOutlineSchedule, AiOutlineTeam } from "react-icons/ai";
import Paths from "../../routes/Paths";
import { t } from "i18next";

export interface sidebarContent {
  title: string;
  icon: IconType;
  linkTo: string;
}
export const managerSidebar = (
  clinicId: number
): Record<string, sidebarContent> => {
    return ({
      dashboard: {
        title: t("sidebar.dashboard"),
        icon: MdOutlineDashboard,
        linkTo: `${Paths.managerPage}/${clinicId}`,
      },
      appointments: {
        title: t("sidebar.appointments"),
        icon: AiOutlineSchedule,
        linkTo: `${Paths.managerPage}/${clinicId}/${Paths.appointments}`,
      },
      patients: {
        title: t("sidebar.patients"),
        icon: MdOutlinePerson,
        linkTo: `${Paths.managerPage}/${clinicId}/${Paths.patients}`,
      },
      staff: {
        title: t("sidebar.staff"),
        icon: AiOutlineTeam,
        linkTo: `${Paths.managerPage}/${clinicId}/${Paths.staff}`,
      },
      services: {
        title: t("sidebar.services"),
        icon: MdOutlineMedicalServices,
        linkTo: `${Paths.managerPage}/${clinicId}/${Paths.services}`,
      },
      settings: {
        title: t("sidebar.settings"),
        icon: MdOutlineSettings,
        linkTo: `${Paths.managerPage}/${clinicId}/${Paths.settings}`,
      },
    });
  };

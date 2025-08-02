import { t } from "i18next";
import ClinicGalleryPage from "../../features/dashboard/manager/layouts/clinic_settings/ClinicGalleryPage";
import ClinicInfoPage from "../../features/dashboard/manager/layouts/clinic_settings/ClinicInfoPage";
import DoctorsPage from "../../features/dashboard/manager/layouts/manager_staff/DoctorsPage";
import SecretariesPage from "../../features/dashboard/manager/layouts/manager_staff/SecretariesPage";

export interface tabsContent {
  title: string;
  content: React.ReactNode;
}

export const clinicSettingsTabs: Record<string, tabsContent> = {
  info: {
    title: t("info"),
    content: <ClinicInfoPage />,
  },
  gallery: {
    title: t("gallery"),
    content: <ClinicGalleryPage />,
  },
};

export const clinicStaffTabs: Record<string, tabsContent> = {
  info: {
    title: t("doctors"),
    content: <DoctorsPage />,
  },
  gallery: {
    title: t("secretaries"),
    content: <SecretariesPage />,
  },
};

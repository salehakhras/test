import React, { useMemo } from "react";
import type { sidebarContent } from "../../utils/constants/sidebarContent";
import LanguageDropdown from "../../components/common/languageDropDown";
import ResponsiveSearch from "../../components/common/ResponsiveSearch";
import ProfileDropDown from "../../components/specific/dashboard/ProfileDropDown";
import { MdMenu } from "react-icons/md";
import Sidebar from "../../components/common/sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import type { Clinic } from "../../features/dashboard/manager/schemas/clinicInfoSchema";

interface Dashboardrops {
  clinics: Clinic[];
  currentClinicId?: number;
  onClinicChange?: (id: number) => void;
  mainContent: React.ReactNode;
  sidebarList: Record<string, sidebarContent>;
}

const Dashboard = ({
  sidebarList,
  clinics,
  currentClinicId,
  onClinicChange,
  mainContent,
}: Dashboardrops) => {
  const location = useLocation();
  const currentTitle = useMemo(() => {
    const match = Object.values(sidebarList).find(
      (tile) =>
        (tile.title === "Dashboard" && location.pathname === tile.linkTo) ||
        (tile.title !== "Dashboard" &&
          location.pathname.startsWith(`${tile.linkTo}`))
    );
    return match?.title || "";
  }, [location.pathname, sidebarList]);
  return (
    <Sidebar
      clinics={clinics}
      currentClinicId={currentClinicId}
      onClinicChange={onClinicChange}
      sidebarList={sidebarList}
      mainContent={
        <div className="flex-1 flex flex-col">
          {/* Top Navbar */}
          <header className="p-2 flex justify-between items-center  flex-shrink-0">
            <div className="flex items-center gap-2 md:gap-4">
              {/* Menu Icon Button (Drawer trigger) */}
              <label
                htmlFor="sidebar-drawer"
                className="btn btn-ghost p-2 drawer-button lg:hidden"
              >
                <MdMenu className="size-5" />
              </label>
              {/* Search Input */}
              <div className="flex-1">
                <ResponsiveSearch />
              </div>
            </div>
            <div className="flex items-center">
              <LanguageDropdown textColor="text-base-content" />
              <ProfileDropDown />
            </div>
          </header>
          <div className="text-primary border-t mb-2 border-gray-400">
            <span className="hidden lg:flex capitalize text-sm mt-2 font-semibold">
              {currentTitle}
            </span>
          </div>
          {/* Page Content */}
          <main className="flex-1 overflow-hidden">
            {mainContent}
          </main>
        </div>
      }
    ></Sidebar>
  );
};

export default Dashboard;

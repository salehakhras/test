import { NavLink, useLocation } from "react-router-dom";
import type { sidebarContent } from "../../../utils/constants/sidebarContent";
import React from "react";
import type { Clinic } from "../../../features/dashboard/manager/schemas/clinicInfoSchema";

interface SidebarProps {
  clinics: Clinic[];
  currentClinicId?: number;
  onClinicChange?: (id: number) => void;
  mainContent: React.ReactNode;
  sidebarList: Record<string, sidebarContent>;
}

const Sidebar = ({
  sidebarList,
  clinics,
  currentClinicId,
  onClinicChange,
  mainContent,
}: SidebarProps) => {
  const location = useLocation();
  const currentClinic = clinics.find((c) => c.id === currentClinicId);
  return (
    <div className="drawer lg:drawer-open bg-base-100">
      <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col lg:px-4 lg:pb-4 bg-base-200 lg:bg-transparent">
        {mainContent}
      </div>
      <div className="drawer-side">
        <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>
        <aside className="menu p-4 w-64 min-h-full bg-base-200 lg:bg-base-100">
          <h2 className="text-xl font-bold mb-4 text-primary ">Dental Hub</h2>

          {/* Clinic Dropdown */}
          <div className="mb-4">
            {clinics.length <= 1 ? (
              <div className="border border-gray-400  p-2 rounded text-center font-semibold bg-base-100">
                {currentClinic?.name || clinics[0]?.name || "No Clinic"}
              </div>
            ) : (
              <div className="dropdown w-full">
                <div
                  tabIndex={0}
                  className="border p-2 rounded w-full bg-base-100 font-semibold cursor-pointer"
                >
                  {currentClinic?.name || "Select Clinic"}
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full mt-1"
                >
                  {clinics.map((clinic) => (
                    <li key={clinic.id}>
                      <button
                        onClick={() => onClinicChange?.(clinic.id)}
                        className="text-left w-full"
                      >
                        {clinic.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <ul className="menu w-full">
            {Object.entries(sidebarList).map(([key, tile]) => {
              const currentPath = location.pathname;
              const isActive =
                key === "dashboard"
                  ? currentPath === tile.linkTo ||
                    currentPath === `${tile.linkTo}/`
                  : currentPath === tile.linkTo ||
                    currentPath.startsWith(`${tile.linkTo}/`);

              return (
                <React.Fragment key={key}>
                  <li className="mb-2">
                    <NavLink
                      to={tile.linkTo}
                      className={`flex items-center p-2 rounded ${
                        isActive ? "bg-primary/10 text-white" : ""
                      }`}
                    >
                      <tile.icon
                        className={`size-5 ${
                          isActive
                            ? "text-primary font-bold"
                            : "text-base-content"
                        }`}
                      />
                      <span
                        className={`ml-2 ${
                          isActive
                            ? "text-primary font-bold"
                            : "text-base-content"
                        }`}
                      >
                        {tile.title}
                      </span>
                    </NavLink>
                  </li>
                  {key === "dashboard" && <hr className="my-2" />}{" "}
                  {/* Add hr if key is 'dashboard' */}
                </React.Fragment>
              );
            })}
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default Sidebar;

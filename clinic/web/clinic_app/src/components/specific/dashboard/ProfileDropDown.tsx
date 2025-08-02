import { MdArrowDropDown } from "react-icons/md";
import ToggleTheme from "../../common/toggleTheme/ToggleTheme";
import { useAppSelector } from "../../../hooks/hooks";

const ProfileDropDown = () => {
  const { user } = useAppSelector((state) => state.auth);
  const getRoleName = () => {
    if (!user || user?.roles.length === 0) return undefined;
    const role = user.roles.reduce((min, role) =>
      role.id < min.id ? role : min
    );
    return role.name.charAt(0).toUpperCase() + role.name.slice(1);
  };
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost bg-transparent border-0 flex items-center"
      >
        <div className="avatar avatar-placeholder">
          <div className="w-10 bg-base-300 shadow-md rounded-full">
            {/* <img src="/avatar_placeholder.png" alt="User" /> */}
            <span className="text-gray-400">{user?.name.charAt(0)}</span>
          </div>
        </div>
        <div className=" hidden md:flex flex-col items-start  w-full">
          <span className="text-xs text-gray-400">{getRoleName()}</span>
          <span className="text-sm font-medium ">
            {user?.roles.some((role) => role.id === 3) && "Dr. "}
            {user?.name}
          </span>
        </div>

        <MdArrowDropDown className="hidden lg:flex size-6" />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-200 rounded-box z-1 w-52 p-2 shadow-sm"
      >
        <li className="lg:hidden">
          <span>
            {user?.roles.some((role) => role.id === 3) && "Dr. "}
            {user?.name}
          </span>
        </li>
        <hr className="lg:hidden" />

        <li>
          <ToggleTheme />
        </li>
        <li>
          <a>Profile</a>
        </li>
        <li>
          <span className="">Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropDown;

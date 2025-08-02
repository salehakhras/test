import { IoMdMoon } from "react-icons/io";
import { MdWbSunny } from "react-icons/md";
import { useToggleTheme } from "../../../hooks/useToggleTheme";

const ToggleTheme = () => {
  const { theme, toggleTheme } = useToggleTheme();

  return (
    <label className="swap swap-rotate  justify-start items-center">
      {/* this hidden checkbox controls the state */}
      <input
        type="checkbox"
        className="theme-controller"
        onChange={toggleTheme}
        checked={theme === "dark"}
      />
      <div className="swap-on flex items-center gap-2 justify-start">
        <MdWbSunny className="size-5" />
        <span className="text-sm">Light Mode</span>
      </div>
      <div className="swap-off flex items-center gap-2 justify-start">
        <IoMdMoon className="size-5" />
        <span className="text-sm">Dark Mode</span>
      </div>
    </label>
  );
};

export default ToggleTheme;

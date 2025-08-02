// components/LanguageDropdown.tsx

import { MdArrowDropDown, MdOutlineLanguage } from "react-icons/md";
import { useAppDispatch } from "../../hooks/hooks";
import { setLanguage } from "../../store/slices/languageSlice";

interface LanguageDropdownProps {
  textColor?: string;
  extraClassName?: string;
}

const LanguageDropdown = ({
  textColor,
  extraClassName = "",
}: LanguageDropdownProps) => {
  const dispatch = useAppDispatch();
  // const { language } = useAppSelector((state) => state.language);

  const handleChange = (lang: "en" | "ar") => {
    dispatch(setLanguage(lang));
  };

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className={`btn btn-ghost p-2 ${
          textColor || "text-white m-1"
        } ${extraClassName}`}
      >
        <MdOutlineLanguage className="size-5" />
        <MdArrowDropDown className="hidden lg:flex" />
        {/* <span className="hidden md:flex ">{language.toUpperCase()}</span> */}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-32 text-base-content"
      >
        <li>
          <button onClick={() => handleChange("en")}>English</button>
        </li>
        <li>
          <button onClick={() => handleChange("ar")}>العربية</button>
        </li>
      </ul>
    </div>
  );
};

export default LanguageDropdown;

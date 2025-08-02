import type { IconType } from "react-icons";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
//import { phoneCodes } from "../../../hooks/Auth/useAuthLogin";
//import egyptFlag from '../../../assets/flag_egypt.svg';
//import CustomDropdown from "../../../features/auth/components/PhoneCodesDropdown";
//<CustomDropdown />
interface InputFieldProps {
  labelName: string;
  type: string;
  placeholder: string;
  Icon?: IconType;
  obscureText?: boolean;
  onClickIcon?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onChange?: (value: string) => void;
  value: string;
  error: string;
  children?: React.ReactNode;
  isTextArea?: boolean;
  rows?: number;
}

const InputField = ({
  labelName,
  type,
  placeholder,
  Icon,
  onClickIcon,
  obscureText,
  onChange,
  value,
  children,
  error,
  isTextArea = false,
  rows = 3,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col justify-center items-center">
      {/*******input field name********/}
      <label className="w-full text-sm text-gray-500">{labelName}</label>
      <div className="w-full flex flex-row space-x-2">
        {/*******PHONE********/}
        {children}
        {/*******INPUT field********/}
        <div
          className={`w-full rounded-md bg-base-200 px-3 py-2 ${
            error ? "border border-error" : "border border-gray-400"
          }`}
        >
          {isTextArea ? (
            <textarea
              onChange={(e) => onChange?.(e.target.value)}
              value={value}
              placeholder={placeholder}
              rows={rows}
              className="w-full resize-none bg-transparent outline-none "
              required
            />
          ) : (
            <div className="flex items-center justify-between">
              <input
                onChange={(e) => onChange?.(e.target.value)}
                value={value}
                type={obscureText === false ? "text" : type}
                placeholder={placeholder}
                className="w-full bg-transparent outline-none"
                required
              />
              {/**********ICON********/}
              {obscureText == null ? (
                Icon && (
                  <Icon
                    className={`size-5 ${
                      error ? "text-error" : "text-gray-400"
                    }`}
                  />
                )
              ) : (
                /******password show password icon********/
                <button
                  type="button"
                  className="btn rounded-full p-0 flex border-0 h-fit"
                  onClick={onClickIcon}
                >
                  {obscureText == true ? (
                    <MdVisibilityOff
                      className={`size-5 ${
                        error ? "text-error" : "text-gray-400"
                      }`}
                    />
                  ) : (
                    <MdVisibility
                      className={`size-5 ${
                        error ? "text-error" : "text-gray-400"
                      }`}
                    />
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      {error && <p className="text-error text-xs mt-1 w-full">{error}</p>}
    </div>
  );
};

export default InputField;

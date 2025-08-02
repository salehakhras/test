import {
  phoneCodes,
  type PhoneCodeInterface,
} from "../../utils/constants/PhoneCodes";

interface PhoneCodesDropdownProps {
  selectedCode: PhoneCodeInterface;
  onSelect: (
    country: PhoneCodeInterface,
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => void;
}
const PhoneCodesDropdown = ({
  selectedCode,
  onSelect,
}: PhoneCodesDropdownProps) => {
  return (
    <div className="dropdown dropdown-hover ">
      <div
        role="button"
        className="btn bg-base-200 rounded-box border-gray-400 h-full w-full rounded-md"
      >
        <img
          src={selectedCode.icon}
          alt={`${selectedCode.countryCode} Flag`}
          className="w-4 h-fit mr-1"
        />
        {selectedCode.code}
      </div>
      <ul className="dropdown-content absolute bg-base-200 border border-gray-400 mt-1 w-full z-10 max-h-40 overflow-y-auto rounded-md">
        {Object.entries(phoneCodes).map(([countryName, country]) => (
          <li
            key={countryName}
            onClick={(event) => onSelect(country, event)}
            className="text-sm flex items-center p-2 hover:bg-gray-200 cursor-pointer"
          >
            <img
              src={country.icon}
              alt={`${selectedCode.countryCode} Flag`}
              className="w-4 h-fit mr-1"
            />
            {country.code}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PhoneCodesDropdown;

import type { CountryCode } from "libphonenumber-js";
import egyptFlag from "../../assets/flag_egypt.svg";
import syriaFlag from "../../assets/flag_syria.svg";

export interface PhoneCodeInterface {
  countryName: string;
  code: string;
  icon: string;
  countryCode: CountryCode;
}

export const phoneCodes: Record<string, PhoneCodeInterface> = {
  syria: {
    countryName: "syria",
    code: "+963",
    icon: syriaFlag,
    countryCode: "SY",
  },
  egypt: {
    countryName: "egypt",
    code: "+20",
    icon: egyptFlag,
    countryCode: "EG",
  },
};

export class AppLink {
  // private static getApiHost(): string {
  //   const params = new URLSearchParams(window.location.search);
  //   const api = params.get("api");

  //   // If ?api= is provided, use it (e.g. from demo link)
  //   if (api) return api.trim().replace(/\/$/, "");

  //   // Fallback: if on ngrok, assume backend is same domain
  //   const origin = window.location.origin;
  //   if (!origin.includes("localhost") && !origin.includes("127.0.0.1")) {
  //     return origin; // Use same domain (frontend URL)
  //   }

  //   // Default: local dev
  //   return "http://dentalhub.org:8000";
  // }

  static readonly host: string = "http://dentalhub.org:8000";

  static readonly server: string = `${this.host}/api`;
  static readonly images: string = `${this.host}/storage`;

  //Auth
  static readonly fetchUser: string = `${this.server}/user`;

  //register
  static readonly register: string = `${this.server}/register`;
  static readonly emailSignup: string = `${this.register}/email`;
  static readonly phoneSignup: string = `${this.register}/number`;

  //login
  static readonly login: string = `${this.server}/login`;
  static readonly emailLogin: string = `${this.login}/email`;
  static readonly phoneLogin: string = `${this.login}/number`;

  //verify
  static readonly verify_otp: string = `${this.server}/verify-otp`;
  static readonly resend_otp: string = `${this.server}/resend-otp`;

  static readonly logout: string = `${this.server}/logout`;

  //Clinic
  static readonly store_clinic: string = `${this.server}/store/clinic`;
  static readonly show_clinic: string = `${this.server}/show/clinic`;
  static readonly get_my_clinics: string = `${this.server}/get/my-clinics`;
  static readonly update_clinic: string = `${this.server}/update/clinic`;
  static readonly get_clinic_images: string = `${this.server}/clinic/images`;
  static readonly delete_clinic_image: string = `${this.server}/delete/image`;
  static readonly add_clinic_image: string = `${this.server}/add/image`;

  static readonly add_clinic_staff: string = `${this.server}/clinic/add-staff`;
  static readonly get_clinic_doctors: string = `${this.server}/clinic/doctors`;
  static readonly get_clinic_secretaries: string = `${this.server}/clinic/secretaries`;
}

export class Paths {
  static readonly base: string = "/";
  static readonly auth: string = "/auth";
  static readonly signupPage: string = `${this.auth}/signup`;
  static readonly loginPage: string = `${this.auth}/login`;
  static readonly verifyPage: string = `${this.auth}/verify`;

  static readonly createClinic: string = "/create_clinic";

  static readonly manager: string = `manager`;

  static readonly appointments: string = `appointments`;
  static readonly patients: string = `patients`;
  static readonly staff: string = `staff`;
  static readonly services: string = `services`;
  static readonly settings: string = `settings`;

  static readonly dashboard: string = "/dashboard";
  //manager
  static readonly managerPage: string = `${this.dashboard}/${this.manager}`;

  // static readonly managerAppointments: string = `${this.managerPage}/${this.appointments}`;
  // static readonly managerPatients: string = `${this.managerPage}/${this.patients}`;
  // static readonly managerStaff: string = `${this.managerPage}/${this.staff}`;
  // static readonly managerServices: string = `${this.managerPage}/${this.services}`;
  // static readonly clinicSettings: string = `${this.managerPage}/${this.settings}`;
  // static readonly managerDashboard: string = `${this.managerPage}/dashboard`;

  static readonly doctorPage: string = `${this.dashboard}/doctor`;
}
export default Paths;

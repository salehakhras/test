import 'package:clinic_app/view/screen/auth/login2.dart';
import 'package:clinic_app/view/screen/auth/signup2.dart';
import 'package:clinic_app/view/screen/home/account/appointmentshistorypage.dart';
import 'package:clinic_app/view/screen/home/account/helppage.dart';
import 'package:clinic_app/view/screen/home/account/medicalrecordpage.dart';
import 'package:clinic_app/view/screen/home/account/personalinfopage.dart';
import 'package:clinic_app/view/screen/home/accountpage.dart';
import 'package:clinic_app/view/screen/home/notificationspage.dart';
import 'package:clinic_app/view/screen/home/account/settingspage.dart';
import 'package:clinic_app/view/screen/home/schedulepage.dart';
import 'package:flutter/material.dart';
import 'package:clinic_app/core/constant/routes.dart';
import 'package:clinic_app/view/screen/auth/login.dart';
import 'package:clinic_app/view/screen/auth/forgetpassword/forgetpassword.dart';
import 'package:clinic_app/view/screen/auth/forgetpassword/resetpassword.dart';
import 'package:clinic_app/view/screen/auth/signup.dart';
import 'package:clinic_app/view/screen/auth/forgetpassword/verifycode_resetpassword.dart';
import 'package:clinic_app/view/screen/auth/forgetpassword/success_resetpassword.dart';
import 'package:clinic_app/view/screen/auth/verifycodesignup_controller.dart';
import 'package:clinic_app/view/screen/auth/success_signup.dart';
import 'package:clinic_app/view/screen/home/homescreen.dart';

Map<String, Widget Function(BuildContext)> routes = {
  AppRoute.login: (context) => const Login(),
  AppRoute.login2: (context) => const Login2(),
  AppRoute.signUp: (context) => const SignUp(),
  AppRoute.signUp2: (context) => const SignUp2(),
  AppRoute.verfiyCodeSignUp: (context) => const VerfiyCodeSignUp(),
  AppRoute.successSignup: (context) => const SuccessSignup(),
  AppRoute.forgetPassword: (context) => const ForgetPassword(),
  AppRoute.verfiyCodeResetPassword: (context) => const VerfiyCodeResetPassword(),
  AppRoute.resetPassword: (context) => const ResetPassword(),
  AppRoute.successResetpassword: (context) => const SuccessResetPassword(),
  AppRoute.homePage: (context) => const Homscreen(),
  AppRoute.notificationsPage: (context) => const Notificationspage(),
  AppRoute.profilePage: (context) => const ProfilePage(),
  AppRoute.settingsPage: (context) => const Settingspage(),
  AppRoute.medicalrecordPage: (context) => const MedicalRecordPage(),
  AppRoute.appointmentshistoryPage: (context) => const AppointmentsHistoryPage(),
  AppRoute.personalinfoPage: (context) => const PersonalInfoPage(),
  AppRoute.helpPage: (context) => const Helppage(),
  AppRoute.schedulePage: (context) => const SchedulePage()
};
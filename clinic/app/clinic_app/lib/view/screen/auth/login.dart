import 'package:flutter/material.dart';
import 'package:clinic_app/controller/auth/login_controller.dart';
import 'package:clinic_app/core/constant/app_color.dart';
import 'package:clinic_app/view/widget/auth/custombuttonauth.dart';
import 'package:clinic_app/view/widget/auth/customtextbodyauth.dart';
import 'package:clinic_app/view/widget/auth/customtextformauth.dart';
import 'package:clinic_app/view/widget/auth/customtexttitleauth.dart';
import 'package:clinic_app/view/widget/auth/textsignup.dart';
import 'package:get/get.dart';

class Login extends StatelessWidget {
  const Login({super.key});

  @override
  Widget build(BuildContext context) {
    LoginControllerImp controller = Get.put(LoginControllerImp());
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        backgroundColor: AppColor.blueColor,
        elevation: 0.0,
        title: Text('DentalCare Clinic',
            style: Theme.of(context)
                .textTheme
                .headlineLarge!
                .copyWith(color: AppColor.white)),
      ),
      body: Container(
        color: Colors.white,
        padding: const EdgeInsets.symmetric(vertical: 15, horizontal: 30),
        child: ListView(children: [
          //const LogoAuth(),
          const SizedBox(height: 20),
            CustomTextTitleAuth(text: "Welcome Back!".tr),
          const SizedBox(height: 10),
            CustomTextBodyAuth(
              text:
                  "Enter your details below".tr),
          const SizedBox(height: 15),
          CustonTextFormAuth(
            mycontroller: controller.phone,
            hinttext: "*****".tr,
            iconData: Icons.phone,
            labeltext: "Phone".tr,
            // mycontroller: ,
          ),
          CustonTextFormAuth(
            mycontroller: controller.password,
            hinttext: "*****".tr,
            iconData: Icons.lock_outline,
            labeltext: "Password".tr,
            // mycontroller: ,
          ),
          InkWell(
            onTap: () {
              controller.goToForgetPassword();
            },
            child:   Text(
              "FORGOT PASSWORD?".tr,
              textAlign: TextAlign.right,
              style: TextStyle(
              color: Colors.red,
            ),
            ),
          ),
          CustomButtomAuth(text: "Sign in",
          onPressed: () {
            controller.login();
          }),
          const SizedBox(height: 40),
          CustomTextSignUpOrSignIn(
            textone: "Login by Email?".tr,
            texttwo: "Log In".tr,
            onTap: () {
              controller.goToSignIn2();
            },
          ),
          const SizedBox(height: 40),
          CustomTextSignUpOrSignIn(
            textone: "New user?".tr,
            texttwo: "SIGN UP".tr,
            onTap: () {
              controller.goToSignUp();
            },
          )
        ]),
      ),
    );
  }
}
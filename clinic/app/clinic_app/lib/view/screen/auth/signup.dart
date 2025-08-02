import 'package:flutter/material.dart';
import 'package:clinic_app/controller/auth/signup_controller.dart';
import 'package:clinic_app/core/constant/app_color.dart';
import 'package:clinic_app/view/widget/auth/custombuttonauth.dart';
import 'package:clinic_app/view/widget/auth/customtextbodyauth.dart';
import 'package:clinic_app/view/widget/auth/customtextformauth.dart';
import 'package:clinic_app/view/widget/auth/customtexttitleauth.dart';
import 'package:clinic_app/view/widget/auth/textsignup.dart';
import 'package:get/get.dart';

class SignUp extends StatelessWidget {
  const SignUp({super.key});

  @override
  Widget build(BuildContext context) {
    SignUpControllerImp controller = Get.put(SignUpControllerImp());
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        backgroundColor: AppColor.blueColor,
        elevation: 0.0,
        title: Text('DentalCare Clinic'.tr,
            style: Theme.of(context)
                .textTheme
                .headlineLarge!
                .copyWith(color: AppColor.white)),
      ),
      body: Container(
        color: Colors.white,
        padding: const EdgeInsets.symmetric(vertical: 15, horizontal: 30),
        child: ListView(children: [
          const SizedBox(height: 20),
          CustomTextTitleAuth(text: "Let's get started".tr),
          const SizedBox(height: 10),
          CustomTextBodyAuth(text: "We will send you 4 digit verification code".tr),
          const SizedBox(height: 15),
          CustonTextFormAuth(
            mycontroller: controller.phone,
            hinttext: "*****".tr,
            iconData: Icons.phone,
            labeltext: "Phone".tr,
            // mycontroller: ,
          ),
          CustonTextFormAuth(
            mycontroller: controller.name,
            hinttext: "*****".tr,
            iconData: Icons.person_2_outlined,
            labeltext: "Name".tr,
            // mycontroller: ,
          ),
          CustonTextFormAuth(
            mycontroller: controller.password,
            hinttext: "*****".tr,
            iconData: Icons.lock_outline,
            labeltext: "Password".tr,
            // mycontroller: ,
          ),
          CustomButtomAuth(
              text: "Generate OTP".tr,
              onPressed: () {
                controller.signUp();
              }),
              const SizedBox(height: 40),
          CustomTextSignUpOrSignIn(
            textone: "SignUp by email?".tr,
            texttwo: "Sign Up".tr,
            onTap: () {
              controller.goToSignUp2();
            },
          ),
          const SizedBox(height: 40),
          CustomTextSignUpOrSignIn(
            textone: "Joined us before?".tr,
            texttwo: "Sign In".tr,
            onTap: () {
              controller.goToSignIn();
            },
          ),
        ]),
      ),
    );
  }
}

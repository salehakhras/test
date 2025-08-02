import 'package:flutter/material.dart';
import 'package:clinic_app/controller/auth/forgetpassword/resetpassword_controller.dart';
import 'package:clinic_app/core/constant/app_color.dart';
import 'package:clinic_app/view/widget/auth/custombuttonauth.dart';
import 'package:clinic_app/view/widget/auth/customtextbodyauth.dart';
import 'package:clinic_app/view/widget/auth/customtextformauth.dart';
import 'package:clinic_app/view/widget/auth/customtexttitleauth.dart';
import 'package:get/get.dart';

class ResetPassword extends StatelessWidget {
  const ResetPassword({super.key});

  @override
  Widget build(BuildContext context) {
    ResetPasswordControllerImp controller = Get.put(
      ResetPasswordControllerImp(),
    );
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        backgroundColor: AppColor.primaryColor,
        elevation: 0.0,
        title: Text(
          'DentalCare Clinic',
          style: Theme.of(
            context,
          ).textTheme.headlineLarge!.copyWith(color: AppColor.white),
        ),
      ),
      body: Container(
        color: Colors.white,
        padding: const EdgeInsets.symmetric(vertical: 15, horizontal: 30),
        child: ListView(
          children: [
            const SizedBox(height: 20),
            CustomTextTitleAuth(text: "Reset Password".tr),
            const SizedBox(height: 10),
            CustomTextBodyAuth(text: "Please enter your new password".tr),
            const SizedBox(height: 15),
            CustonTextFormAuth(
              mycontroller: controller.password,
              hinttext: "*****".tr,
              iconData: Icons.lock_outline,
              labeltext: "Password".tr,
              // mycontroller: ,
            ),
            CustonTextFormAuth(
              mycontroller: controller.repassword,
              hinttext: " ${"*****".tr}",
              iconData: Icons.lock_outline,
              labeltext: "Password".tr,
              // mycontroller: ,
            ),
            CustomButtomAuth(
              text: "Confirm".tr,
              onPressed: () {
                controller.goToSuccessResetPassword();
              },
            ),
            const SizedBox(height: 40),
          ],
        ),
      ),
    );
  }
}

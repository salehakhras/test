import 'package:flutter/material.dart';
import 'package:clinic_app/controller/auth/forgetpassword/forgetpassword_controller.dart';
import 'package:clinic_app/core/constant/app_color.dart';
import 'package:clinic_app/view/widget/auth/custombuttonauth.dart';
import 'package:clinic_app/view/widget/auth/customtextbodyauth.dart';
import 'package:clinic_app/view/widget/auth/customtextformauth.dart';
import 'package:clinic_app/view/widget/auth/customtexttitleauth.dart';
import 'package:get/get.dart'; 

class ForgetPassword extends StatelessWidget {
  const ForgetPassword({super.key});

  @override
  Widget build(BuildContext context) {
    ForgetPasswordControllerImp controller = Get.put(
      ForgetPasswordControllerImp(),
    );
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        backgroundColor: AppColor.blueColor,
        elevation: 0.0,
        title: Text(
          'DentalCare Clinic'.tr,
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
            CustomTextTitleAuth(text: "Recover Your Account".tr),
            const SizedBox(height: 10),
            CustomTextBodyAuth(
              text: "please Enter Your Email To Recive A verification code".tr,
            ),
            const SizedBox(height: 15),
            CustonTextFormAuth(
              mycontroller: controller.phone,
              hinttext: "*****".tr,
              iconData: Icons.mail_outlined,
              labeltext: "Email".tr,
              // mycontroller: ,
            ),
            CustomButtomAuth(
              text: "Send Verification Code".tr,
              onPressed: () {
                controller.goToVerfiyCode();
              },
            ),
            const SizedBox(height: 40),
          ],
        ),
      ),
    );
  }
}

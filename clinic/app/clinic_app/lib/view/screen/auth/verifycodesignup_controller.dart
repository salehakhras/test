import 'package:clinic_app/core/constant/app_color.dart';
import 'package:flutter/material.dart';
import 'package:clinic_app/controller/auth/verifycodesignup_controller.dart';
import 'package:clinic_app/view/widget/auth/custom_verifypage.dart';
import 'package:get/get.dart';

class VerfiyCodeSignUp extends StatelessWidget {
  const VerfiyCodeSignUp({super.key});

  @override
  Widget build(BuildContext context) {
    VerifyCodeControllerSignupImp controller =
        Get.put(VerifyCodeControllerSignupImp());
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
      body: CustomeVerifypage(
        onPressed: () {
          controller.goToSuccessSignUp();
        },)
    );
  }
}
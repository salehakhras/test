import 'package:clinic_app/core/constant/app_color.dart';
import 'package:flutter/material.dart';
import 'package:clinic_app/controller/auth/success_signup_controller.dart';
import 'package:clinic_app/view/widget/auth/custom_successpage.dart';
import 'package:get/get.dart';

class SuccessSignup extends StatelessWidget {
  const SuccessSignup({super.key});

  @override
  Widget build(BuildContext context) {
    SuccessSignupControllerImp controller = Get.put(
      SuccessSignupControllerImp(),
    );
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        backgroundColor: AppColor.blueColor,
        elevation: 0.0,
        title: Text(
          'DentalCare Clinic',
          style: Theme.of(
            context,
          ).textTheme.headlineLarge!.copyWith(color: AppColor.white),
        ),
      ),
      body: CustomeSuccesspage(
        textone: "Your account has been successfully created".tr,
        texttwo: "You are ready to go".tr,
        onPressed: () {
          controller.goToHomePage();
        },
      ),
    );
  }
}

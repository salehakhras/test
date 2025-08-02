import 'package:clinic_app/controller/auth/signup_controller.dart';
import 'package:clinic_app/core/constant/app_color.dart';
import 'package:flutter/material.dart';
import 'package:clinic_app/view/widget/auth/custom_successpage.dart';
import 'package:get/get.dart';

class SuccessResetPassword extends StatelessWidget {
  const SuccessResetPassword({super.key});

  @override
  Widget build(BuildContext context) {
    SignUpControllerImp controller = Get.put(SignUpControllerImp());
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
      body:Container(
        color: Colors.white,
        child: CustomeSuccesspage(
        textone: "Your password has been successfully modified".tr,
        texttwo: "You are ready to go".tr,
        onPressed: (){
          controller.goToSignIn();
        },),
      )
    );
  }
}

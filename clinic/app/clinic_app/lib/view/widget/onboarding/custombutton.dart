import 'package:flutter/material.dart';
import 'package:clinic_app/data/datasource/static/static.dart';
import 'package:get/get.dart';
import 'package:clinic_app/core/constant/app_color.dart';
import 'package:clinic_app/controller/onboarding_controller.dart';



class CustomButtonOnBoarding extends GetView<OnBoardingControllerImp> {
  const CustomButtonOnBoarding({super.key});
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 30),
      width: 300,
      height: 50,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(10),
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.center,
          colors: [
            AppColor.blueColor,
            AppColor.primaryColor,
        ])
      ),
      child: MaterialButton(
        //padding: const EdgeInsets.symmetric(horizontal: 100, vertical: 0),
        textColor: Colors.white,
        onPressed: () {
          
          controller.next() ; 
        },
        child: Obx(() => Text(
          controller.currentPage.value == onBoardingList.length - 1? "Login" : "Continue",
          style: const TextStyle(
            fontSize: 22,
            fontWeight: FontWeight.bold,
          ),
        ),))
      ,
    );
  }
}
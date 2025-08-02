import 'package:flutter/material.dart';
import 'package:clinic_app/controller/onboarding_controller.dart';
import 'package:clinic_app/view/widget/onboarding/custombutton.dart';
import 'package:clinic_app/view/widget/onboarding/customslider.dart';
import 'package:clinic_app/view/widget/onboarding/dotcontroller.dart';
import 'package:get/get.dart';

class OnBoarding extends StatelessWidget {
  const OnBoarding({super.key});

  @override
  Widget build(BuildContext context) {
    Get.put(OnBoardingControllerImp()) ; 
    double screenWidth = MediaQuery.of(context).size.height;
    int felx = screenWidth > 600 ? 1 : screenWidth > 400? 2 : 3;
    return Scaffold(
      body: Column(
        children: [
          const Expanded(
            flex: 5,
            child: CustomSliderOnBoarding()
          ),
          Expanded(
            flex: felx,
            child: Container(
              color: Colors.black,
              width: double.infinity,
              child: const Column(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  SizedBox(height: 30),
                  CustomDotIndicatorOnBoarding(),
                  SizedBox(height: 10),
                  CustomButtonOnBoarding(),
              ],
          ),)
      )],
      ),
);
  }
}
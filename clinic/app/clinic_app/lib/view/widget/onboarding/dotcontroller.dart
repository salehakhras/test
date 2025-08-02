import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:clinic_app/core/constant/app_color.dart';
import 'package:clinic_app/controller/onboarding_controller.dart';
import 'package:clinic_app/data/datasource/static/static.dart';
import 'package:smooth_page_indicator/smooth_page_indicator.dart';


class CustomDotIndicatorOnBoarding extends GetView<OnBoardingControllerImp> {
  const CustomDotIndicatorOnBoarding({super.key});

  @override
  Widget build(BuildContext context) {
    return SmoothPageIndicator(
      controller: controller.pageController, 
      count: onBoardingList.length,
      effect: const ExpandingDotsEffect(
        dotWidth: 10,
        dotHeight: 10,
        activeDotColor: AppColor.primaryColor,
        offset: 100
      )
    );
  }
}
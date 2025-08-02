import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:clinic_app/core/constant/app_color.dart';
import 'package:clinic_app/controller/onboarding_controller.dart';
import 'package:clinic_app/data/datasource/static/static.dart';


class CustomSliderOnBoarding extends GetView<OnBoardingControllerImp> {
  const CustomSliderOnBoarding({super.key});

  @override
  Widget build(BuildContext context) {
    return PageView.builder(
      controller: controller.pageController,
      onPageChanged: (val){
        controller.onPageChanged(val) ; 
      },
      itemCount: onBoardingList.length,
      itemBuilder: (context, i) => Container(
        decoration: BoxDecoration(
          image: DecorationImage(
            image: AssetImage(onBoardingList[i].image!),
            fit: BoxFit.cover
          ),
        ),
        child: Container(
          decoration: const BoxDecoration(
            gradient: LinearGradient(
            begin: Alignment.center,
            end: Alignment.bottomCenter,
            colors: <Color>[
              Colors.transparent,
              Color(0xB5000000),
              Colors.black,
          ])
        ),
        child: SafeArea(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              Text(onBoardingList[i].title!,
                style: const TextStyle(
                  color: AppColor.white,
                    fontWeight: FontWeight.bold, fontSize: 27)),
              Container(
                padding: const EdgeInsets.all(10),
                width: double.infinity,
                alignment: Alignment.center,
                child: Text(
                  onBoardingList[i].body!,
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    color: AppColor.gray,
                    fontSize: 18),
              )),
            ],
          ),
        ),)
      ),
    );
  }
}
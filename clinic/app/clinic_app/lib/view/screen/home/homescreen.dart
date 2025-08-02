import 'package:flutter/material.dart';
import 'package:clinic_app/controller/home/homescreen_controller.dart';
import 'package:clinic_app/core/constant/app_color.dart';
import 'package:clinic_app/data/datasource/static/static.dart';
import 'package:clinic_app/view/widget/home/custom_bottomappbar_home.dart';
import 'package:get/get.dart';

class Homscreen extends StatelessWidget{
  const Homscreen({super.key});

  @override
  Widget build(BuildContext context) {
    Get.put(HomeScreenControllerImp());
    return GetBuilder<HomeScreenControllerImp>(
      builder: (controller) => Scaffold(
        backgroundColor: AppColor.background,
        bottomNavigationBar: const CustomBottomAppBarHome(),
        body: bottomAppBarList.elementAt(controller.currentPage).widget,
      ),
    );
  }

}
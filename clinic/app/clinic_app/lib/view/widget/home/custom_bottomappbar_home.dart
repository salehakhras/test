import 'package:flutter/material.dart';
import 'package:clinic_app/controller/home/homescreen_controller.dart';
import 'package:clinic_app/core/constant/app_color.dart';
import 'package:clinic_app/data/datasource/static/static.dart';
import 'package:clinic_app/view/widget/home/custom_button_bottomappbar.dart';
import 'package:get/get.dart';

class CustomBottomAppBarHome extends StatelessWidget {
  const CustomBottomAppBarHome({super.key});

  @override
  Widget build(BuildContext context) {
    return GetBuilder<HomeScreenControllerImp>(
      builder:
          (controller) => BottomAppBar(
            color: AppColor.black,
            child: Row(
              children: [
                ...List.generate(bottomAppBarList.length + 1, (index) {
                  int i = index > 2 ? index - 1 : index;
                  return index == 2
                      ? const Spacer()
                      : CustomButtonBottomAppbar(
                        textButton: bottomAppBarList[i].title!,
                        iconButton: bottomAppBarList[i].icon!,
                        onPressed: () {
                          controller.changePage(i);
                        },
                        active: controller.currentPage == i ? true : false,
                      );
                }),
              ],
            ),
          ),
    );
  }
}

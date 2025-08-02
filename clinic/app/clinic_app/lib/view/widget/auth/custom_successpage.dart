import 'package:flutter/material.dart';
import 'package:clinic_app/core/constant/app_color.dart';
import 'package:clinic_app/view/widget/auth/custombuttonauth.dart';
import 'package:get/get.dart';

class CustomeSuccesspage extends StatelessWidget{
  final String textone;
  final String texttwo;
  final void Function()? onPressed;
  const CustomeSuccesspage({
    super.key,
    required this.onPressed,
    required this.textone,
    required this.texttwo,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
        color: Colors.white,
        padding: const EdgeInsets.all(15),
        child: Column(children: [
          const Center(
              child: Icon(
            Icons.check_circle_outline,
            size: 200,
            color: AppColor.primaryColor,
          )),
          Text(textone,
          textAlign: TextAlign.center,
              style: Theme.of(context)
                  .textTheme
                  .headlineLarge!
                  .copyWith(fontSize: 30,color: Colors.black)),
          Text(texttwo,
          style: TextStyle(color: Colors.black),
          ),
          const Spacer(),
          SizedBox(
            width: double.infinity,
            child: CustomButtomAuth(
                text: "Continue".tr,
                onPressed: onPressed
            ),
          ),
          const SizedBox(height: 30)
        ]),
      );
  }

}
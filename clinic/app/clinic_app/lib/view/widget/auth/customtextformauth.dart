import 'package:flutter/material.dart';
import 'package:clinic_app/core/constant/app_color.dart';

class CustonTextFormAuth extends StatelessWidget {
  final String hinttext;
  final String labeltext;
  final IconData iconData;
  final TextEditingController? mycontroller;

  const CustonTextFormAuth({
    super.key,
    required this.hinttext,
    required this.labeltext,
    required this.iconData,
    required this.mycontroller,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 40),
      child: TextFormField(
        controller: mycontroller,
        style: const TextStyle(color: AppColor.black),
        cursorColor: AppColor.primaryColor,
        decoration: InputDecoration(
          hintText: hinttext,
          hintStyle: const TextStyle(fontSize: 14),
          floatingLabelBehavior: FloatingLabelBehavior.always,
          contentPadding: const EdgeInsets.symmetric(
            vertical: 5,
            horizontal: 30,
          ),

          label: Container(
            margin: const EdgeInsets.symmetric(horizontal: 9),
            child: Text(
              labeltext,
              style: const TextStyle(color: AppColor.black),
            ),
          ),
          suffixIcon: Icon(iconData),
          suffixIconColor: AppColor.black,
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(30),
            borderSide: const BorderSide(color: AppColor.primaryColor),
          ),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(30),
            borderSide: const BorderSide(color: AppColor.black),
          ),
        ),
      ),
    );
  }
}

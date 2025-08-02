import 'package:flutter/material.dart';
import 'package:clinic_app/core/constant/app_color.dart';

class CustomButtonBottomAppbar extends StatelessWidget{
  final String  textButton;
  final IconData iconButton;
  final void Function()? onPressed;
  final bool active;
  const CustomButtonBottomAppbar({
    super.key,
    required this.onPressed, 
    required this.textButton, 
    required this.iconButton, 
    required this.active});

  @override
  Widget build(BuildContext context) {
    return MaterialButton(
      onPressed: onPressed,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            iconButton,
            color: active ? AppColor.primaryColor :AppColor.white,
            size: 30,),
          Text(
            textButton, 
            style: TextStyle(
              color: active ? AppColor.primaryColor :AppColor.white,
              fontSize: 12
            ),)
        ],
      ),
    );
  }
}
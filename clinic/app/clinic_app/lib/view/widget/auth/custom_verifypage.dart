import 'package:flutter/material.dart';
import 'package:flutter_otp_text_field/flutter_otp_text_field.dart';
import 'package:clinic_app/core/constant/app_color.dart';
import 'package:clinic_app/view/widget/auth/customtextbodyauth.dart';
import 'package:clinic_app/view/widget/auth/customtexttitleauth.dart';
import 'package:clinic_app/view/widget/auth/textsignup.dart';
import 'package:get/get.dart';

class CustomeVerifypage extends StatelessWidget {
  final void Function()? onPressed;
  const CustomeVerifypage({super.key, required this.onPressed});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      padding: const EdgeInsets.symmetric(vertical: 15, horizontal: 30),
      child: ListView(
        children: [
          const SizedBox(height: 20),
          CustomTextTitleAuth(text: "OTP Verification".tr),
          const SizedBox(height: 10),
          CustomTextBodyAuth(text: "Enter the OTP sent to your Email".tr),
          const SizedBox(height: 15),
          OtpTextField(
            fieldWidth: 50.0,
            borderRadius: BorderRadius.circular(20),
            numberOfFields: 4,
            borderColor: AppColor.white,
            cursorColor: AppColor.primaryColor,
            focusedBorderColor: AppColor.primaryColor,
            textStyle: Theme.of(context).textTheme.bodyMedium,
            margin: const EdgeInsets.symmetric(horizontal: 10),
            //set to true to show as box or false to show as dash
            showFieldAsBox: true,
            //runs when a code is typed in
            onCodeChanged: (String code) {
              //handle validation or checks here
            },
            //runs when every textfield is filled
            onSubmit: (String verificationCode) {
              onPressed!();
            }, // end onSubmit
          ),
          const SizedBox(height: 50),
          CustomTextSignUpOrSignIn(
            textone: "Didn't recieve code?",
            texttwo: "RESEND",
            onTap: () {},
          ),
          /*CustomButtomAuth(text: "ReSend".tr, onPressed: () {
            controller.goNextPage() ; 
          }),*/
        ],
      ),
    );
  }
}

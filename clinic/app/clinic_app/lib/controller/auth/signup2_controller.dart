import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:clinic_app/core/constant/routes.dart';
import 'package:clinic_app/services/api_service.dart';

abstract class SignUp2Controller extends GetxController {
  signUp();
  goToSignIn();
  goToSignUp();
}

class SignUp2ControllerImp extends SignUp2Controller {
  late TextEditingController email;
  late TextEditingController name;
  late TextEditingController password;

  @override
  void onInit() {
    email = TextEditingController();
    name = TextEditingController();
    password = TextEditingController();
    super.onInit();
  }

  @override
  void dispose() {
    email.dispose();
    name.dispose();
    password.dispose();
    super.dispose();
  }

  @override
  signUp() async {
    try {
      Map<String, dynamic> response = await ApiService.postRequest(
        endpoint: 'register/email',
        data: {
          'email': email.text,
          'name': name.text,
          'password': password.text,
          'fcm_token': 'fcm_token_example_123456789',
        },
      );

      if (response['data'] != null &&
          response['data']['user'].containsKey('otp')) {
        String otp = response['data']['user']['otp'];
        String email = response['data']['user']['email'];

        Get.toNamed(AppRoute.verfiyCodeSignUp, arguments: {
          'otp': otp,
          'email': email,
        });
      } else {
        Get.snackbar("فشل التسجيل", "لم يتم استلام رمز التفعيل");
      }
    } catch (e) {
      print("خطأ في التسجيل: $e");
      Get.snackbar("خطأ", e.toString());
    }
  }

  @override
  goToSignIn() {
    Get.offNamed(AppRoute.login);
  }

  @override
  goToSignUp() {
    Get.offNamed(AppRoute.signUp2);
  }
}

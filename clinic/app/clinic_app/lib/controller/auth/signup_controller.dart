import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:clinic_app/core/constant/routes.dart';
import 'package:clinic_app/services/api_service.dart';

abstract class SignUpController extends GetxController {
  signUp();
  goToSignIn();
  goToSignUp2();
}

class SignUpControllerImp extends SignUpController {
  late TextEditingController phone;
  late TextEditingController name;
  late TextEditingController password;

  @override
  void onInit() {
    phone = TextEditingController();
    name = TextEditingController();
    password = TextEditingController();
    super.onInit();
  }

  @override
  void dispose() {
    phone.dispose();
    name.dispose();
    password.dispose();
    super.dispose();
  }

  @override
  signUp() async {
    try {
      Map<String, dynamic> response = await ApiService.postRequest(
        endpoint: 'register/number',
        data: {
          'number': phone.text,
          'name': name.text,
          'password': password.text,
          'fcm_token': 'fcm_token_example_123456789',
        },
      );

      if (response['data'] != null &&
          response['data']['user'].containsKey('otp')) {
        String otp = response['data']['user']['otp'];
        String number = response['data']['user']['number'];

        Get.toNamed(AppRoute.verfiyCodeSignUp, arguments: {
          'otp': otp,
          'number': number,
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
  goToSignUp2() {
    Get.offNamed(AppRoute.signUp2);
  }
}


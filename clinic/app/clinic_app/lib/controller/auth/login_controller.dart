/*
abstract class LoginController extends GetxController {
  login();
  goToSignIn2();
  goToSignUp();
  goToForgetPassword();
  goToHomePage();
}
*/
import 'package:clinic_app/core/constant/routes.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:clinic_app/services/api_service.dart';

class LoginControllerImp extends GetxController {
  ApiService appServices = Get.find();
  late TextEditingController phone;
  late TextEditingController password;

  @override
  void onInit() {
    phone = TextEditingController();
    password = TextEditingController();
    super.onInit();
  }

  @override
  void dispose() {
    phone.dispose();
    password.dispose();
    super.dispose();
  }

  //@override
  login() async {
    String phoneNumber = phone.text.trim();
    String pass = password.text.trim();
    print("login pressed");

    if (phoneNumber.isEmpty || pass.isEmpty) {
      Get.snackbar('خطأ', 'يرجى إدخال جميع الحقول');
      return;
    }

    try {
      final response = await ApiService.postRequest(
        endpoint: 'login/number',
        data: {
          'number': phoneNumber,
          'password': pass,
          'fcm_token': 'fcm_token_example_123456789',
        },
      );

      print(' الرد من السيرفر: $response');

      if (response['data']['user'].containsKey('otp')) {
        String token = response['data']['user']['otp'];
        print('hihihi');

        final prefs = await SharedPreferences.getInstance();
        await prefs.setString('token', token);
        print('hayatoooo');

        Get.snackbar('نجاح', 'تم تسجيل الدخول بنجاح');
        Get.offAllNamed(AppRoute.homePage);
      } else {
        print(' لم يتم العثور على token في الرد: $response');
        Get.snackbar(
          'خطأ',
          'فشل تسجيل الدخول. تحقق من البيانات أو من السيرفر.',
        );
      }
    } catch (e, stackTrace) {
      print(' خطأ أثناء تسجيل الدخول: $e');
      print(' Stack Trace: $stackTrace');
      Get.snackbar('خطأ', e.toString().replaceAll('Exception: ', ''));
    }
  }

  void goToSignUp() {
    Get.toNamed(AppRoute.signUp);
  }

  void goToSignIn2() {
    Get.toNamed(AppRoute.login2);
  }

  void goToForgetPassword() {
    Get.toNamed(AppRoute.forgetPassword);
  }

  void goToHomePage() {
    Get.offAllNamed(AppRoute.homePage);
  }
}

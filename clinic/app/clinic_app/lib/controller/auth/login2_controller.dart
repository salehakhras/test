import 'package:clinic_app/core/constant/routes.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:clinic_app/services/api_service.dart';

class Login2ControllerImp extends GetxController {
  ApiService appServices = Get.find();
  late TextEditingController email;
  late TextEditingController password;

  @override
  void onInit() {
    email = TextEditingController();
    password = TextEditingController();
    super.onInit();
  }

  @override
  void dispose() {
    email.dispose();
    password.dispose();
    super.dispose();
  }

  //@override
  login2() async {
    String Email = email.text.trim();
    String pass = password.text.trim();
    print("login pressed");

    if (Email.isEmpty || pass.isEmpty) {
      Get.snackbar('خطأ', 'يرجى إدخال جميع الحقول');
      return;
    }

    try {
      final response = await ApiService.postRequest(
        endpoint: 'login/email',
        data: {
          'email': Email,
          'password': pass,
          'fcm_token': 'c2f18e11-465b-3778-91b6-d6e7c0298a88',
        },
      );

      print(' الرد من السيرفر: $response');

      if (response['data']['user'].containsKey('fcm_token')) {
        String token = response['data']['user']['fcm_token'];
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

  void goToSignIn() {
    Get.toNamed(AppRoute.login);
  }

  void goToForgetPassword() {
    Get.toNamed(AppRoute.forgetPassword);
  }

  void goToHomePage() {
    Get.offAllNamed(AppRoute.homePage);
  }
}


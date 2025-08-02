import 'package:clinic_app/core/constant/routes.dart';
import 'package:flutter/cupertino.dart';
import 'package:get/get.dart';

abstract class ForgetPasswordController extends GetxController {
  checkphone();
  goToVerfiyCode();
}

class ForgetPasswordControllerImp extends ForgetPasswordController { 
  late TextEditingController phone; 

  @override
  checkphone() {}

  @override
  goToVerfiyCode() {
    Get.offNamed(AppRoute.verfiyCodeResetPassword);
  }

  @override
  void onInit() { 
    phone = TextEditingController(); 
    super.onInit();
  }

  @override
  void dispose() { 
    phone.dispose(); 
    super.dispose();
  }
}
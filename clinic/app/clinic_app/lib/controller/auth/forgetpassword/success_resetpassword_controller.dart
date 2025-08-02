import 'package:clinic_app/core/constant/routes.dart';
import 'package:get/get.dart';

abstract class SuccessResetPasswordController extends GetxController{
  goToSignIn();
}

class SuccessResetPasswordControllerImp extends SuccessResetPasswordController{
  @override
  goToSignIn() {
    Get.offNamed(AppRoute.login);
  }
}
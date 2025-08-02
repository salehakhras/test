import 'package:clinic_app/core/constant/routes.dart';
import 'package:get/get.dart';

abstract class VerifyCodeResetPasswordController extends GetxController {
  checkCode();
  goToResetPassword();
}

class VerifyCodeResetPasswordControllerImp extends VerifyCodeResetPasswordController {  

  late String verifycode; 

  @override
  checkCode() {}

    @override
  goToResetPassword() {
    Get.offNamed(AppRoute.resetPassword);
  }

}
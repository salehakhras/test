import 'package:clinic_app/core/constant/routes.dart';
import 'package:get/get.dart';

abstract class VerifyCodeControllerSignup extends GetxController {
  checkCode();
  goToSuccessSignUp();
}

class VerifyCodeControllerSignupImp extends VerifyCodeControllerSignup {

  late String verifycode  ;

  String? nextpage;

  @override
  checkCode() {}

    @override
  goToSuccessSignUp() {
    Get.offNamed(AppRoute.successSignup);
  }

}
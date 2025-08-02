import 'package:clinic_app/core/constant/routes.dart';
import 'package:get/get.dart';

abstract class SuccessSignupController extends GetxController{
  goToHomePage();
}

class SuccessSignupControllerImp extends SuccessSignupController{
  @override
  goToHomePage() {
    Get.offAllNamed(AppRoute.homePage);
  }
}
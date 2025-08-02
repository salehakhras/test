import 'package:clinic_app/core/constant/routes.dart';
import 'package:get/get.dart';

abstract class SettingspageController extends GetxController{
  goToProfilePage();
  goToHomePage();
  goToHelpPage();
}

class SettingspageControllerImp extends SettingspageController{
@override
  goToProfilePage() {
    Get.offNamed(AppRoute.profilePage);
  }

  @override
  goToHomePage() {
    Get.offAllNamed(AppRoute.homePage);
  }

  @override
  goToHelpPage() {
    Get.offAllNamed(AppRoute.helpPage);
  }

}
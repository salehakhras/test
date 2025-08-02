import 'package:clinic_app/core/constant/routes.dart';
import 'package:get/get.dart';

abstract class HelppageController extends GetxController{
  goToHomePage();
  goToSettingsPage();
}

class HelppageControllerImp extends HelppageController{
@override
  goToHomePage() {
    Get.offNamed(AppRoute.homePage);
  }

@override
  goToSettingsPage() {
    Get.offNamed(AppRoute.settingsPage);
  }

}
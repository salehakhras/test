import 'package:clinic_app/core/constant/routes.dart';
import 'package:get/get.dart';

abstract class PersonalInfoPageController extends GetxController{
  goToProfilePage();
  goToHomePage();
}

class PersonalInfoPageControllerImp extends PersonalInfoPageController{

@override
  goToProfilePage() {
    Get.offNamed(AppRoute.profilePage);
  }

    @override
  goToHomePage() {
    Get.offAllNamed(AppRoute.homePage);
  }

}
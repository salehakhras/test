import 'package:clinic_app/core/constant/routes.dart';
import 'package:get/get.dart';

abstract class MedicalRecordPageController extends GetxController{
  goToProfilePage();
  goToHomePage();
}

class MedicalRecordPageControllerImp extends MedicalRecordPageController{

@override
  goToProfilePage() {
    Get.offNamed(AppRoute.profilePage);
  }

    @override
  goToHomePage() {
    Get.offAllNamed(AppRoute.homePage);
  }

}
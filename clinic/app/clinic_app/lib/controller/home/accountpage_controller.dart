import 'package:clinic_app/core/constant/routes.dart';
import 'package:get/get.dart';

abstract class AccountpageController extends GetxController{
  goToSettingsPage();
  goToHomePage();
  goToSignIn();
  goToMedicalRecordPage();
  goToAppointmenrtsHistoryPage();
  goToPersonalInfoPage();
}

class AccountpageControllerImp extends AccountpageController{
@override
  goToSettingsPage() {
    Get.offNamed(AppRoute.settingsPage);
  }

  @override
  goToHomePage() {
    Get.offAllNamed(AppRoute.homePage);
  }

  @override
  goToSignIn() {
    Get.offNamed(AppRoute.login);
  }

  @override
  goToMedicalRecordPage() {
    Get.offNamed(AppRoute.medicalrecordPage);
  }

  @override
  goToAppointmenrtsHistoryPage() {
    Get.offNamed(AppRoute.appointmentshistoryPage);
  }

  @override
  goToPersonalInfoPage() {
    Get.offNamed(AppRoute.personalinfoPage);
  }

}
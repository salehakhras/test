import 'package:clinic_app/core/constant/routes.dart';
import 'package:get/get.dart';

abstract class AppointmentsHistoryPageController extends GetxController{
  goToProfilePage();
  goToHomePage();
}

class AppointmentsHistoryPageControllerImp extends AppointmentsHistoryPageController{

@override
  goToProfilePage() {
    Get.offNamed(AppRoute.profilePage);
  }

    @override
  goToHomePage() {
    Get.offAllNamed(AppRoute.homePage);
  }

}
import 'package:clinic_app/core/constant/routes.dart';
import 'package:get/get.dart';

abstract class NotificationspageController extends GetxController{
  goToHomePage();
}

class NotificationspageControllerImp extends NotificationspageController{
@override
  goToHomePage() {
    Get.offNamed(AppRoute.homePage);
  }
}
import 'package:clinic_app/core/constant/routes.dart';
import 'package:clinic_app/services/api_service.dart';
import 'package:get/get.dart';

abstract class HomePageController extends GetxController {
  goTonotificationspage();
  goToschedulepage();
}

class HomePageControllerImp extends HomePageController {
  ApiService appServices = Get.find();

  String? firstName;
  int? id;

  /*initialData() {
    firstName = appServices.sharedPreference.getString("firstName");
    id = appServices.sharedPreference.getInt("userId");
  }*/

  @override
  void onInit() {
    //initialData();
    super.onInit();
  }

  @override
  goTonotificationspage() {
    Get.offNamed(AppRoute.notificationsPage);
  }

    @override
  goToschedulepage() {
    Get.offNamed(AppRoute.schedulePage);
  }

  void goToHomePage() {}
}

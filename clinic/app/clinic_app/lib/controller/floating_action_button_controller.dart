import 'package:clinic_app/services/api_service.dart';
import 'package:get/get.dart';

abstract class FloatingActionButtonController extends GetxController {
  initialData();

}

class FloatingActionButtonControllerImp extends FloatingActionButtonController {
  ApiService appServices = Get.find();

  //int productsCount = 0;

  @override
  void onInit() {
    initialData();
    super.onInit();
  }

  @override
  initialData() async {

    }
}
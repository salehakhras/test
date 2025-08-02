import 'package:get/get.dart';

abstract class HomeScreenController extends GetxController {
  changePage(int curr);
}

class HomeScreenControllerImp extends HomeScreenController {

  int currentPage = 0;

  @override
  changePage(int curr) {

    currentPage = curr;
    update();
  }

}
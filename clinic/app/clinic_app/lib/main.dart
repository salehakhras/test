import 'package:clinic_app/services/api_service.dart';
import 'package:flutter/material.dart';
import 'package:clinic_app/core/constant/app_color.dart';
import 'package:clinic_app/view/screen/onboarding.dart';
//import 'package:get/get_navigation/src/root/get_material_app.dart';
import 'routes.dart';
import 'package:get/get.dart';

void main() async{

  WidgetsFlutterBinding.ensureInitialized();

  //await initialServices();
  Get.put(ApiService());
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Demo',
      theme: ThemeData(
        textTheme: const TextTheme(
          headlineLarge: TextStyle(
                  color: AppColor.white,
                  fontWeight: FontWeight.bold, 
                  fontSize: 32),
          bodyMedium: TextStyle(
                    color: AppColor.gray,
                    fontSize: 18),
        ),
      ),
      home:const OnBoarding(),
      routes: routes,
    );
  }
}


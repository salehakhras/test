import 'package:clinic_app/controller/home/notificationspage_controller.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class Notificationspage extends StatelessWidget {
  const Notificationspage({super.key});

  @override
  Widget build(BuildContext context) {
    NotificationspageControllerImp controller = Get.put(NotificationspageControllerImp());
    return Scaffold(
      //appBar: AppBar(title: const Text("Notificationspage")),
      appBar: AppBar(
        title: const Text("Notificationspage"),
        leading: IconButton(
  icon: const Icon(Icons.arrow_back, color: Colors.black),
  onPressed: () {
    controller.goToHomePage();
  },
),
        elevation: 0,
        backgroundColor: Colors.white,
      ),
      body: const Center(child: Text("This is the Notificationspage page.")),
    );
  }
}
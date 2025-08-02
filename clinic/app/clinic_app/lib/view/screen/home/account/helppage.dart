import 'package:clinic_app/controller/home/account/help_controller.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class Helppage extends StatelessWidget {
  const Helppage({super.key});

  @override
  Widget build(BuildContext context) {
    HelppageControllerImp controller = Get.put(HelppageControllerImp());
    return Scaffold(
      //appBar: AppBar(title: const Text("helppage")),
      appBar: AppBar(
        title: const Text("Help Page"),
        leading: IconButton(
  icon: const Icon(Icons.arrow_back, color: Colors.black),
  onPressed: () {
    controller.goToSettingsPage();
  },
),
        elevation: 0,
        backgroundColor: Colors.white,
      ),
      body: const Center(child: Text("This is the Help Page.")),
    );
  }
}
import 'package:clinic_app/controller/home/account/appointmentshistory_controller.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class AppointmentsHistoryPage extends StatelessWidget {
  const AppointmentsHistoryPage({super.key});

  @override
  Widget build(BuildContext context) {
    AppointmentsHistoryPageControllerImp controller = Get.put(AppointmentsHistoryPageControllerImp());
    return Scaffold(
      appBar: AppBar(
        title: const Text("appointmentshistorypage"),
        leading: IconButton(
  icon: const Icon(Icons.arrow_back, color: Colors.black),
  onPressed: () {
    controller.goToHomePage();
  },
),
        elevation: 0,
        backgroundColor: Colors.white,
      ),
      body: const Center(child: Text("This is the appointments history page.")),
    );
  }
}
import 'package:clinic_app/controller/home/account/medicalrecord_controller.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class MedicalRecordPage extends StatelessWidget {
  const MedicalRecordPage({super.key});

  @override
  Widget build(BuildContext context) {
    MedicalRecordPageControllerImp controller = Get.put(MedicalRecordPageControllerImp());
    return Scaffold(
      appBar: AppBar(
        title: const Text("medicalrecordpage"),
        leading: IconButton(
  icon: const Icon(Icons.arrow_back, color: Colors.black),
  onPressed: () {
    controller.goToHomePage();
  },
),
        elevation: 0,
        backgroundColor: Colors.white,
      ),
      body: const Center(child: Text("This is the medical record page.")),
    );
  }
}
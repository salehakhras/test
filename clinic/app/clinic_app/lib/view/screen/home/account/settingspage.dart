import 'package:clinic_app/controller/home/account/settingspage_controller.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class Settingspage extends StatefulWidget {
  const Settingspage({super.key});

  @override
  State<Settingspage> createState() => _SettingspageState();
}

class _SettingspageState extends State<Settingspage> {
  bool isDarkMode = false;

  @override
  Widget build(BuildContext context) {
    SettingspageControllerImp controller = Get.put(SettingspageControllerImp());
    return Scaffold(
      //appBar: AppBar(title: const Text("settingspage")),
      appBar: AppBar(
        title: const Text("settingspage"),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.black),
          onPressed: () {
            controller.goToHomePage();
          },
        ),
        elevation: 0,
        backgroundColor: Colors.white,
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 10),
        child: ListView(
          children: <Widget>[
            const SizedBox(height: 30),
            const Text(
              "Settings",
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
            ),

            const SizedBox(height: 20),
            settingsItem(
              icon: Icons.language,
              color: Colors.orange.shade100,
              iconColor: Colors.deepOrange,
              title: "Language",
              value: "English",
              onTap: () {},
            ),
            const SizedBox(height: 16),
            settingSwitchItem(
              icon: Icons.dark_mode,
              color: Colors.purple.shade100,
              iconColor: Colors.purple,
              title: "Dark Mode",
              value: isDarkMode,
              onChanged: (val) => setState(() => isDarkMode = val),
            ),
            const SizedBox(height: 16),
            settingsItem(
              icon: Icons.help,
              color: Colors.pink.shade100,
              iconColor: Colors.pink,
              title: "Help",
              onTap: () {
                controller.goToHelpPage();
              },
            ),
          ],
        ),
      ),
    );
  }
}

Widget settingsItem({
  required IconData icon,
  required Color color,
  required Color iconColor,
  required String title,
  String? value,
  required VoidCallback onTap,
}) {
  return InkWell(
    onTap: onTap,
    borderRadius: BorderRadius.circular(16),
    child: Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.grey.shade100,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        children: [
          CircleAvatar(
            backgroundColor: color,
            child: Icon(icon, color: iconColor),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Text(
              title,
              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
            ),
          ),
          if (value != null)
            Text(value, style: const TextStyle(color: Colors.blue)),
          const SizedBox(width: 10),
          const Icon(Icons.arrow_forward_ios, size: 16, color: Colors.blue),
        ],
      ),
    ),
  );
}

Widget settingSwitchItem({
  required IconData icon,
  required Color color,
  required Color iconColor,
  required String title,
  required bool value,
  required ValueChanged<bool> onChanged,
}) {
  return Container(
    padding: const EdgeInsets.all(16),
    decoration: BoxDecoration(
      color: Colors.grey.shade100,
      borderRadius: BorderRadius.circular(16),
    ),
    child: Row(
      children: [
        CircleAvatar(
          backgroundColor: color,
          child: Icon(icon, color: iconColor),
        ),
        const SizedBox(width: 16),
        Expanded(
          child: Text(
            title,
            style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
          ),
        ),
        Text(value ? "On" : "Off", style: const TextStyle(color: Colors.blue)),
        Switch(value: value, onChanged: onChanged),
      ],
    ),
  );
}

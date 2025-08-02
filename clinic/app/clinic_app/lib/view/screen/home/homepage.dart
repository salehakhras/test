import 'package:flutter/material.dart';
import 'package:clinic_app/controller/home/home_controller.dart';
import 'package:clinic_app/core/constant/app_color.dart';
import 'package:get/get.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    HomePageControllerImp controller = Get.put(HomePageControllerImp());
    return Scaffold(
      backgroundColor: AppColor.white,
      body: ListView(
        children: [
          Container(
            margin: const EdgeInsets.only(top: 20),
            padding: const EdgeInsets.symmetric(horizontal: 15),
            child: Row(
              children: [
                Expanded(
                  child: TextFormField(
                    decoration: InputDecoration(
                      prefixIcon: const Icon(
                        Icons.search,
                        color: AppColor.primaryColor,
                      ),
                      hintText: "Search".tr,
                      hintStyle: const TextStyle(color: AppColor.white),
                      border: OutlineInputBorder(
                        borderSide: BorderSide.none,
                        borderRadius: BorderRadius.circular(30),
                      ),
                      filled: true,
                      fillColor: AppColor.black,
                    ),
                  ),
                ),
                IconButton(
                  onPressed: () {
                    controller.goTonotificationspage();
                  },
                  icon: const Icon(
                    Icons.notifications_active_outlined,
                    color: AppColor.primaryColor,
                    size: 40,
                  ),
                ),
              ],
            ),
          ),

          const Padding(
            padding: EdgeInsets.symmetric(horizontal: 15, vertical: 20),
            child: Text(
              "Ongoing treatments",
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: AppColor.primaryColor,
              ),
            ),
          ),

          SizedBox(
            height: 160, // Adjust the height as needed
            child: ListView(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 15),
              children: [
                AppointmentCard(
                  width: 200,
                  height: 140,
                  text: "Appointment 1",
                  onPressed: () {
                    Get.toNamed("/appointment1");
                  },
                ),
                AppointmentCard(
                  width: 220,
                  height: 140,
                  text: "Appointment 2",
                  onPressed: () {
                    Get.toNamed("/appointment2");
                  },
                ),
                AppointmentCard(
                  width: 180,
                  height: 140,
                  text: "Appointment 3",
                  onPressed: () {
                    Get.toNamed("/appointment3");
                  },
                ),
              ],
            ),
          ),
          const Padding(
            padding: EdgeInsets.symmetric(horizontal: 15, vertical: 20),
            child: Text(
              "Offers you might like",
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: AppColor.primaryColor,
              ),
            ),
          ),

          SizedBox(
            height: 160,
            child: ListView(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 15),
              children: [
                AdvertsCard(
                  width: 280,
                  height: 140,
                  onPressed: () {
                    Get.toNamed("/appointment1");
                  },
                  backgroundImage: NetworkImage(
                    "https://www.postcardmania.com/wp-content/uploads/designs/img/Teeth-Whitening-Postcard-With-Three-Special-Offers-DNT-WHI-1004-750x530.jpg",
                  ),
                ),
                AdvertsCard(
                  width: 280,
                  height: 140,
                  onPressed: () {
                    Get.toNamed("/appointment2");
                  },
                  backgroundImage: NetworkImage(
                    "https://www.postcardmania.com/wp-content/uploads/designs/img/Teeth-Whitening-Postcard-With-Three-Special-Offers-DNT-WHI-1004-750x530.jpg",
                  ),
                ),
                AdvertsCard(
                  width: 280,
                  height: 140,
                  onPressed: () {
                    Get.toNamed("/appointment3");
                  },
                  backgroundImage: NetworkImage(
                    "https://www.postcardmania.com/wp-content/uploads/designs/img/Teeth-Whitening-Postcard-With-Three-Special-Offers-DNT-WHI-1004-750x530.jpg",
                  ),
                ),
              ],
            ),
          ),

          const Padding(
            padding: EdgeInsets.symmetric(horizontal: 15, vertical: 20),
            child: Text(
              "Clinics",
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: AppColor.primaryColor,
              ),
            ),
          ),

          ListView(
            physics: NeverScrollableScrollPhysics(), // disable nested scrolling
            shrinkWrap: true, // let it fit inside parent ListView
            children: [
              VerticalAppointmentItem(
                title: "Hollywood Smile clinic",
                description: "A clinic specialized in dental cosmetics.",
                onPressed: () {
                  controller.goToschedulepage();
                },
              ),
              VerticalAppointmentItem(
                title: "dr. Smith's Clinic",
                description: "The leading clinic in jaw surgery.",
                onPressed: () {
                  controller.goToschedulepage();
                },
              ),
              VerticalAppointmentItem(
                title: "The national Clinic for Jaw Services",
                description: "A clinic for orthodontics and other services.",
                onPressed: () {
                  controller.goToschedulepage();
                },
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class AppointmentCard extends StatelessWidget {
  final double width;
  final double height;
  final String text;
  final VoidCallback onPressed;

  const AppointmentCard({
    super.key,
    required this.width,
    required this.height,
    required this.text,
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: width,
      height: height,
      margin: const EdgeInsets.only(right: 15),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppColor.background,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppColor.primaryColor, width: 1.5),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            text,
            style: const TextStyle(
              fontSize: 16,
              color: AppColor.primaryColor,
              fontWeight: FontWeight.w600,
            ),
          ),
          const Spacer(),
          ElevatedButton(
            onPressed: onPressed,
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColor.primaryColor,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),
            child: const Text("View"),
          ),
        ],
      ),
    );
  }
}

class AdvertsCard extends StatelessWidget {
  final double width;
  final double height;
  final VoidCallback onPressed;
  final ImageProvider backgroundImage;

  const AdvertsCard({
    super.key,
    required this.width,
    required this.height,
    required this.onPressed,
    required this.backgroundImage,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: width,
      height: height,
      margin: const EdgeInsets.only(right: 15),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        image: DecorationImage(
          image: backgroundImage,
          fit: BoxFit.cover,
          /*colorFilter: ColorFilter.mode(
            Colors.black.withOpacity(0.4),
            BlendMode.darken,
          ),*/
        ),
      ),
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Spacer(),
            ElevatedButton(
              onPressed: onPressed,
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColor.primaryColor,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
              child: const Text("Show"),
            ),
          ],
        ),
      ),
    );
  }
}

class VerticalAppointmentItem extends StatelessWidget {
  final String title;
  final String description;
  final VoidCallback onPressed;

  const VerticalAppointmentItem({
    super.key,
    required this.title,
    required this.description,
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 15, vertical: 8),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppColor.white,
        borderRadius: BorderRadius.circular(15),
        border: Border.all(color: AppColor.primaryColor, width: 1),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Texts (title + description)
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: AppColor.primaryColor,
                  ),
                ),
                const SizedBox(height: 6),
                Text(
                  description,
                  style: const TextStyle(
                    fontSize: 14,
                    color: AppColor.primaryColor,
                  ),
                ),
              ],
            ),
          ),

          // Button on the right
          ElevatedButton(
            onPressed: onPressed,
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColor.primaryColor,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10),
              ),
            ),
            child: const Text("Book"),
          ),
        ],
      ),
    );
  }
}

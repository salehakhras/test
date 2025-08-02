import 'package:flutter/material.dart';
import 'package:clinic_app/core/constant/imageasset.dart';
import 'package:clinic_app/data/model/onboardingmodel.dart';
import 'package:clinic_app/data/model/bottom_appbar_model.dart';
import 'package:clinic_app/view/screen/home/accountpage.dart';
import 'package:clinic_app/view/screen/home/favorite.dart';
import 'package:clinic_app/view/screen/home/homepage.dart';
import 'package:clinic_app/view/screen/home/appointmentspage.dart';


List<OnBoardingModel> onBoardingList = [
  OnBoardingModel(
    title: "Welcome to DentalCare Clinic",
    body: "Easy access to appointments,treatments,and expert dental care",
    image: AppImageAsset.onboarding1,
  ),
  OnBoardingModel(
    title: "Book Visits in Seconds ",
    body: "Connect with our clinic anytime,anywhere and book your visit ",
    image: AppImageAsset.onboarding2,
  ),
  OnBoardingModel(
    title: "Your Smile, Our Priority ",
    body: "Explore services, track progress,and enjoy a healthier smile",
    image: AppImageAsset.onboarding3,
  ),
];

List<BottomAppBarModel> bottomAppBarList = [
  BottomAppBarModel(
    title: "Home",
    icon: Icons.home,
    widget: const HomePage(),
  ),
  BottomAppBarModel(
    title: "Favorite",
    icon: Icons.favorite,
    widget: const Favoritepage(),
  ),
  BottomAppBarModel(
    title: "Upcoming",
    icon: Icons.list_alt,
    widget: const Appointmentspage(),
  ),
  BottomAppBarModel(
    title: "Profile",
    icon: Icons.account_circle,
    widget: const ProfilePage(),
  ),
];
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class ApiService {
  static const String baseUrl = 'http://192.168.20.18:8000/api';

  static Future<Map<String, dynamic>> postRequest({
    required String endpoint,
    required Map<String, dynamic> data,
    bool withToken = false,
  }) async {
    final url = Uri.parse('$baseUrl/$endpoint');
    Map<String, String> headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (withToken) {
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('token');
      if (token != null) {
        headers['Authorization'] = 'Bearer $token';
      }
    }

    final response = await http.post(
      url,
      headers: headers,
      body: jsonEncode(data),
    );

  print(' الطلب إلى: $url');
  print(' البيانات المرسلة: ${jsonEncode(data)}');
  print(' استجابة السيرفر: ${response.statusCode} | ${response.body}');

    final result = jsonDecode(response.body);

    if (response.statusCode == 200) {
      return result;
    } else {
      throw Exception(result['message'] ?? 'خطأ غير معروف');
    }
  }
}

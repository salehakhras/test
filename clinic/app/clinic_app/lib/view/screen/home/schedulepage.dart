import 'package:flutter/material.dart';
import 'package:table_calendar/table_calendar.dart';
import 'package:intl/intl.dart';


class SchedulePage extends StatefulWidget {
const SchedulePage({super.key});

  @override
  _SchedulePageState createState() => _SchedulePageState();
}

class _SchedulePageState extends State<SchedulePage> {
  DateTime _focusedDay = DateTime.now();
  DateTime? _selectedDay = DateTime.now();
  String? _selectedTime;

  // Simulated backend data
  Set<DateTime> unavailableDates = {
    DateTime(2025, 7, 4),
    DateTime(2025, 7, 10),
  };

  Map<String, List<String>> unavailableTimes = {
    '2025-07-02': ['9:00 AM', '6:15 PM'],
    '2025-07-03': ['10:00 AM', '10:15 AM', '2:30 PM'],
  };

  List<String> generateTimeSlots({required int startHour, required int endHour}) {
    List<String> slots = [];
    for (int hour = startHour; hour < endHour; hour++) {
      slots.addAll([
        '${hour.toString().padLeft(2, '0')}:00',
        '${hour.toString().padLeft(2, '0')}:15',
        '${hour.toString().padLeft(2, '0')}:30',
        '${hour.toString().padLeft(2, '0')}:45',
      ]);
    }
    return slots.map((time) {
      final date = DateFormat.Hm().parse(time);
      return DateFormat.jm().format(date);
    }).toList();
  }

  Widget buildTimeSlot(String time) {
    final dateKey = DateFormat('yyyy-MM-dd').format(_selectedDay!);
    final isUnavailable = unavailableTimes[dateKey]?.contains(time) ?? false;
    final isSelected = _selectedTime == time;

    Color bgColor = isUnavailable
        ? Colors.grey[300]!
        : isSelected
            ? Colors.blue
            : Colors.white;

    Color textColor = isUnavailable
        ? Colors.grey
        : isSelected
            ? Colors.white
            : Colors.blue;

    return GestureDetector(
      onTap: isUnavailable
          ? null
          : () {
              setState(() {
                _selectedTime = time;
              });
            },
      child: Container(
        padding: EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        margin: EdgeInsets.all(6),
        decoration: BoxDecoration(
          color: bgColor,
          border: Border.all(color: Colors.blue),
          borderRadius: BorderRadius.circular(10),
        ),
        child: Text(
          time,
          style: TextStyle(
            color: textColor,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
  }

  Widget buildSection(String title, List<String> slots) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
          child: Text(title, style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
        ),
        Wrap(
          spacing: 6,
          runSpacing: 6,
          alignment: WrapAlignment.start,
          children: slots.map((time) => buildTimeSlot(time)).toList(),
        ),
      ],
    );
  }

  bool isDateUnavailable(DateTime date) {
    return unavailableDates.any((d) =>
        d.year == date.year && d.month == date.month && d.day == date.day);
  }

  @override
  Widget build(BuildContext context) {
    final morningSlots = generateTimeSlots(startHour: 9, endHour: 12);
    final afternoonSlots = generateTimeSlots(startHour: 12, endHour: 15);
    final eveningSlots = generateTimeSlots(startHour: 18, endHour: 21);

    return Scaffold(
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            backgroundColor: Colors.blue,
            pinned: true,
            expandedHeight: 80,
            flexibleSpace: FlexibleSpaceBar(
              centerTitle: true,
              title: Text(
                'Pick your date and time',
                style: TextStyle(color: Colors.white, fontSize: 16),
              ),
            ),
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 16),
              child: TableCalendar(
                firstDay: DateTime.now(),
                lastDay: DateTime.utc(2030, 12, 31),
                focusedDay: _focusedDay,
                selectedDayPredicate: (day) => isSameDay(_selectedDay, day),
                enabledDayPredicate: (day) => !isDateUnavailable(day),
                onDaySelected: (selectedDay, focusedDay) {
                  if (!isDateUnavailable(selectedDay)) {
                    setState(() {
                      _selectedDay = selectedDay;
                      _focusedDay = focusedDay;
                      _selectedTime = null;
                    });
                  }
                },
                headerStyle: HeaderStyle(
                  formatButtonVisible: false,
                  titleCentered: true,
                  titleTextStyle: TextStyle(color: Colors.blue, fontSize: 18),
                  leftChevronIcon: Icon(Icons.chevron_left, color: Colors.blue),
                  rightChevronIcon: Icon(Icons.chevron_right, color: Colors.blue),
                ),
                calendarStyle: CalendarStyle(
                  selectedDecoration: BoxDecoration(color: Colors.blue, shape: BoxShape.circle),
                  selectedTextStyle: TextStyle(color: Colors.white),
                  todayDecoration: BoxDecoration(color: Colors.orange, shape: BoxShape.circle),
                  todayTextStyle: TextStyle(color: Colors.white),
                  defaultTextStyle: TextStyle(color: Colors.black),
                  weekendTextStyle: TextStyle(color: Colors.black54),
                  disabledTextStyle: TextStyle(color: Colors.grey),
                ),
                daysOfWeekStyle: DaysOfWeekStyle(
                  weekdayStyle: TextStyle(color: Colors.grey),
                  weekendStyle: TextStyle(color: Colors.grey),
                ),
              ),
            ),
          ),
          SliverList(
            delegate: SliverChildListDelegate([
              buildSection("Morning", morningSlots),
              buildSection("Afternoon", afternoonSlots),
              buildSection("Evening", eveningSlots),
              SizedBox(height: 100),
            ]),
          ),
        ],
      ),
      bottomNavigationBar: _selectedTime != null
          ? Container(
              color: Colors.white,
              padding: EdgeInsets.all(16),
              child: ElevatedButton(
                onPressed: () {
                  final selectedDateStr = DateFormat('yyyy-MM-dd').format(_selectedDay!);
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text("Booked for $selectedDateStr at $_selectedTime")),
                  );
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.blue,
                  padding: EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                child: Text('Book Now', style: TextStyle(fontSize: 16, color: Colors.white)),
              ),
            )
          : SizedBox.shrink(),
    );
  }
}
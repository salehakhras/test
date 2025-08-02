export function convertTo12HourFormat(time24: string) {
  // Split the time into hours, minutes, and seconds
  const [hours, minutes] = time24.split(":");

  // Convert hours from string to number
  let hour = parseInt(hours, 10);

  // Determine AM or PM suffix
  const period = hour >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  hour = hour % 12 || 12; // Convert 0 hour to 12

  // Format the time as a string
  return `${hour}:${minutes} ${period}`;
}

// Example usage:
const time24 = "13:00:00";
const time12 = convertTo12HourFormat(time24);
console.log(time12); // Output: "1:00 PM"

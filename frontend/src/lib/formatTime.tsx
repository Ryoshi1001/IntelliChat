
type Timestamp = Date | number | string;


export default function formatTime(timestamp: Timestamp, withMinutes = true) {
  const date = new Date(timestamp);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12 || 12; // Convert 24-hour to 12-hour format

  if (withMinutes) {
    return `${hours}:${minutes} ${ampm}`;
  } else {
    return `${hours}${ampm}`;
  }
}

export function formatTimestamp(timestamp: string): string {
  // Create a JavaScript Date object from the timestamp
  const date = new Date(timestamp);

  // Extract components from the Date object
  const month = date.getMonth() + 1; // JavaScript months are 0-based, so we add 1
  const day = date.getDate();
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();

  // Format the components into a string
  //   const formattedTimestamp = `${monthNames[month - 1]}, ${day}, ${year}, ${pad(
  //     hour
  //   )}:${pad(minute)}`;

  const formattedTimestamp = `${monthNames[month - 1]}, ${day}, ${year}`;

  return formattedTimestamp;
}

// Helper function to zero-pad numbers
function pad(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}

// Helper array to convert month numbers to month names
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

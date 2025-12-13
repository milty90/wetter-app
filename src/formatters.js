export function dateFormatter(timestamp, timezoneOffset) {
  let date;
  if (timezoneOffset !== undefined) {
    date = new Date((timestamp + timezoneOffset) * 1000);
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const ours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `Heute, ${month}. ${day}. um ${ours}:${minutes}`;
  } else {
    date = new Date(timestamp * 1000);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const ours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `Heute, ${month}. ${day}. um ${ours}:${minutes}`;
  }
}

export function dayFormatter(timestamp, timezoneOffset) {
  const days = [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
  ];
  let date;
  if (timezoneOffset !== undefined) {
    date = new Date((timestamp + timezoneOffset) * 1000);
    return days[date.getUTCDay()];
  } else {
    date = new Date(timestamp * 1000);
    return days[date.getDay()];
  }
}

export function timeFormatter(timestamp, timezoneOffset) {
  let date;
  if (timezoneOffset !== undefined) {
    date = new Date((timestamp + timezoneOffset) * 1000);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  } else {
    date = new Date(timestamp * 1000);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }
}

export function cityNameCutter(city) {
  let cityWithoutParentheses = city.split("(")[0].trim();

  if (cityWithoutParentheses.endsWith(" City")) {
    cityWithoutParentheses = cityWithoutParentheses.slice(0, -5).trim();
  } else if (cityWithoutParentheses.endsWith(" city")) {
    cityWithoutParentheses = cityWithoutParentheses.slice(0, -5).trim();
  }

  if (!cityWithoutParentheses.includes(" ")) {
    return cityWithoutParentheses;
  }

  const words = cityWithoutParentheses.split(" ");
  const result = [];

  for (let i = 0; i < words.length; i++) {
    const firstChar = words[i][0];

    if (firstChar === firstChar.toUpperCase() && result.length < 2) {
      result.push(words[i]);
    } else {
      break;
    }
  }

  return result.join(" ");
}

// export function locationFormatter(location) {
//   const parts = location.split(",");
//   const lat = parts[0].trim();
//   const lon = parts[1] ? parts[1].trim() : "";
//   return { lat, lon };
// }

export function escapeHtml(str) {
  if (str == null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

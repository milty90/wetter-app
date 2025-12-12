export function dateFormatter(timestamp) {
  const date = new Date(timestamp * 1000);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const ours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `Heute, ${month}. ${day}. um ${ours}:${minutes}`;
}

export function dayFormatter(timestamp) {
  const date = new Date(timestamp * 1000);
  const days = [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
  ];
  return days[date.getDay()];
}

export function timeFormatter(timestamp) {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function cityNameCutter(city) {
  if (!city.includes(" ")) {
    return city;
  }

  const words = city.split(" ");
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

export function locationFormatter(location) {
  const parts = location.split(",");
  const lat = parts[0].trim();
  const lon = parts[1] ? parts[1].trim() : "";
  return { lat, lon };
}

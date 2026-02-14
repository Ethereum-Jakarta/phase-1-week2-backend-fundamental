const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZoneName: "short",
};

export default function scheduleTask() {
  //code
  const today = new Date();
  today.setDate(today.getDate() + 3);

  const indoDateFormat = new Intl.DateTimeFormat("id-ID", options);

  const threeDayAgain = indoDateFormat.format(today);
  return `Scheduled task for: ${threeDayAgain}`;
}

scheduleTask();

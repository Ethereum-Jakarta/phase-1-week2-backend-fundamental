import moment from "moment";

export function scheduleTask(day: number = 3) {
  const priorDay = moment().add(day, "day");
  console.log(`Scheduled task for: ${priorDay}`);
}

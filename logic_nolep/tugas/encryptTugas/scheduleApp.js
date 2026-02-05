import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime.js';
import chalk from "chalk"

dayjs.extend(relativeTime);

export function scheduleTask() {
  const totalWidth = 10
  const percent = 0.25
  const filled = Math.round(totalWidth * percent)
  const empty = totalWidth - filled

  const bar = '█'.repeat(filled) + '░'.repeat(empty);

  const task = 'Phase-1-Week2'
  const deadline = dayjs().add(3, 'days')
  const diffDays = deadline.diff(dayjs(), 'day');

  let deadlineColor = chalk.green;
  if (diffDays <= 3) deadlineColor = chalk.yellow;
  if (deadline.isBefore(dayjs())) deadlineColor = chalk.red;


  console.log(`TASK : ${task}`)
  console.log(`[${bar}] ${percent * 100}% completed`)
  console.log(`⏱️  Due : ${deadlineColor(deadline.fromNow())}`)
}

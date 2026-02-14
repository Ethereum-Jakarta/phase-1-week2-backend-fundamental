import moment from 'moment';
import chalk from 'chalk'

function scheduleTask(task, time) {
    if (!task || !time) {
        throw new Error(chalk.red('Task and time are required'));
    } else {
        let range = moment().add(time, 'days').calendar();
        let worked = task
        console.log(`${moment().calendar()}. Your task ${worked} and you need time to finish it until ${range}`);
    }
}

export { scheduleTask };
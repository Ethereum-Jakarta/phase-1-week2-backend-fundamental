import moment from 'moment';

function scheduleTask(task) {
    const date = moment().add(3, 'd');
    console.log(`Scheduled task for: ${task} (${date})`);
}

export { scheduleTask };
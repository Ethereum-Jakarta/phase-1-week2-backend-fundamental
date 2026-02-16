import moment from 'moment';

export function scheduleTask(task) {
    const date = moment().add(3, 'days').format('DD-MM-YYYY | HH:mm');

    return `${task} (${date})`;
}
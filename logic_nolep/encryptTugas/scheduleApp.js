import moment from "moment";

function scheduleTask(task) {
    const currentTime = moment();
    const future = currentTime.add(3, 'days');
    const message = `Schedule task for ${task} is ${future.format('YYYY-MM-DD HH:mm:ss')}`;
    return message;
    
}

export { scheduleTask }
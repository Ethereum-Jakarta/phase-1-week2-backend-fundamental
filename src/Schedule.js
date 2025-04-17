import Moment from 'moment'

const moment = Moment()

export function scheduleTask() {
    //code
    const threeDayLater = moment.add(3, 'days');

    return 'Scheduled task for : ' + threeDayLater.format("DD-MM-yyyy")
}


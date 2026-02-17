import moment from 'moment'

export const scheduleTask = () => {
    //code
    const currentDate = moment()
    const futureDate = moment(currentDate, "DD-MM-YYYY").add(3, 'days')
    console.log(`Scheduled task for: ${moment(futureDate)}`)
}
import moment from "moment";

function scheduleTask(task: string): string {
    const now = moment().format('LLLL');
    const future = moment().add(3, 'd').format('LLLL');
    const message = `Tugas kamu adalah ${task} dari ${now} sampai ${future}`;
    return message;
}

export default scheduleTask;
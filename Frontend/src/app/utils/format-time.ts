export function formatTimeToDateTimeLocal(date: Date) {
    return `${date.getFullYear()}\
-${date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}\
-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}\
T${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}\
:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;
}
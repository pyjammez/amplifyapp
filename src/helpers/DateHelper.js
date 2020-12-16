function todaysName(dateOnThatDay) {
    var date = new Date(dateOnThatDay);
    var weekday = new Array(7);
    weekday[0] = "sunday";
    weekday[1] = "monday";
    weekday[2] = "tuesday";
    weekday[3] = "wednesday";
    weekday[4] = "thursday";
    weekday[5] = "friday";
    weekday[6] = "saturday";
    return weekday[date.getDay()];
}

function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
}

function date(d) {
    return d.getFullYear() + "-" + twoDigits(1 + d.getMonth()) + "-" + twoDigits(d.getDate());
}

function time(d) {
    return twoDigits(d.getHours()) + ":" + twoDigits(d.getMinutes()) + ":" + twoDigits(d.getSeconds());
}

function datetime(d) {
    return date(d) + " " + time(d);
}

const DateHelper = {todaysName, datetime, date, time};
export default DateHelper;

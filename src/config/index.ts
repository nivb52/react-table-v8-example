interface DateTimeFormats {
    shortDate: string;
    shortTime: string;
    dayMonth: string;
    dayMonthReport: string;
    dayMonthYear: string;
    dayShortMonthYear: string;
    shortDay: string;
    shortDay3: string;
    fullDay: string;
    dayAndHour: string;
    shortDateTime: string;
    dayMonthTimeReport: string;
}

const dateTimeFormats: DateTimeFormats = {
    shortDate: "DD/MM/YYYY",
    shortTime: "HH:mm",
    dayMonth: "DD/MM",
    dayMonthReport: "DD-MM",
    dayMonthYear: "D MMMM, YYYY",
    dayShortMonthYear: "D MMM, YYYY",
    shortDay: "dd",
    shortDay3: "ddd",
    fullDay: "dddd",
    dayAndHour: "DD/MM[ ]HH:mm",
    shortDateTime: "DD/MM/YY[ ]HH:mm",
    dayMonthTimeReport: "DD-MM[ ]HH-mm"
};

export default {
    dateTimeFormats
};
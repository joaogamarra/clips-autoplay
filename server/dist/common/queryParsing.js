"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertTimePeriod = exports.parseTimePeriod = exports.parseTwitchQuery = void 0;
const twitch_1 = require("../types/twitch");
const parseTwitchQuery = (req) => {
    let query;
    let timePeriod = twitch_1.apiTimePeriod.all;
    let after = '';
    let timeQuery = '';
    if (typeof req.query.timeperiod === 'string') {
        timePeriod = exports.parseTimePeriod(req.query.timeperiod);
        if (timePeriod != twitch_1.apiTimePeriod.all) {
            timeQuery = exports.convertTimePeriod(timePeriod);
        }
    }
    if (typeof req.query.after === 'string')
        after = `&after=${req.query.after}`;
    query = `${timeQuery}${after}`;
    return query;
};
exports.parseTwitchQuery = parseTwitchQuery;
const parseTimePeriod = (timePeriod) => {
    if (timePeriod === 'day')
        return twitch_1.apiTimePeriod.day;
    if (timePeriod === 'week')
        return twitch_1.apiTimePeriod.week;
    if (timePeriod === 'month')
        return twitch_1.apiTimePeriod.month;
    if (timePeriod === 'all')
        return twitch_1.apiTimePeriod.all;
    throw new Error('Bad Request: Time Period');
};
exports.parseTimePeriod = parseTimePeriod;
const convertTimePeriod = (timePeriod) => {
    const currentDate = new Date();
    let startDate = '';
    if (timePeriod === twitch_1.apiTimePeriod.day) {
        const day = new Date(currentDate);
        day.setDate(day.getDate() - 1);
        startDate = day.toISOString();
    }
    if (timePeriod === twitch_1.apiTimePeriod.week) {
        const week = new Date(currentDate);
        week.setDate(week.getDate() - 7);
        startDate = week.toISOString();
    }
    if (timePeriod === twitch_1.apiTimePeriod.month) {
        const month = new Date(currentDate);
        month.setDate(month.getDate() - 7);
        startDate = month.toISOString();
    }
    const currentDateFormatted = currentDate.toISOString();
    return `&started_at=${startDate}&ended_at=${currentDateFormatted}`;
};
exports.convertTimePeriod = convertTimePeriod;
//# sourceMappingURL=queryParsing.js.map
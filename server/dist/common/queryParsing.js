"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRedditQuery = exports.parseSort = exports.convertTimePeriod = exports.parseTimePeriod = exports.parseTwitchQuery = void 0;
const subreddit_1 = require("../types/subreddit");
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
    if (timePeriod === 'year')
        return twitch_1.apiTimePeriod.year;
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
        month.setDate(month.getDate() - 30);
        startDate = month.toISOString();
    }
    if (timePeriod === twitch_1.apiTimePeriod.year) {
        const year = new Date(currentDate);
        year.setDate(year.getDate() - 365);
        startDate = year.toISOString();
    }
    const currentDateFormatted = currentDate.toISOString();
    return `&started_at=${startDate}&ended_at=${currentDateFormatted}`;
};
exports.convertTimePeriod = convertTimePeriod;
const parseSort = (sort) => {
    if (sort === 'hot')
        return subreddit_1.sortType.hot;
    if (sort === 'top')
        return subreddit_1.sortType.top;
    if (sort === 'new')
        return subreddit_1.sortType.new;
    throw new Error('Bad Request: Sort');
};
exports.parseSort = parseSort;
const parseRedditQuery = (req, limit) => {
    let query;
    let timePeriod = twitch_1.apiTimePeriod.all;
    let after = '';
    let timeQuery = '';
    let sort = subreddit_1.sortType.hot;
    if (!limit)
        limit = 50;
    if (typeof req.query.timeperiod === 'string') {
        timePeriod = exports.parseTimePeriod(req.query.timeperiod);
        timeQuery = `&t=${timePeriod}`;
    }
    if (typeof req.query.sort === 'string') {
        sort = exports.parseSort(req.query.sort);
    }
    if (typeof req.query.after === 'string')
        after = `&after=${req.query.after}`;
    query = `${req.params.id}/${sort}`;
    return query;
};
exports.parseRedditQuery = parseRedditQuery;
//# sourceMappingURL=queryParsing.js.map
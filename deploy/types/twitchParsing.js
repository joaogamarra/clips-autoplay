"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTimePeriod = void 0;
const twitch_1 = require("./twitch");
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
//# sourceMappingURL=twitchParsing.js.map
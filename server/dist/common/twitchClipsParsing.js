"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTwitchClips = void 0;
const parseTwitchClips = (data) => {
    const parsedData = {
        data: [],
        pagination: {
            cursor: '',
        },
    };
    if (data.pagination.cursor)
        parsedData.pagination.cursor = data.pagination.cursor;
    data.data.forEach((item) => {
        const itemLink = item.thumbnail_url.split('-preview-')[0];
        parsedData.data.push({
            title: item.title,
            video_url: `${itemLink}.mp4`,
            twitch_url: item.url
        });
    });
    return parsedData;
};
exports.parseTwitchClips = parseTwitchClips;
//# sourceMappingURL=twitchClipsParsing.js.map
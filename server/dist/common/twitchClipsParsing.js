"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTwitchClips = void 0;
const parseTwitchClips = (data) => {
    let cursor = '';
    if (data.pagination.cursor)
        cursor = data.pagination.cursor;
    const resData = data.data.map((item) => {
        const itemLink = item.thumbnail_url.split('-preview-')[0];
        return {
            id: item.id,
            title: item.title,
            video_url: `${itemLink}.mp4`,
            twitch_url: item.url
        };
    });
    return {
        data: resData,
        pagination: {
            cursor: cursor
        }
    };
};
exports.parseTwitchClips = parseTwitchClips;
//# sourceMappingURL=twitchClipsParsing.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isVideo = exports.parseSubreddit = void 0;
const parseSubreddit = (data) => {
    var _a;
    const parsedData = {
        data: [],
        pagination: {
            cursor: '',
        },
    };
    if (data.after)
        parsedData.pagination.cursor = data.after;
    (_a = data.children) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
        const itemLink = exports.isVideo(item.data.url);
        if (itemLink) {
            parsedData.data.push({
                embed_url: itemLink,
            });
        }
    });
    return parsedData;
};
exports.parseSubreddit = parseSubreddit;
const isVideo = (url) => {
    const twitchAddress = 'https://clips.twitch.tv/' || 'http://clips.twitch.tv/';
    const twitchEmbed = 'https://clips.twitch.tv/embed?clip=';
    if (url.includes(twitchAddress)) {
        const videoId = url.replace(twitchAddress, '');
        return `${twitchEmbed}${videoId}`;
    }
    else {
        return false;
    }
};
exports.isVideo = isVideo;
//# sourceMappingURL=subredditParsing.js.map
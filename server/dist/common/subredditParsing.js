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
        var _a, _b, _c;
        const url = (_c = (_b = (_a = item.data) === null || _a === void 0 ? void 0 : _a.media) === null || _b === void 0 ? void 0 : _b.oembed) === null || _c === void 0 ? void 0 : _c.thumbnail_url;
        if (url) {
            const itemLink = exports.isVideo(url);
            if (itemLink) {
                parsedData.data.push({
                    title: item.data.title,
                    video_url: itemLink,
                    twitch_url: item.data.url,
                    comments_url: item.data.permalink,
                });
            }
        }
    });
    return parsedData;
};
exports.parseSubreddit = parseSubreddit;
const isVideo = (url) => {
    const twitchAddress = 'https://clips-media-assets2.twitch.tv' || 'http://clips-media-assets2.twitch.tv';
    if (url && url.includes(twitchAddress)) {
        return url.replace('-social', '').replace('-preview.jpg', '.mp4');
    }
    else {
        return false;
    }
};
exports.isVideo = isVideo;
//# sourceMappingURL=subredditParsing.js.map
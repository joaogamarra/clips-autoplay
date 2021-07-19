"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isVideo = exports.parseSubreddit = void 0;
const subreddit_1 = require("../services/reddit/subreddit");
const parseSubreddit = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const parsedData = {
        data: [],
        pagination: {
            cursor: '',
        },
    };
    if (data.after)
        parsedData.pagination.cursor = data.after;
    (_a = data.children) === null || _a === void 0 ? void 0 : _a.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        var _b, _c, _d;
        const url = (_d = (_c = (_b = item.data) === null || _b === void 0 ? void 0 : _b.media) === null || _c === void 0 ? void 0 : _c.oembed) === null || _d === void 0 ? void 0 : _d.thumbnail_url;
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
    }));
    yield Promise.all(parsedData.data.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        var _e, _f, _g;
        const commentsList = [];
        const comments = yield subreddit_1.getSubreddit(`${(_e = item.comments_url) === null || _e === void 0 ? void 0 : _e.replace('/r/', '')}.json?sort=top&limit=30`);
        const commentsArr = (_g = (_f = comments[1]) === null || _f === void 0 ? void 0 : _f.data) === null || _g === void 0 ? void 0 : _g.children;
        if (commentsArr && commentsArr.length > 0) {
            let i = 0;
            while (commentsList.length < 10 && i < commentsArr.length) {
                const commentData = commentsArr[i].data;
                if (!commentData.distinguished && commentData.body) {
                    commentsList.push({
                        comment: commentData.body.replace('&gt;', ''),
                        author: commentData.author,
                        score: commentData.score,
                    });
                    item.comments = commentsList;
                }
                i++;
            }
        }
    })));
    return parsedData;
});
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
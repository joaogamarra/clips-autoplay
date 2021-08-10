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
            cursor: ''
        }
    };
    if (data.after)
        parsedData.pagination.cursor = data.after;
    (_a = data.children) === null || _a === void 0 ? void 0 : _a.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        let url = '';
        const twitchPath = (_d = (_c = (_b = item.data) === null || _b === void 0 ? void 0 : _b.media) === null || _c === void 0 ? void 0 : _c.oembed) === null || _d === void 0 ? void 0 : _d.thumbnail_url;
        let redditPath = (_g = (_f = (_e = item.data) === null || _e === void 0 ? void 0 : _e.media) === null || _f === void 0 ? void 0 : _f.reddit_video) === null || _g === void 0 ? void 0 : _g.fallback_url;
        if (!redditPath && ((_h = item.data) === null || _h === void 0 ? void 0 : _h.crosspost_parent_list))
            redditPath = (_l = (_k = (_j = item.data) === null || _j === void 0 ? void 0 : _j.crosspost_parent_list[0].media) === null || _k === void 0 ? void 0 : _k.reddit_video) === null || _l === void 0 ? void 0 : _l.fallback_url;
        if (twitchPath)
            url = twitchPath;
        else if (redditPath)
            url = redditPath;
        if (url !== '') {
            const itemLink = exports.isVideo(url);
            if (itemLink && twitchPath) {
                parsedData.data.push({
                    title: item.data.title,
                    video_url: itemLink,
                    twitch_url: item.data.url,
                    comments_url: item.data.permalink
                });
            }
            else if (itemLink && redditPath) {
                parsedData.data.push({
                    title: item.data.title,
                    video_url: itemLink,
                    audio_url: `${itemLink.substr(0, itemLink.lastIndexOf('_') + 1)}audio.mp4`,
                    comments_url: item.data.permalink
                });
            }
        }
    }));
    yield Promise.all(parsedData.data.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        var _m, _o, _p, _q, _r;
        const commentsList = [];
        const comments = yield subreddit_1.getSubreddit(`${(_m = item.comments_url) === null || _m === void 0 ? void 0 : _m.replace('/r/', '')}.json?sort=top&limit=15`, 2000);
        const commentsArr = (_p = (_o = comments[1]) === null || _o === void 0 ? void 0 : _o.data) === null || _p === void 0 ? void 0 : _p.children;
        if (commentsArr && commentsArr.length > 0) {
            let i = 0;
            while (commentsList.length < 10 && i < commentsArr.length) {
                const commentData = commentsArr[i].data;
                if (!commentData.distinguished && commentData.body && commentData.body !== '[deleted]') {
                    commentsList.push({
                        comment: commentData.body.replace('&gt;', ''),
                        author: commentData.author,
                        score: commentData.score
                    });
                    if (commentData.replies) {
                        const replieData = (_r = (_q = commentData.replies.data) === null || _q === void 0 ? void 0 : _q.children[0]) === null || _r === void 0 ? void 0 : _r.data;
                        if (replieData.body && commentData.body !== '[deleted]') {
                            commentsList.push({
                                comment: replieData.body.replace('&gt;', ''),
                                author: replieData.author,
                                score: replieData.score
                            });
                        }
                    }
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
    const redditAddress = 'https://v.redd.it' || 'http://v.redd.it';
    if (url && url.includes(twitchAddress)) {
        return url.replace('-social', '').replace('-preview.jpg', '.mp4');
    }
    else if (url && url.includes(redditAddress)) {
        return url.replace('?source=fallback', '');
    }
    else {
        return false;
    }
};
exports.isVideo = isVideo;
//# sourceMappingURL=subredditParsing.js.map
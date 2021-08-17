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
exports.isThumbsGfycat = exports.isGiphy = exports.isGfycat = exports.isImgur = exports.isRedditGif = exports.isReddit = exports.isTwitch = exports.parseSubreddit = void 0;
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
        var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y;
        let url = '';
        const twitchPath = (_d = (_c = (_b = item.data) === null || _b === void 0 ? void 0 : _b.media) === null || _c === void 0 ? void 0 : _c.oembed) === null || _d === void 0 ? void 0 : _d.thumbnail_url;
        let redditPath = (_g = (_f = (_e = item.data) === null || _e === void 0 ? void 0 : _e.media) === null || _f === void 0 ? void 0 : _f.reddit_video) === null || _g === void 0 ? void 0 : _g.fallback_url;
        if (!redditPath && ((_h = item.data) === null || _h === void 0 ? void 0 : _h.crosspost_parent_list))
            redditPath = (_m = (_l = (_k = (_j = item.data) === null || _j === void 0 ? void 0 : _j.crosspost_parent_list[0]) === null || _k === void 0 ? void 0 : _k.media) === null || _l === void 0 ? void 0 : _l.reddit_video) === null || _m === void 0 ? void 0 : _m.fallback_url;
        const redditGifPath = (_t = (_s = (_r = (_q = (_p = (_o = item.data) === null || _o === void 0 ? void 0 : _o.preview) === null || _p === void 0 ? void 0 : _p.images[0]) === null || _q === void 0 ? void 0 : _q.variants) === null || _r === void 0 ? void 0 : _r.mp4) === null || _s === void 0 ? void 0 : _s.source) === null || _t === void 0 ? void 0 : _t.url;
        const redditGifDirect = (_w = (_v = (_u = item.data) === null || _u === void 0 ? void 0 : _u.preview) === null || _v === void 0 ? void 0 : _v.reddit_video_preview) === null || _w === void 0 ? void 0 : _w.fallback_url;
        let gifPath = (_x = item.data) === null || _x === void 0 ? void 0 : _x.url_overridden_by_dest;
        if (!(gifPath === null || gifPath === void 0 ? void 0 : gifPath.endsWith('.gif')))
            gifPath = false;
        if (twitchPath && exports.isTwitch(twitchPath))
            url = exports.isTwitch(twitchPath);
        if (redditPath && exports.isReddit(redditPath))
            url = exports.isReddit(redditPath);
        if (gifPath && exports.isImgur(gifPath))
            url = exports.isImgur(gifPath);
        if (gifPath && exports.isGfycat(gifPath))
            url = exports.isGfycat(gifPath);
        if (gifPath && exports.isThumbsGfycat(gifPath))
            url = exports.isThumbsGfycat(gifPath);
        if (gifPath && exports.isGiphy(gifPath))
            url = exports.isGiphy(gifPath);
        if (redditGifPath && exports.isRedditGif(redditGifPath))
            url = exports.isRedditGif(redditGifPath);
        if (redditGifDirect)
            url = redditGifDirect;
        const nsfw = item.data.thumbnail === 'nsfw';
        const loud = (_y = item.data.link_flair_text) === null || _y === void 0 ? void 0 : _y.toLowerCase().includes('loud');
        if (url !== '' && url) {
            const dataObj = {
                title: item.data.title,
                video_url: url,
                comments_url: item.data.permalink
            };
            if (nsfw)
                dataObj.nsfw = nsfw;
            if (loud)
                dataObj.nsfw = loud;
            if (twitchPath && exports.isTwitch(url)) {
                dataObj.twitch_url = item.data.url;
            }
            else if (redditPath && exports.isReddit(url)) {
                const audio_url = `${url.substr(0, url.lastIndexOf('_') + 1)}audio.mp4`;
                dataObj.audio_url = audio_url;
            }
            parsedData.data.push(dataObj);
        }
    }));
    yield Promise.all(parsedData.data.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        var _z, _0, _1, _2, _3;
        const commentsList = [];
        const comments = yield subreddit_1.getSubreddit(`${(_z = item.comments_url) === null || _z === void 0 ? void 0 : _z.replace('/r/', '')}.json?sort=top&limit=15`, 2000);
        const commentsArr = (_1 = (_0 = comments[1]) === null || _0 === void 0 ? void 0 : _0.data) === null || _1 === void 0 ? void 0 : _1.children;
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
                        const replieData = (_3 = (_2 = commentData.replies.data) === null || _2 === void 0 ? void 0 : _2.children[0]) === null || _3 === void 0 ? void 0 : _3.data;
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
const isTwitch = (url) => {
    const twitchAddress = 'https://clips-media-assets2.twitch.tv' || 'http://clips-media-assets2.twitch.tv';
    if (url && url.includes(twitchAddress))
        return url.replace('-social', '').replace('-preview.jpg', '.mp4');
    else
        return false;
};
exports.isTwitch = isTwitch;
const isReddit = (url) => {
    const redditAddress = 'https://v.redd.it' || 'http://v.redd.it';
    if (url && url.includes(redditAddress))
        return url.replace('?source=fallback', '');
    else
        return false;
};
exports.isReddit = isReddit;
const isRedditGif = (url) => {
    const redditgifAddress = 'https://preview.redd.it' || 'https://preview.redd.it';
    if (url && url.includes(redditgifAddress))
        return url.replace('amp;', '');
    else
        return false;
};
exports.isRedditGif = isRedditGif;
const isImgur = (url) => {
    const imgurAddress = 'https://i.imgur.com' || 'http://i.imgur.com';
    if (url && url.includes(imgurAddress))
        return url.replace('.gifv', '.mp4');
    else
        return false;
};
exports.isImgur = isImgur;
const isGfycat = (url) => {
    const gfycatAddress = 'https://gfycat.com' || 'http://gfycat.com';
    if (url && url.includes(gfycatAddress)) {
        const urlReplaced = url.replace('http://', '').replace('https://', '');
        return `https://thumbs.${urlReplaced}.mp4`;
    }
    else
        return false;
};
exports.isGfycat = isGfycat;
const isGiphy = (url) => {
    const giphyAddress = 'https://media.giphy.com/' || 'http://media.giphy.com';
    if (url && url.includes(giphyAddress))
        return url.replace('.gif', '.mp4');
    else
        return false;
};
exports.isGiphy = isGiphy;
const isThumbsGfycat = (url) => {
    const thumbsgfycatAddress = 'https://thumbs.gfycat.com' || 'http://thumbs.gfycat.com';
    if (url && url.includes(thumbsgfycatAddress))
        return url.replace('.gif', '.mp4');
    else
        return false;
};
exports.isThumbsGfycat = isThumbsGfycat;
//# sourceMappingURL=subredditParsing.js.map
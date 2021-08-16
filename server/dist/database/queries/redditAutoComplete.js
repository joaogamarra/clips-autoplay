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
exports.subredditsAutoComplete = exports.subredditIncreaseRanking = exports.subredditsDefault = void 0;
const subreddit_1 = require("../../services/reddit/subreddit");
const reddit_1 = require("../models/reddit");
const suggestionsLimit = 8;
const subredditsDefault = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield reddit_1.subredditAutoComplete.find({}).sort({ rank: -1 }).limit(30);
    const shuffle = res.sort(() => Math.random() - 0.5).slice(0, suggestionsLimit);
    return shuffle;
});
exports.subredditsDefault = subredditsDefault;
const subredditsAutoComplete = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield reddit_1.subredditAutoComplete
        .find({ name: new RegExp('^' + query.toLowerCase()) })
        .sort({ rank: -1 })
        .limit(suggestionsLimit);
    return res;
});
exports.subredditsAutoComplete = subredditsAutoComplete;
const subredditIncreaseRanking = (subreddit) => __awaiter(void 0, void 0, void 0, function* () {
    const channelFind = yield reddit_1.subredditAutoComplete.find({ name: new RegExp('^' + subreddit.toLowerCase()) });
    if (channelFind.length === 0) {
        const { data } = yield subreddit_1.getSubreddit(`${subreddit}/about.json`);
        if (data) {
            const avatar = data.icon_img !== null ? data.icon_img : data.header_img;
            console.log(avatar, data.icon_img, data.header_img);
            const name = data.display_name.toLowerCase();
            const newSubreddit = new reddit_1.subredditAutoComplete({
                id: data.id,
                name,
                rank: 1,
                avatar
            });
            console.log(newSubreddit);
            yield newSubreddit.save();
        }
    }
    else {
        yield reddit_1.subredditAutoComplete.updateOne({ name: subreddit }, { $inc: { rank: 1 } });
    }
});
exports.subredditIncreaseRanking = subredditIncreaseRanking;
//# sourceMappingURL=redditAutoComplete.js.map
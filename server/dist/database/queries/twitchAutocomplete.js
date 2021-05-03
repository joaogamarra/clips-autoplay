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
exports.categoriesDefault = exports.channelsDefault = exports.categoryIncreaseRanking = exports.channelIncreaseRanking = exports.categoriesAutoComplete = exports.channelsAutoComplete = void 0;
const twitch_1 = require("../models/twitch");
const channelsAutoComplete = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield twitch_1.TwitchChannelAutoComplete.find({ name: new RegExp('^' + query) })
        .sort({ rank: -1 })
        .limit(10);
    return res;
});
exports.channelsAutoComplete = channelsAutoComplete;
const categoriesAutoComplete = (query) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(query);
    const res = yield twitch_1.TwitchCategoryAutoComplete.find({ name: new RegExp('^' + query) })
        .sort({ rank: -1 })
        .limit(10);
    return res;
});
exports.categoriesAutoComplete = categoriesAutoComplete;
const channelIncreaseRanking = (channel) => __awaiter(void 0, void 0, void 0, function* () {
    const channelFind = yield twitch_1.TwitchChannelAutoComplete.find({ name: channel.login });
    if (channelFind.length === 0) {
        const newChannel = new twitch_1.TwitchChannelAutoComplete({
            id: channel.id,
            name: channel.login,
            rank: 1,
        });
        newChannel.save();
    }
    else {
        yield twitch_1.TwitchChannelAutoComplete.updateOne({ name: channel.login }, { $inc: { rank: 1 } });
    }
});
exports.channelIncreaseRanking = channelIncreaseRanking;
const categoryIncreaseRanking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const idParsed = id.toLowerCase();
    yield twitch_1.TwitchCategoryAutoComplete.updateOne({ name: idParsed }, { $inc: { rank: 1 } });
});
exports.categoryIncreaseRanking = categoryIncreaseRanking;
const channelsDefault = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield twitch_1.TwitchChannelAutoComplete.find({}).sort({ rank: -1 }).limit(10);
});
exports.channelsDefault = channelsDefault;
const categoriesDefault = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield twitch_1.TwitchCategoryAutoComplete.find({}).sort({ rank: -1 }).limit(10);
});
exports.categoriesDefault = categoriesDefault;
//# sourceMappingURL=twitchAutoComplete.js.map
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveAvatar = exports.saveStreams = void 0;
const twitch_1 = require("../../database/models/twitch");
const channel_1 = __importDefault(require("./channel"));
const service_1 = __importDefault(require("./service"));
const saveStreams = (token, after) => __awaiter(void 0, void 0, void 0, function* () {
    const baseUrl = `https://api.twitch.tv/helix/streams?first=100`;
    let query = baseUrl;
    if (after)
        query = `${baseUrl}&after=${after}`;
    const res = yield service_1.default(token, query);
    if (res) {
        const data = res.data.data;
        data.forEach((stream) => {
            const search = new twitch_1.TwitchChannelAutoComplete({
                id: stream.user_id,
                name: stream.user_login,
                rank: 0,
                avatar: '',
            });
            search.save();
        });
        return res.data;
    }
    else {
        return false;
    }
});
exports.saveStreams = saveStreams;
const saveAvatar = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const dbChannels = yield twitch_1.TwitchChannelAutoComplete.find({}).sort({ id: 1 });
    const filteredChannels = dbChannels.filter((item) => item.avatar === undefined || item.avatar === '');
    for (let i = 0; i * 100 < filteredChannels.length; i++) {
        const slicedChannels = filteredChannels.slice(i * 100, i * 100 + 100);
        let query = '';
        let firstLoop = true;
        slicedChannels.forEach((item) => {
            if (firstLoop) {
                query += `${item.name}`;
                firstLoop = false;
            }
            else {
                query += `&login=${item.name}`;
            }
        });
        const resChannels = yield channel_1.default(token, query);
        resChannels.data.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
            yield twitch_1.TwitchChannelAutoComplete.updateOne({ name: item.login }, { avatar: item.profile_image_url });
        }));
    }
    return 'dooone';
});
exports.saveAvatar = saveAvatar;
//# sourceMappingURL=channelSave.js.map
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
const service_1 = __importDefault(require("./service"));
const getClips = (token, channel, category, query) => __awaiter(void 0, void 0, void 0, function* () {
    let searchType = `broadcaster_id=${channel === null || channel === void 0 ? void 0 : channel.id}`;
    if (category)
        searchType = `game_id=${category === null || category === void 0 ? void 0 : category.id}`;
    const baseUrl = `https://api.twitch.tv/helix/clips?${searchType}${query}&first=50`;
    const res = yield service_1.default(token, baseUrl);
    if (res) {
        const data = res.data;
        if (data && data.data.length > 0) {
            return data;
        }
        else {
            throw new Error('no clips');
        }
    }
    else {
        throw new Error('no clips');
    }
});
exports.default = getClips;
//# sourceMappingURL=clips.js.map
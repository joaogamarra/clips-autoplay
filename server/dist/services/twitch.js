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
const axios_1 = __importDefault(require("axios"));
const twitchToken_1 = __importDefault(require("../services/twitchToken"));
const getClips = () => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield twitchToken_1.default();
    const baseUrl = `https://api.twitch.tv/helix/clips?broadcaster_id=71092938&first=5`;
    try {
        if (token && process.env.TWITCH_CLIENT_ID) {
            const res = yield axios_1.default.get(baseUrl, {
                headers: {
                    'Client-Id': process.env.TWITCH_CLIENT_ID,
                    Authorization: `Bearer ${token.access_token}`,
                },
            });
            return res.data;
        }
        else {
            throw 'incorrect token or client id';
        }
    }
    catch (e) {
        console.log(e);
    }
});
exports.default = { getClips };
//# sourceMappingURL=twitch.js.map
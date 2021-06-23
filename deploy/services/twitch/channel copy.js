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
const twitch_1 = require("../../database/models/twitch");
const service_1 = __importDefault(require("./service"));
const getChannel = (token, channel) => __awaiter(void 0, void 0, void 0, function* () {
    const baseUrl = `https://api.twitch.tv/helix/users?login=${channel}`;
    const res = yield service_1.default(token, baseUrl);
    if (res) {
        const data = res.data.data[0];
        const channel = new twitch_1.TwitchChannel({
            id: data.id,
            login: data.login,
            display_name: data.display_name,
            type: data.type,
            broadcaster_type: data.broadcaster_type,
            description: data.description,
            profile_image_url: data.profile_image_url,
            offline_image_url: data.offline_image_url,
            view_count: data.view_count,
            created_at: data.created_at,
        });
        yield channel.save();
        return res.data.data[0];
    }
    else {
        return false;
    }
});
exports.default = getChannel;
//# sourceMappingURL=channel%20copy.js.map
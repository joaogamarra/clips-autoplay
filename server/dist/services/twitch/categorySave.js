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
const saveCategories = (token, after) => __awaiter(void 0, void 0, void 0, function* () {
    const baseUrl = `https://api.twitch.tv/helix/games/top?first=100`;
    let query = baseUrl;
    if (after)
        query = `${baseUrl}&after=${after}`;
    const res = yield service_1.default(token, query);
    if (res) {
        const data = res.data.data;
        data.forEach((category) => {
            const nameParsed = category.name.toLowerCase();
            const search = new twitch_1.TwitchCategoryAutoComplete({
                id: category.id,
                name: nameParsed,
                rank: 0,
            });
            search.save();
        });
        return res.data;
    }
    else {
        return false;
    }
});
exports.default = saveCategories;
//# sourceMappingURL=categorySave.js.map
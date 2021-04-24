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
exports.categoriesAuto = exports.channelsAuto = void 0;
const twitch_1 = require("../models/twitch");
const channelsAuto = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield twitch_1.TwitchSearch.find({ login: new RegExp('^' + query) })
        .sort({ rank: -1 })
        .limit(10);
    return res;
});
exports.channelsAuto = channelsAuto;
const categoriesAuto = (query) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(query);
    const res = yield twitch_1.TwitchSearchCategory.find({ name: new RegExp('^' + query) })
        .sort({ rank: -1 })
        .limit(10);
    return res;
});
exports.categoriesAuto = categoriesAuto;
//# sourceMappingURL=twitchAutocomplete.js.map
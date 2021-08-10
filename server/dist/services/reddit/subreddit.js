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
exports.getSubreddit = void 0;
const service_1 = __importDefault(require("./service"));
const getSubreddit = (query, timeout) => __awaiter(void 0, void 0, void 0, function* () {
    const baseUrl = `https://reddit.com/r/${query}`;
    const res = yield service_1.default(encodeURI(baseUrl), timeout);
    console.log(baseUrl);
    if (res) {
        return res.data;
    }
    else {
        return false;
    }
});
exports.getSubreddit = getSubreddit;
//# sourceMappingURL=subreddit.js.map
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
const getSubreddit = (id, query) => __awaiter(void 0, void 0, void 0, function* () {
    const baseUrl = `https://old.reddit.com/r/${id}/top.json?limit=30${query}`;
    console.log(baseUrl);
    const res = yield service_1.default(baseUrl);
    if (res) {
        return res.data.data;
    }
    else {
        return false;
    }
});
exports.default = getSubreddit;
//# sourceMappingURL=subreddit.js.map
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
const express_1 = __importDefault(require("express"));
const queryParsing_1 = require("../../common/queryParsing");
const twitchClipsParsing_1 = require("../../common/twitchClipsParsing");
const twitchAutoComplete_1 = require("../../database/queries/twitchAutoComplete");
const channel_1 = __importDefault(require("../../services/twitch/channel"));
const clips_1 = __importDefault(require("../../services/twitch/clips"));
const token_1 = __importDefault(require("../../services/twitch/token"));
const router = express_1.default.Router();
router.get('/channels', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = queryParsing_1.parseTwitchQuery(req);
    console.log('file: multi.ts ~ line 14 ~ query', query);
    console.log(req.query.c);
    const token = yield token_1.default();
    const channel = yield channel_1.default(token, req.params.id);
    const clips = yield clips_1.default(token, channel, undefined, query);
    const parsedClips = twitchClipsParsing_1.parseTwitchClips(clips);
    res.send(parsedClips);
    twitchAutoComplete_1.channelIncreaseRanking(channel);
}));
exports.default = router;
//# sourceMappingURL=multi.js.map
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
const twitchClipsParsing_1 = require("../..//common/twitchClipsParsing");
const express_1 = __importDefault(require("express"));
const category_1 = __importDefault(require("../../services/twitch/category"));
const queryParsing_1 = require("../../common/queryParsing");
const twitchAutoComplete_1 = require("../../database/queries/twitchAutoComplete");
const clips_1 = __importDefault(require("../../services/twitch/clips"));
const token_1 = __importDefault(require("../../services/twitch/token"));
const router = express_1.default.Router();
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = queryParsing_1.parseTwitchQuery(req);
    const token = yield token_1.default();
    const category = yield category_1.default(token, req.params.id);
    const clips = yield clips_1.default(token, undefined, category, query);
    const parsedClips = twitchClipsParsing_1.parseTwitchClips(clips);
    res.send(parsedClips);
    twitchAutoComplete_1.categoryIncreaseRanking(category.name);
}));
router.get('/:id/shuffle', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = queryParsing_1.parseTwitchQuery(req);
    const token = yield token_1.default();
    const category = yield category_1.default(token, req.params.id);
    let clips = yield clips_1.default(token, undefined, category, query, 100);
    let after = clips.pagination.cursor;
    const clipsLoop = () => __awaiter(void 0, void 0, void 0, function* () {
        if (after) {
            const newClips = yield clips_1.default(token, undefined, category, `&after=${after}`, 100);
            after = newClips.pagination.cursor;
            clips.pagination.cursor = after;
            clips.data = clips.data.concat(newClips.data);
            if (after && clips.data.length < 150) {
                yield clipsLoop();
            }
        }
    });
    yield clipsLoop();
    const parsedClips = twitchClipsParsing_1.parseTwitchClips(clips);
    yield twitchAutoComplete_1.categoryIncreaseRanking(category.name);
    res.send(parsedClips);
}));
exports.default = router;
//# sourceMappingURL=category.js.map
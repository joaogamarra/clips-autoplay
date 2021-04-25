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
const token_1 = __importDefault(require("../services/twitch/token"));
const clips_1 = __importDefault(require("../services/twitch/clips"));
const channel_1 = __importDefault(require("../services/twitch/channel"));
const category_1 = __importDefault(require("../services/twitch/category"));
const queryParsing_1 = require("../common/queryParsing");
const streams_1 = __importDefault(require("../services/twitch/streams"));
const twitchAutocomplete_1 = require("../database/queries/twitchAutocomplete");
const categories_1 = __importDefault(require("../services/twitch/categories"));
const router = express_1.default.Router();
router.get('/channel/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = yield queryParsing_1.parseTwitchQuery(req);
    console.log(query);
    const token = yield token_1.default();
    const channel = yield channel_1.default(token, req.params.id);
    const clips = yield clips_1.default(token, channel, undefined, query);
    res.send(clips);
    twitchAutocomplete_1.channelIncreaseRanking(channel.login);
}));
router.get('/category/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = yield queryParsing_1.parseTwitchQuery(req);
    const token = yield token_1.default();
    const category = yield category_1.default(token, req.params.id);
    const clips = yield clips_1.default(token, undefined, category, query);
    res.send(clips);
    twitchAutocomplete_1.categoryIncreaseRanking(category.name);
}));
router.get('/channelsauto/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const autocomplete = yield twitchAutocomplete_1.channelsAuto(req.params.id);
    res.send(autocomplete);
}));
router.get('/categoriesauto/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const autocomplete = yield twitchAutocomplete_1.categoriesAuto(req.params.id);
    res.send(autocomplete);
}));
router.get('/update/streams', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield token_1.default();
    const streams = yield streams_1.default(token);
    let after = streams.pagination.cursor;
    const streamsLoop = () => __awaiter(void 0, void 0, void 0, function* () {
        if (after) {
            const newStreams = yield streams_1.default(token, after);
            after = newStreams.pagination.cursor;
            if (newStreams.data[0].viewer_count > 100) {
                streamsLoop();
            }
        }
    });
    streamsLoop();
    res.send(streams);
}));
router.get('/update/categories', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield token_1.default();
    const categories = yield categories_1.default(token);
    let after = categories.pagination.cursor;
    const categoriesLoop = () => __awaiter(void 0, void 0, void 0, function* () {
        if (after) {
            const newCategories = yield categories_1.default(token, after);
            after = newCategories.pagination.cursor;
            if (after) {
                categoriesLoop();
            }
        }
    });
    categoriesLoop();
    res.send(categories);
}));
exports.default = router;
//# sourceMappingURL=twitch.js.map
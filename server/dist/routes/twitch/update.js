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
const categorySave_1 = __importDefault(require("../../services/twitch/categorySave"));
const channelSave_1 = __importDefault(require("../../services/twitch/channelSave"));
const token_1 = __importDefault(require("../../services/twitch/token"));
const router = express_1.default.Router();
router.get('/channel', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield token_1.default();
    const streams = yield channelSave_1.default(token);
    let after = streams.pagination.cursor;
    const streamsLoop = () => __awaiter(void 0, void 0, void 0, function* () {
        if (after) {
            const newStreams = yield channelSave_1.default(token, after);
            after = newStreams.pagination.cursor;
            if (newStreams.data[0].viewer_count > 100) {
                streamsLoop();
            }
        }
    });
    streamsLoop();
    res.send(streams);
}));
router.get('/category', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield token_1.default();
    const categories = yield categorySave_1.default(token);
    let after = categories.pagination.cursor;
    const categoriesLoop = () => __awaiter(void 0, void 0, void 0, function* () {
        if (after) {
            const newCategories = yield categorySave_1.default(token, after);
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
//# sourceMappingURL=update.js.map
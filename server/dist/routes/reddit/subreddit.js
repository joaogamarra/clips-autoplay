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
const subreddit_1 = require("../../services/reddit/subreddit");
const express_1 = __importDefault(require("express"));
const subredditParsing_1 = require("../../common/subredditParsing");
const queryParsing_1 = require("../../common/queryParsing");
const redditAutoComplete_1 = require("../../database/queries/redditAutoComplete");
const router = express_1.default.Router();
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tries = 3;
    let currentTry = 1;
    let limit = 50;
    let dataParsed;
    const requestLoop = () => __awaiter(void 0, void 0, void 0, function* () {
        const query = queryParsing_1.parseRedditQuery(req, limit);
        let data = yield subreddit_1.getSubreddit(query);
        if (data) {
            dataParsed = yield subredditParsing_1.parseSubreddit(data.data);
            if (dataParsed.data.length === 0 && dataParsed.pagination.cursor && currentTry < tries) {
                currentTry++;
                limit = 100;
                req.query.after = dataParsed.pagination.cursor;
                yield requestLoop();
            }
        }
        else {
            throw new Error('not found');
        }
    });
    yield requestLoop();
    yield redditAutoComplete_1.subredditIncreaseRanking(req.params.id);
    res.send(dataParsed);
}));
exports.default = router;
//# sourceMappingURL=subreddit.js.map
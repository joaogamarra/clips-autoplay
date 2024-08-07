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
const axios_1 = __importDefault(require("axios"));
const queryParsing_1 = require("../../common/queryParsing");
const redditAutoComplete_1 = require("../../database/queries/redditAutoComplete");
const router = express_1.default.Router();
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tries = 3;
    let currentTry = 1;
    let limit = 2500;
    let dataParsed;
    const redditAuth = () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios_1.default.post('https://www.reddit.com/api/v1/access_token', new URLSearchParams({
            grant_type: 'client_credentials'
        }), {
            auth: {
                username: 'E1oR27T20zfgywF6xhPeHw',
                password: 'ytWQPwrnTEX5w0LnBWl9TDTaH6uP0A'
            },
            headers: {
                'User-Agent': 'clipsautoplay/0.0.1',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response.data.access_token;
    });
    const requestLoop = (token) => __awaiter(void 0, void 0, void 0, function* () {
        const query = queryParsing_1.parseRedditQuery(req, limit);
        let data = yield subreddit_1.getSubreddit(query, token);
        if (data) {
            dataParsed = yield subredditParsing_1.parseSubreddit(data.data);
            if (dataParsed.data.length === 0 && dataParsed.pagination.cursor && currentTry < tries) {
                currentTry++;
                limit = 100;
                req.query.after = dataParsed.pagination.cursor;
                yield requestLoop(token);
            }
        }
        else {
            throw new Error('not found');
        }
    });
    (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = yield redditAuth();
            yield requestLoop(token);
            yield redditAutoComplete_1.subredditIncreaseRanking(req.params.id);
            res.send(dataParsed);
        }
        catch (error) {
            console.error('Error fetching posts:', error);
            res.send('Fetching Error');
        }
    }))();
}));
exports.default = router;
//# sourceMappingURL=subreddit.js.map
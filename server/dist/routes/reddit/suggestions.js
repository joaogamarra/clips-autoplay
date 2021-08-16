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
const redditAutoComplete_1 = require("../../database/queries/redditAutoComplete");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const suggestions = yield redditAutoComplete_1.subredditsDefault();
    res.send(suggestions);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const suggestions = yield redditAutoComplete_1.subredditsAutoComplete(req.params.id);
    res.send(suggestions);
}));
exports.default = router;
//# sourceMappingURL=suggestions.js.map
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
const twitchAutoComplete_1 = require("../../database/queries/twitchAutoComplete");
const router = express_1.default.Router();
router.get('/channel', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const suggestions = yield twitchAutoComplete_1.channelsDefault();
    console.log(suggestions);
    res.send(suggestions);
}));
router.get('/channel/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const suggestions = yield twitchAutoComplete_1.channelsAutoComplete(req.params.id);
    res.send(suggestions);
}));
router.get('/category', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const suggestions = yield twitchAutoComplete_1.categoriesDefault();
    res.send(suggestions);
}));
router.get('/category/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const suggestions = yield twitchAutoComplete_1.categoriesAutoComplete(req.params.id);
    res.send(suggestions);
}));
exports.default = router;
//# sourceMappingURL=suggestions.js.map
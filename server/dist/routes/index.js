"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const channel_1 = __importDefault(require("./twitch/channel"));
const category_1 = __importDefault(require("./twitch/category"));
const update_1 = __importDefault(require("./twitch/update"));
const suggestions_1 = __importDefault(require("./twitch/suggestions"));
const initRoutes = (app) => {
    app.use('/api/twitch/channel/', channel_1.default);
    app.use('/api/twitch/category/', category_1.default);
    app.use('/api/twitch/update/', update_1.default);
    app.use('/api/twitch/suggestions/', suggestions_1.default);
};
exports.default = initRoutes;
//# sourceMappingURL=index.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwitchSearchCategory = exports.TwitchSearch = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const twitchSearchSchema = new mongoose_1.default.Schema({
    id: Number,
    login: {
        type: String,
        unique: true,
    },
    rank: Number,
});
const twitchSearchCategorySchema = new mongoose_1.default.Schema({
    id: {
        type: String,
        unique: true,
    },
    name: String,
    rank: Number,
});
twitchSearchSchema.plugin(mongoose_unique_validator_1.default);
twitchSearchCategorySchema.plugin(mongoose_unique_validator_1.default);
exports.TwitchSearch = mongoose_1.default.model('twitchSearch', twitchSearchSchema);
exports.TwitchSearchCategory = mongoose_1.default.model('twitchCategory', twitchSearchCategorySchema);
//# sourceMappingURL=twitch.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwitchCategoryAutoComplete = exports.TwitchChannelAutoComplete = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const twitchChannelAutoCompleteSchema = new mongoose_1.default.Schema({
    id: Number,
    name: {
        type: String,
        unique: true,
    },
    rank: Number,
    avatar: String,
});
const twitchCategoryAutoCompleteSchema = new mongoose_1.default.Schema({
    id: {
        type: String,
        unique: true,
    },
    name: String,
    rank: Number,
    avatar: String,
});
twitchChannelAutoCompleteSchema.plugin(mongoose_unique_validator_1.default);
twitchCategoryAutoCompleteSchema.plugin(mongoose_unique_validator_1.default);
exports.TwitchChannelAutoComplete = mongoose_1.default.model('twitchChannelAutoComplete', twitchChannelAutoCompleteSchema);
exports.TwitchCategoryAutoComplete = mongoose_1.default.model('twitchCategoryAutoComplete', twitchCategoryAutoCompleteSchema);
//# sourceMappingURL=twitch.js.map
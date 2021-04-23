"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwitchSearch = void 0;
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
twitchSearchSchema.plugin(mongoose_unique_validator_1.default);
exports.TwitchSearch = mongoose_1.default.model('twitchSearch', twitchSearchSchema);
//# sourceMappingURL=twitch.js.map
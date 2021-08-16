"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subredditAutoComplete = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const subredditAutoCompleteSchema = new mongoose_1.default.Schema({
    id: String,
    name: {
        type: String,
        unique: true
    },
    rank: Number,
    avatar: String
});
subredditAutoCompleteSchema.plugin(mongoose_unique_validator_1.default);
exports.subredditAutoComplete = mongoose_1.default.model('subredditAutoComplete', subredditAutoCompleteSchema);
//# sourceMappingURL=reddit.js.map
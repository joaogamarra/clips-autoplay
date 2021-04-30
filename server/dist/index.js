"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
require("./database/connect");
const routes_1 = __importDefault(require("./routes"));
const app = express_1.default();
routes_1.default(app);
app.use(express_1.default.json());
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map
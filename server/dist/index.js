"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("express-async-errors");
require("./database/connect");
const routes_1 = __importDefault(require("./routes"));
const app = express_1.default();
app.use(cors_1.default());
routes_1.default(app);
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.resolve(__dirname, '../build')));
app.get('*', (_req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, '../build', 'index.html'));
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map
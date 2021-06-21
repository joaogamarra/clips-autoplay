"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("express-async-errors");
require("./database/connect");
const routes_1 = __importDefault(require("./routes"));
const app = express_1.default();
app.use(cors_1.default());
routes_1.default(app);
app.use(express_1.default.json());
app.use((error, _req, res, _next) => {
    if (error.message === 'not found' || error.message === 'no clips') {
        res.status(404);
        res.json({ error: error.message });
    }
    else {
        res.status(500);
        res.json({ error: 'internal server error' });
    }
});
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map
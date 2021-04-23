"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const mongoose = require('mongoose');
const express_1 = __importDefault(require("express"));
const twitch_1 = __importDefault(require("./routes/twitch"));
const app = express_1.default();
app.use(express_1.default.json());
mongoose.connect('mongodb://localhost/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('mongo connected');
});
const PORT = 4000;
app.use('/api/twitch', twitch_1.default);
app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map
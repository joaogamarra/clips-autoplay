"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (error, _req, res, next) => {
    if (error.message === 'not found') {
        res.status(404);
        res.json({ error: error.message });
    }
    next(error);
};
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map
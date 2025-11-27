"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const ideaRouter_1 = __importDefault(require("./routes/ideaRouter"));
const statsRouter_1 = __importDefault(require("./routes/statsRouter"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/ideas", ideaRouter_1.default);
app.use("/stats", statsRouter_1.default);
app.listen(process.env.PORT, () => {
    console.log(`Server running in PORT ${process.env.PORT}`);
});

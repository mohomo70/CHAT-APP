"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const messageRoutes_1 = __importDefault(require("./routes/messageRoutes"));
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/users', userRoutes_1.default);
app.use('/api/messages', messageRoutes_1.default);
app.get('/', (req, res) => {
    res.send('Express+TypeScript');
});
const port = process.env.PORT;
app.listen(Number(port), '172.30.106.118', () => {
    console.log('server is running');
});

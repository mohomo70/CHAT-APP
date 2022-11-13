"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.registerUser = exports.authUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = __importDefault(require("../models/userModel"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
// @desc    Auth user $ get token
// @route   POST /api/users/login
// @access  Public
const authUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password } = req.body;
    try {
        const user = yield userModel_1.default.findOne({ name });
        if (user && (yield user.matchPassword(password))) {
            res.json({
                id: user.id,
                name: user.name,
                token: (0, generateToken_1.default)(user.id)
            });
        }
        else {
            res.status(401).json({ message: 'Username or Password is Wrong' });
            // throw new Error('Invalid user data')
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error" });
    }
}));
exports.authUser = authUser;
const registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password } = req.body;
    const userExists = yield userModel_1.default.findOne({ name });
    if (userExists) {
        res.status(400).json({ message: " User Already exists" });
        // throw new Error('User already exists')
    }
    const user = yield userModel_1.default.create({
        name,
        password
    });
    if (user) {
        res.status(201).json({
            name: user.name,
            token: (0, generateToken_1.default)(user.id)
        });
    }
    else {
        res.status(400).json({ message: "Invalid user data" });
        // res.status(400)
        // throw new Error('Invalid user data')
    }
}));
exports.registerUser = registerUser;
const getUsers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, sender, receiver } = req.body;
    try {
        const users = yield userModel_1.default.find({});
        res.json(users);
    }
    catch (err) {
        res.status(400).json({ message: "Error in getting users" });
    }
}));
exports.getUsers = getUsers;

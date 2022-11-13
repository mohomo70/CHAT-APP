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
exports.getMessage = exports.submitMassage = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const messagesModel_1 = __importDefault(require("../models/messagesModel"));
const submitMassage = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, receiver, sender: s } = req.body;
    const sender = s.id;
    const message = yield messagesModel_1.default.create({
        content,
        receiver,
        sender,
    });
    if (message) {
        res.status(201).json({
            message: 'message is sent'
        });
    }
    else {
        res.status(400).json({ message: "message is not sending" });
        // res.status(400)
        // throw new Error('Invalid user data')
    }
}));
exports.submitMassage = submitMassage;
const getMessage = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, reciever } = req.body;
    // const id = user.id
    console.log(reciever);
    const messages = yield messagesModel_1.default.find({ $or: [{ $and: [{ receiver: reciever._id }, { sender: user.id }] }, { $and: [{ sender: reciever._id }, { receiver: user.id }] }] }).populate('receiver', 'name').populate('sender', 'name');
    if (messages) {
        res.status(201).json({
            messages
        });
    }
    else {
        res.status(400).json({ message: "error in reading messages from database" });
    }
}));
exports.getMessage = getMessage;

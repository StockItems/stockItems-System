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
const dotenv_1 = __importDefault(require("dotenv"));
const tools_model_1 = require("../models/tools.model");
dotenv_1.default.config();
const createTools = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, date, count, } = req.body;
        const data = {
            name,
            date,
            count,
        };
        const toolsCreate = yield tools_model_1.Tools.create(Object.assign({}, data));
        if (!toolsCreate) {
            return res.status(404).json({ message: "Fail to Create" });
        }
        return res.status(201).json({ message: "Create Tools success" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const getTools = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTools = yield tools_model_1.Tools.findAll();
        return res.status(200).json({
            totle: allTools.length,
            items: allTools,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "something went wrong",
        });
    }
});
const updateTools = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, date, count } = req.body;
        const updateTools = yield tools_model_1.Tools.update({
            name,
            date,
            count,
        }, {
            where: {
                id,
            },
        });
        return res.status(200).json({ message: "Update Success " });
    }
    catch (error) {
        return res.status(500).json({ massage: "Something went wrong " });
    }
});
const deleteTools = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const tools = req.tools;
        const deleteTools = yield tools_model_1.Tools.findOne({
            where: {
                id,
            },
        });
        if (!deleteTools) {
            return res.status(404).json({
                message: "Tools Note found",
            });
            yield (deleteTools === null || deleteTools === void 0 ? void 0 : deleteTools.destroy());
        }
        return res.status(200).json({
            message: "Tools Deleted",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
        });
    }
});
exports.default = {
    createTools,
    getTools,
    updateTools,
    deleteTools,
};

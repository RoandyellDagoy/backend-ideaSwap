"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ideasController = void 0;
const ideaService_1 = require("../services/ideaService");
exports.ideasController = {
    async getAllIdeas(req, res) {
        try {
            const result = await ideaService_1.IdeasService.getAll();
            return res.json({
                success: true,
                data: result.data,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "Failed to fetch ideas",
                error: error.message,
            });
        }
    },
    async createIdea(req, res) {
        try {
            const completePayload = req.body;
            const newIdea = await ideaService_1.IdeasService.create(completePayload);
            return res.status(201).json({
                message: "Idea created successfully",
                data: newIdea
            });
        }
        catch (error) {
            return res.status(400).json({
                message: "Failed to create idead",
                error: error.message
            });
        }
    },
    async updateIdea(req, res) {
        try {
            const id = req.params.id;
            const updates = req.body;
            const data = await ideaService_1.IdeasService.update(id, updates);
            return res.json({
                success: true,
                messsage: "Idea updated successfully",
                data,
            });
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to update idea",
                error: err.message,
            });
        }
    },
    async deleteIdea(req, res) {
        try {
            const id = req.params.id;
            await ideaService_1.IdeasService.remove(id);
            return res.json({
                success: true,
                message: "Idea deleted successfully",
            });
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to delete idea",
                error: err.message,
            });
        }
    }
};

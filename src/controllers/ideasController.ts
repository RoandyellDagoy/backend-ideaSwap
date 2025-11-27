import { IdeasService, Idea } from "../services/ideaService";
import { Request, Response } from "express";



export const ideasController = {
    async getAllIdeas(req: Request, res: Response) {
        try {
        const result = await IdeasService.getAll();
        return res.json({
            success: true,
            data: result.data,
        });
        } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch ideas",
            error: error.message,
        });
        }
    },

    async createIdea(req: Request, res: Response){
      try {
       const completePayload = req.body;

       const newIdea = await IdeasService.create(completePayload);

       return res.status(201).json({
        message: "Idea created successfully",
        data: newIdea
       })

      } catch (error: any) {

       return res.status(400).json({
        message: "Failed to create idead",
        error: error.message
       });
      }
    },

    async updateIdea(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const updates = req.body;

            const data = await IdeasService.update(id, updates);

            return res.json({
                success: true,
                messsage: "Idea updated successfully",
                data,
            })
        } catch (err: any) {
            return res.status(500).json({
                success: false,
                message: "Failed to update idea",
                error: err.message,
            })
        }
    },

    
    async deleteIdea(req: Request, res: Response){
        try {
            const id = req.params.id;

            await IdeasService.remove(id);

            return res.json({
                success: true,
                message: "Idea deleted successfully",
            });

        } catch (err: any) {
            return res.status(500).json({
                success: false,
                message: "Failed to delete idea",
                error: err.message,
            })
        }
    }
}



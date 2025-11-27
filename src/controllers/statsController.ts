import { Request, Response } from "express";
import { supabase, supabaseAdmin } from "../supabase";

export const StatsController = {
    getStats: async (req: Request, res: Response) => {
        try {
            // Get total users count using admin client
            const { data: usersData, error: usersError } = await supabaseAdmin.auth.admin.listUsers();
            const totalUsers = usersData?.users?.length || 0;

            const { count: totalIdeas, error: ideasError } = await supabase
                .from("ideas")
                .select("*", { count: "exact" });

            if (usersError || ideasError) {
                console.error("Error fetching stats:", { usersError, ideasError });
            }

            const stats = {
                totalUsers: totalUsers || 0,
                totalIdeas: totalIdeas || 0
            };

            res.json({
                success: true,
                data: stats
            });
        } catch (error) {
            console.error("Error in getStats:", error);
            res.status(500).json({
                success: false,
                error: "Failed to fetch stats"
            });
        }
    }
    
};

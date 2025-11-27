"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsController = void 0;
const supabase_1 = require("../supabase");
exports.StatsController = {
    getStats: async (req, res) => {
        try {
            // Get total users count using admin client
            const { data: usersData, error: usersError } = await supabase_1.supabaseAdmin.auth.admin.listUsers();
            const totalUsers = usersData?.users?.length || 0;
            const { count: totalIdeas, error: ideasError } = await supabase_1.supabase
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
        }
        catch (error) {
            console.error("Error in getStats:", error);
            res.status(500).json({
                success: false,
                error: "Failed to fetch stats"
            });
        }
    }
};

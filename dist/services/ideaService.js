"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdeasService = void 0;
const supabase_1 = require("../supabase");
exports.IdeasService = {
    getAll: async () => {
        try {
            console.log("=== FETCHING ALL IDEAS ===");
            const { data: ideas, error: ideasError } = await supabase_1.supabase
                .from("ideas")
                .select("*");
            if (ideasError) {
                console.error("Error fetching ideas:", ideasError);
                return { data: [], error: ideasError };
            }
            if (ideas && ideas.length > 0) {
                const ideasWithDefaults = ideas.map((idea) => ({
                    ...idea,
                    user_name: idea.user_name || 'Anonymous'
                }));
                console.log("=== FINAL IDEAS ===");
                return { data: ideasWithDefaults, error: null };
            }
            console.log("No ideas found");
            return { data: [], error: null };
        }
        catch (err) {
            console.error("Unexpected error in getAll:", err);
            return { data: [], error: err };
        }
    },
    create: async (completePayload) => {
        const { data, error } = await supabase_1.supabase
            .from("ideas")
            .insert(completePayload)
            .select("*")
            .single();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    },
    update: async (id, updates) => {
        const { data, error } = await supabase_1.supabase
            .from("ideas")
            .update(updates)
            .eq("id", id)
            .select("*")
            .single();
        if (error)
            throw new Error(error.message);
        return data;
    },
    remove: async (id) => {
        const { error } = await supabase_1.supabase
            .from("ideas")
            .delete()
            .eq("id", id);
        if (error)
            throw new Error(error.message);
    }
};

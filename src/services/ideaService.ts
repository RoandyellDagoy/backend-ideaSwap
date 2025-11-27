import { UUID } from "crypto";
import { supabase } from "../supabase"

export interface Idea {
  id?: string;
  user_id: UUID;
  title: string;
  description: string;
  category: string;
  user_name?: string;
}


export const IdeasService = {
    
    getAll: async () => {
        try {
            console.log("=== FETCHING ALL IDEAS ===");
            const { data: ideas, error: ideasError } = await supabase
                .from("ideas")
                .select("*");
            
            if (ideasError) {
                console.error("Error fetching ideas:", ideasError);
                return {data: [], error: ideasError};
            }
            
            if (ideas && ideas.length > 0) {
                const ideasWithDefaults = ideas.map((idea: any) => ({
                    ...idea,
                    user_name: idea.user_name || 'Anonymous'
                }));
                
                console.log("=== FINAL IDEAS ===");
                return {data: ideasWithDefaults, error: null};
            }
            
            console.log("No ideas found");
            return {data: [], error: null};
        } catch (err) {
            console.error("Unexpected error in getAll:", err);
            return {data: [], error: err};
        }
    },

    create: async (completePayload: Idea) =>{
        const { data, error} = await supabase
        .from("ideas")
        .insert(completePayload)
        .select("*")
        .single();

        if(error){
            throw new Error (error.message);
        }

        return data;
    },


     update: async (id: string, updates: Partial<Idea>): Promise<Idea> =>{
        const { data, error} = await supabase
        .from("ideas")
        .update(updates)
        .eq("id", id)
        .select("*")
        .single();

        if (error) throw new Error(error.message);
            return data;
     },

     remove: async (id: string): Promise<void> =>{
        const { error } = await supabase
        .from("ideas")
        .delete()
        .eq("id", id);

        if(error) throw new Error(error.message);
     }
}


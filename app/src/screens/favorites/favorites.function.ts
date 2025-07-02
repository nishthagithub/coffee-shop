// getFavouriteItem.ts
import { supabase } from "../../lib/supabase"

export const getFavouriteItem = async (userId: string) => {
    if (!userId) {
        return [];
      }
  const { data, error } = await supabase
    .from("favourites")
    .select("product_id")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching favourites:", error.message);
    return [];
  }

  return data.map(item => item.product_id);
};

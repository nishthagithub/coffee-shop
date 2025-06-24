import { CupSize } from "@/components/card/card.types";
import { supabase } from "../../lib/supabase";
export const insertIntoCart = async (payload: {
    user_id: string;
    product_id: string;
    title: string;
    imageUrl: string;
    hasSugar: boolean;
    defaultSize: CupSize;
    category_id: string;
    quantity: number;
    price: number;
  }) => {
    return await supabase.from('cart').insert([payload]);
  };

  export const updateCartQuantity = async (
    user_id: string,
    product_id: string,
    defaultSize: CupSize,
    hasSugar: boolean,
    quantity: number
  ) => {
    return await supabase
      .from('cart')
      .update({ quantity })
      .match({ user_id, product_id, defaultSize, hasSugar });
  };

  export const deleteFromCart = async (
    user_id: string,
    product_id: string,
    defaultSize: CupSize,
    hasSugar: boolean
  ) => {
    return await supabase
      .from('cart')
      .delete()
      .match({ user_id, product_id, defaultSize, hasSugar });
  };
import { CupSize } from "@/components/card/card.types";
import { supabase } from "../../lib/supabase";

export type CupSizes = {
  small: number;
  medium: number;
  large: number;
};

type CoffeeProduct = {
  id: string;
  title: string;
  cupSizes: CupSizes;
  hasSugar: boolean;
  imageUrl: string | null;
  category_id: string | null;
  defaultSize: string;
};

export type CartItem = {
  id: string;
  quantity: number;
  price: number;
  defaultSize:'small' |'medium' | 'large',
  coffee_products: CoffeeProduct;
  selectedSugar: string;
};

export const insertIntoCart = async (payload: {
  data: {
    user_id: string;
    product_id: string;
    defaultSize: CupSize;
    category_id: string;
    quantity: number;
    price: number;
    selectedSugar: string;
  };
  id: string;
}) => {
  console.log(payload);
  await supabase.from('cart').insert([payload.data]).select(`
    id,
    quantity,
    price,
    coffee_products (
      id,
      title,
      imageUrl,
      hasSugar,
      defaultSize,
      cupSizes,
      category_id
    )
  `);
  
  const response = await supabase
    .from('cart')
    .select(`
      id,
      quantity,
      price,
      coffee_products (
        id,
        title,
        imageUrl,
        hasSugar,
        defaultSize,
        cupSizes,
        category_id
      )
    `)
    .eq('user_id', payload.id);
    
  // Type assertion to get proper typing
  return response as { data: CartItem[] | null; error: any };
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

export const getCartItems = async (user_id: string) => {
  const response = await supabase
    .from('cart')
    .select(`
      id,
      quantity,
      price,
      defaultSize,
      selectedSugar,
      coffee_products (
        id,
        title,
        imageUrl,
        hasSugar,
        defaultSize,
        cupSizes,
        category_id
      )
    `)
    .eq("user_id",user_id)
  return response as { data: CartItem[] | null; error: any };
};
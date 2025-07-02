import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCart } from '../src/redux/cartSlice'
import { RootState } from '../src/redux/store'
import { getCartItems } from '../src/screens/CoffeeInfo/coffee.function'
import HomeScreen from '../src/screens/home/homeScreen'
import { getFavouriteItem } from '../src/screens/favorites/favorites.function'

const index = () => { 
  const dispatch=useDispatch();
   const userId = useSelector((state: RootState) => state.user.id);
   const [favouriteIds, setFavouriteIds] = useState<number[]>([]);
   

   useEffect(() => {
    const fetchCart = async () => {
      if (!userId) return;
      const { data, error } = await getCartItems(userId);
      // console.log(userId)
   if (data) {
     const mappedCartItems = data.map(item => ({
       id: item.coffee_products.id,
       imageUrl: item.coffee_products.imageUrl ?? '',
       title: item.coffee_products.title,
       price: item.price,
       selectedSize: item.defaultSize,
       selectedSugar: item.selectedSugar,
       quantity: item.quantity,
       hasSugar: item.coffee_products.hasSugar,
     }));
     dispatch(setCart(mappedCartItems));
   }
    else {
        console.error(error);
      }
    };
    fetchCart();
  }, [userId]);

  useEffect(() => {
    const fetchFavourites = async () => {
      if (!userId) return;
      const favs = await getFavouriteItem(userId);
      // console.log(userId)
      console.log(favs)
      setFavouriteIds(favs);
    };
  
    fetchFavourites();
  }, [userId]);
 

 

  return (
    <HomeScreen/>
  )
}

export default index


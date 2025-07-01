import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCart } from '../src/redux/cartSlice'
import { RootState } from '../src/redux/store'
import { getCartItems } from '../src/screens/CoffeeInfo/coffee.function'
import HomeScreen from '../src/screens/home/homeScreen'

const index = () => { 
  const dispatch=useDispatch();
   const userId = useSelector((state: RootState) => state.user.id);

   useEffect(() => {
    const fetchCart = async () => {
      console.log('userId',userId)
      const { data, error } = await getCartItems(userId);
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
  }, []);

  return (
    <HomeScreen/>
  )
}

export default index


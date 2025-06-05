import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle:{
           height:99,
           borderRadius:20,
           backgroundColor: '#fff',
        },
        tabBarIconStyle:{
         position:"absolute",
         top:"40%",
         
        }, 
        headerShown:false
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({focused}) => (
<Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={31}
              color={focused ? '#00512C' : '#80A896'}
            />          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({focused}) => (
            <Ionicons  name={focused ? 'search' : 'search-outline'} size={31} color={focused?"#00512C":"#80A896"} />
          ),
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          title: "Favourites",
          tabBarIcon: ({focused}) => (
            <Ionicons  name={focused ? 'heart' : 'heart-outline'} size={31} color={focused?"#00512C":"#80A896"} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({focused}) => (
          <Ionicons  name={focused ?'cart':'cart-outline'} size={31} color={focused?"#00512C":"#80A896"} />          ),
        }}
      />
       <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({focused}) => (
            // <UserIcon width={23} height={26} fill={focused ? '#00512C' : '#80A896'} />
            <Ionicons  name={focused ? 'person' : 'person-outline'} size={31} color={focused?"#00512C":"#80A896"} />
          ),
        }}
      />
    </Tabs>
  )
}

export default _layout


import { CupSize } from "@/components/card/card.types";
import image1 from "../../../assets/images/coffee5.png";
import image2 from "../../../assets/images/coffee4.png";
import image5 from "../../../assets/images/black2.png"
import { ImageSourcePropType } from "react-native";
export type category={
  id:string,
  name:string,
  image:ImageSourcePropType
 }
 export const Categories:category[]=[
  {
    id: "c1",
    name: "Cappuccino",
    image: image5,
  },
  {
    id: "c2",
    name: "Coffee",
    image: image2,
  },
  {
    id: "c3",
    name: "Latte",
    image: image1,
  },
  {
    id: "c4",
    name: "Cold Coffee",
    image: image1,
  },
 ]


const coffeeProducts:{
  id: string;
  title: string;
  imageUrl: any;
  hasSugar: boolean;
  defaultSize: CupSize;
  cupSizes: Record<CupSize, number>;
  categoryId:string
}[] = [
  {
    id: "1",
    title: "Cappuccino",
    imageUrl: image1,
    hasSugar: true,
    defaultSize: "small",
    cupSizes: {
      small: 120,
      medium: 140,
      large: 160,
    },
    categoryId:"c1"
  },
  {
    id: "2",
    title: "Cappuccino",
    imageUrl: image2,
    hasSugar: true,
    defaultSize: "small",
    cupSizes: {
      small: 110,
      medium: 130,
      large: 150,
    },
    categoryId:"c1"
  },
  {
    id: "3",
    title: "Coffee",
    imageUrl: image5,
    hasSugar: false,
    defaultSize: "small",
    cupSizes: {
      small: 90,
      medium: 110,
      large: 130,
    },
    categoryId:"c2"
  },
  {
    id: "4",
    title: "Coffee",
    imageUrl: image2,
    hasSugar: true,
    defaultSize: "small",
    cupSizes: {
      small: 80,
      medium: 100,
      large: 120,
    },
    categoryId:"c2"
  },
  {
    id: "5",
    title: "Latte",
    imageUrl: image2,
    hasSugar: false,
    defaultSize: "small",
    cupSizes: {
      small: 140,
      medium: 160,
      large: 180,
    },
    categoryId:"c3"
  },
  {
    id: "6",
    title: "Latte",
    imageUrl: image1,
    hasSugar: true,
    defaultSize: "small",
    cupSizes: {
      small: 130,
      medium: 150,
      large: 170,
    },
    categoryId:"c3"
  },
  {
    id: "7",
    title: "Cold Coffee",
    imageUrl: image2,
    hasSugar: false,
    defaultSize: "small",
    cupSizes: {
      small: 150,
      medium: 170,
      large: 190,
    },
    categoryId:"c4"
  },
  {
    id: "8",
    title: "Cold Coffee",
    imageUrl: image5,
    hasSugar: true,
    defaultSize: "small",
    cupSizes: {
      small: 140,
      medium: 160,
      large: 180,
    },
    categoryId:"c4"
  },
];

export default coffeeProducts;

import { CupSize } from "@/components/card/card.types";
import image1 from "../../../assets/images/coffee5.png";
import image2 from "../../../assets/images/coffee4.png";

const coffeeProducts:{
  id: string;
  title: string;
  imageUrl: any;
  hasSugar: boolean;
  defaultSize: CupSize;
  cupSizes: Record<CupSize, number>;
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
  },
  {
    id: "3",
    title: "Coffee",
    imageUrl: image2,
    hasSugar: false,
    defaultSize: "small",
    cupSizes: {
      small: 90,
      medium: 110,
      large: 130,
    },
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
  },
  {
    id: "6",
    title: "Latte",
    imageUrl: image2,
    hasSugar: true,
    defaultSize: "small",
    cupSizes: {
      small: 130,
      medium: 150,
      large: 170,
    },
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
  },
  {
    id: "8",
    title: "Cold Coffee",
    imageUrl: image2,
    hasSugar: true,
    defaultSize: "small",
    cupSizes: {
      small: 140,
      medium: 160,
      large: 180,
    },
  },
];

export default coffeeProducts;

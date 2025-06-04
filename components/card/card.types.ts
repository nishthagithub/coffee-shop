import { ImageSourcePropType } from "react-native";
export interface productCardProps {
    imageUrl: ImageSourcePropType;
    title: string;
    price: number;
    hasSugar?: boolean;
}
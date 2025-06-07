import { ImageSourcePropType } from "react-native";
export type CupSize = 'small' | 'medium' | 'large';
export interface productCardProps {
    id: string;
    imageUrl: ImageSourcePropType;
    title: string;
    hasSugar?: boolean;
    defaultSize: CupSize;
    cupSizes: Record<CupSize, number>;
    showHeartIcon?: boolean;
}
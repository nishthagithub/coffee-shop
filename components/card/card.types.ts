export type CupSize = 'small' | 'medium' | 'large';
export interface productCardProps {
    id: string;
    imageUrl: string;
    title: string;
    hasSugar?: boolean;
    defaultSize: CupSize;
    cupSizes: Record<CupSize, number>;
    showHeartIcon?: boolean;
    price?: number;
    favouriteIds?: string[] | undefined;
}
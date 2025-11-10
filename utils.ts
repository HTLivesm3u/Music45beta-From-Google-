import { Image } from "./types";

export const getBestImage = (images: Image[] | false, quality: '50x50' | '150x150' | '500x500' = '500x500'): string | null => {
    if (!images || images.length === 0) return null;
    const desiredImage = images.find(img => img.quality === quality);
    return desiredImage ? desiredImage.url : images[images.length - 1].url;
};

export const formatDuration = (seconds: number): string => {
    if (isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

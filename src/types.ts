export interface ImageCardData {
  id: string | number;
  urls: {
    regular: string;
    small: string;
  };
  alt_description: string;
}

export type ImgClickProp = (url: string, alt: string) => void;

import { ImageCardData, ImgClickProp } from "../../types";
import css from "./ImageCard.module.css";

interface ImageCardProps {
  data: ImageCardData;
  onImgClick: ImgClickProp;
}

const ImageCard: React.FC<ImageCardProps> = ({ data, onImgClick }) => {
  return (
    <div className={css.card}>
      <img
        className={css.img}
        src={data.urls.small}
        alt={data.alt_description}
        onClick={() => onImgClick(data.urls.regular, data.alt_description)}
      />
    </div>
  );
};
export default ImageCard;

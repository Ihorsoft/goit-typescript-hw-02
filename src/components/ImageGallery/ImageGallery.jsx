import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ items, onImgClick }) => {
  return (
    <ul className={css.list}>
      {items.map((item) => (
        <li className={css.gallery} key={item.id}>
          <ImageCard data={item} onImgClick={onImgClick} />
        </li>
      ))}
    </ul>
  );
};
export default ImageGallery;

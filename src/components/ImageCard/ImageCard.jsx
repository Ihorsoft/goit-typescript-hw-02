import css from "./ImageCard.module.css";

const ImageCard = ({ data, onImgClick }) => {
  return (
    <div className={css.card}>
      <img
        className={css.img}
        src={data.urls.small}
        alt={data.alt_Description}
        onClick={() => onImgClick(data.urls.regular, data.alt_description)}
      />
    </div>
  );
};
export default ImageCard;

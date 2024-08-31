import { useEffect, useState } from "react";
import axios from "axios";
// import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar.jsx";
// import Contact from "../ImageCard/ImageCard.jsx";
import ImageGallery from "../ImageGallery/ImageGallery.jsx";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn.jsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import ImageModal from "../ImageModal/ImageModal.jsx";
import Loader from "../Loader/Loader..jsx";

//++++++++++++++++++++++++++++++++++
function App() {
  const BASE_URL = "https://api.unsplash.com";
  const END_POINT = "/search/photos";
  const keyUser = "Fhd-P2QUhRR1aYB8Az9enT_MZd0_7CdpwCwyB01Kq0I";
  const per_page = 15;

  const [articles, setArticles] = useState([]);
  const [keyImage, setKeyImage] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState({ url: "", alt: "" });

  //+++++++++++++++++++++++++
  const NewSearch = (newValues) => {
    setArticles([]);
    setPage(1);
    return setKeyImage(newValues.username);
  };

  //++++++++++++++++++
  const handleLoadMore = () => {
    setPage(page + 1);
  };

  //++++++++++++++++++++
  const handleImgClick = (url, alt) => {
    setModalImage({ url, alt });
    setModalIsOpen(true);
  };

  //+++++++++++++++++
  function closeModal() {
    setModalIsOpen(false);
  }

  //+++++++++++++++++++++++++++++++++++
  async function fetchArticles() {
    const params = new URLSearchParams({
      client_id: keyUser,
      query: keyImage,
      orientation: "landscape",
      per_page: per_page,
      page: page,
    });
    const url = `${BASE_URL}${END_POINT}?${params}`;
    const response = await axios.get(url);
    return {
      results: response.data.results,
      totalPages: response.data.total_pages,
    };
  }

  //++++++++++++++++++
  async function GetData() {
    try {
      setIsLoading(true);
      setIsError(false);

      const { results, totalPages } = await fetchArticles();
      setArticles((prev) => [...prev, ...results]);
      setTotalPages(totalPages);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  //+++++++++++++++++++++++++++++++
  useEffect(() => {
    if (keyImage === "") {
      return;
    }
    GetData();
  }, [keyImage, page]);

  //++++++++++++++++++++++++++++++
  return (
    <>
      <SearchBar onSearch={NewSearch} />
      {isError && <ErrorMessage />}
      {articles.length > 0 && !isError && (
        <ImageGallery items={articles} onImgClick={handleImgClick} />
      )}
      {isLoading && !isError && <Loader />}
      {!isLoading && articles.length > 0 && !isError && page < totalPages && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {modalIsOpen && (
        <ImageModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          imageUrl={modalImage.url}
          imageAlt={modalImage.alt}
        />
      )}
    </>
  );
}

export default App;

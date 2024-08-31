import { useEffect, useState } from "react";
import axios from "axios";
// import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";

import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageModal from "../ImageModal/ImageModal";
import Loader from "../Loader/Loader";
import { string } from "yup";

//++++++++++++++++++++++++++++++++++
const App: React.FC = () => {
  interface ImodalImage {
    url: string;
    alt: string;
  }

  type client_id = string;
  type query = string;
  type orientation = string;
  // type per_page = number;
  //type page = number;

  /*  interface IURLSearchParams {
    client_id: string;
    query: string;
    orientation: string;
    per_page: number;
    page: number;
  } */

  interface Iarticles {
    id: string;
    urls: {
      regular: string;
      small: string;
    };
    alt_description: string;
  }

  const BASE_URL = "https://api.unsplash.com";
  const END_POINT = "/search/photos";
  const keyUser = "Fhd-P2QUhRR1aYB8Az9enT_MZd0_7CdpwCwyB01Kq0I";
  const per_page = 15;

  const [articles, setArticles] = useState<Iarticles[]>([]);
  const [keyImage, setKeyImage] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<ImodalImage>({
    url: "",
    alt: "",
  });

  //+++++++++++++++++++++++++++++++++++
  interface InewValues {
    username: string;
  }

  //+++++++++++++++++++++++++
  /*  const NewSearch = (newValues: InewValues) => {
    setArticles([]);
    setPage(1);
    return setKeyImage(newValues.username);
  }; */

  const NewSearch = (newValues: string) => {
    setArticles([]);
    setPage(1);
    return setKeyImage(newValues);
  };

  //++++++++++++++++++
  const handleLoadMore = () => {
    setPage(page + 1);
  };

  //++++++++++++++++++++
  const handleImgClick = (url: string, alt: string) => {
    setModalImage({ url, alt });
    setModalIsOpen(true);
  };

  //+++++++++++++++++
  function closeModal() {
    setModalIsOpen(false);
  }

  //+++++++++++++++++++++++++++++++++++

  /*  interface Iarticles {
    id: string;
    urls: {
      regular: string;
      small: string;
    };
    alt_description: string;
  }
 */
  /*  interface IfetchArticles {
    results: Iarticles;
    totalPages: number;
  } */
  //+++++++++++++++++++++++++++++++++++++++++++++++
  async function fetchArticles() {
    const params = new URLSearchParams({
      client_id: keyUser,
      query: keyImage,
      orientation: "landscape",
      per_page: per_page.toString(),
      page: page.toString(),
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
};

export default App;

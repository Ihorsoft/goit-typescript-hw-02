import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";
import { useState } from "react";

type SearchBarProps = {
  onSearch: (searchWord: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (inputValue === "") {
      toast("You must enter text to search for a picture.");
      return;
    }
    onSearch(inputValue);
    setInputValue("");
  };

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          value={inputValue}
          onChange={handleChange}
          name="searchWord"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={css.btn} type="submit">
          Search
        </button>
      </form>
      <Toaster />
    </header>
  );
};

export default SearchBar;

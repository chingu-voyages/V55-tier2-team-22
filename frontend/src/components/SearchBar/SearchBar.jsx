import { IoSearchOutline } from "react-icons/io5";
import styles from "./SearchBar.module.css";

function SearchBar({
  searchTerm,
  searchFilter,
  setSearchTerm,
  setSearchFilter,
  showClearButton,
  onClearAll
}) {
  return (
    <div>
      <div className="relative flex justify-center items-center gap-x-5 mx-auto w-full">
        <div
          className="
            relative flex flex-row items-center 
            w-lg max-w-full
            ps-2
            bg-mono-50
            border-1 border-mono-400 rounded-full 
            text-mono-950
            has-focus:outline-1 has-focus:outline-cyan-300 has-focus:border-cyan-300
            transition
          "
        >
          <IoSearchOutline size="1.5em" className="absolute" />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="w-full ps-8 pe-3 py-2 placeholder:text-mono-700 outline-none"
          />
        </div>

        <select
          className="border-1 border-mono-400 rounded p-2 text-black bg-white my-2.5 outline-0 cursor-pointer"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
        </select>
      </div>

      {showClearButton && (
        <button className={styles.clear_button} onClick={onClearAll}>
          Clear all filters
        </button>
      )}
    </div>
  );
}

export default SearchBar;

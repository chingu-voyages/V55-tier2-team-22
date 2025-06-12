import { IoSearchOutline } from "react-icons/io5";
import styles from "./SearchBar.module.css";

function SearchBar({
  searchTerm,
  searchFilter,
  setSearchTerm,
  setSearchFilter,
  onClearAll,
  showClearAllButton
}) {
  return (
    <div className="max-w-screen">
      <div className="relative mx-auto w-max grid grid-col-1 sm:flex justify-between gap-x-5 items-center">
        <div className="flex items-center">
          <div className="absolute inset-y-0 left-0 bottom-24 sm:bottom-0 pl-4 flex items-center pointer-events-none">
            <IoSearchOutline className="md:left-5 md:top-5 md:h-5 md:w-5 md:ml-3 text-gray-400" />
          </div>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="outline-2 lg:w-xl outline-cyan-400 rounded-2xl py-2 px-4 md:ml-5 pl-8 focus:outline-none focus:ring-2 focus:ring-cyan-900 transition"
          />
        </div>

        <select
          className="border rounded p-2 text-black bg-white my-2.5 outline-0 cursor-pointer"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
        </select>
      </div>

      {showClearAllButton && (
        <button className={styles.clear_button} onClick={onClearAll}>
          Clear all
        </button>
      )}
    </div>
  );
}

export default SearchBar;

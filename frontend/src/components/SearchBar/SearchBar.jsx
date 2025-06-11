import { Search } from "lucide-react";

function SearchBar({
  filterType,
  searchQuery,
  handleSearchChange,
  handleFilterSelect,
}) {
  return (
    <div className="max-w-screen">
      <div className="relative mx-auto w-max grid grid-col-1 sm:flex justify-between gap-x-5 items-center">
        <div className="flex items-center">
          <div className="absolute inset-y-0 left-0 bottom-24 sm:bottom-0 pl-4 flex items-center pointer-events-none">
            <Search className="md:left-5 md:top-5 md:h-5 md:w-5 md:ml-3 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="outline-2 lg:w-xl outline-cyan-400 rounded-2xl py-2 px-4 md:ml-5 pl-8 focus:outline-none focus:ring-2 focus:ring-cyan-900 transition"
          />
        </div>

        <select
          className="border rounded p-2 text-black bg-white my-2.5 outline-0 cursor-pointer"
          value={filterType}
          onChange={(e) => handleFilterSelect(e.target.value)}
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
        </select>
      </div>
    </div>
  );
}

export default SearchBar;

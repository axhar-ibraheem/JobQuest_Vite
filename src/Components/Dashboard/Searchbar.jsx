import { BsSearch, BsArrowRight } from "react-icons/bs";
import { ImLocation } from "react-icons/im";

const Searchbar = ({setTitleSearch, setLocationSearch}) => {
  return (
    <form className="grid md:grid-cols-2 items-center shadow-lg bg-white rounded-md">
      <div className="flex items-center p-3">
        <label className="text-2xl pe-4" htmlFor="searchTitle">
          <BsSearch className="text-blue-800" />
        </label>
        <input
          className="ps-2 focus:outline-none from-current w-full py-2 text-xl"
          placeholder="Filter by Title..."
          type="text"
          id="searchTitle"
          onChange={(event) => setTitleSearch(event.target.value)}
        />
      </div>

      <div className="flex items-center p-3">
        <label className="text-2xl pe-4" htmlFor="searchLocation">
          <ImLocation className="text-blue-800" />
        </label>
        <input
          className="ps-2 focus:outline-none col-span-2 from-current w-full py-2 text-xl"
          placeholder="Filter by Location..."
          type="text"
          id="searchLocation"
          onChange={(event) => setLocationSearch(event.target.value)}
        />
      </div>
    </form>
  );
};

export default Searchbar;

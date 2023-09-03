import { BsSearch, BsArrowRight } from "react-icons/bs";
import { ImLocation } from "react-icons/im";
import Jobs from "./Jobs";
import Spinner from "../UI/Spinner";
import { FaLaptopCode, FaShoppingBag, FaTools } from "react-icons/fa";
import { MdDesignServices } from "react-icons/md";
import { HiSpeakerphone } from "react-icons/hi";
import { TiThSmall } from "react-icons/ti";
import { useState } from "react";
const job_categories = [
  {
    category: "all",
    icon: <TiThSmall className="text-2xl text-cyan-700" />,
  },
  {
    category: "development",
    icon: <FaLaptopCode className="text-2xl text-cyan-700" />,
  },
  {
    category: "design",
    icon: <MdDesignServices className="text-2xl text-cyan-700" />,
  },
  {
    category: "marketing",
    icon: <HiSpeakerphone className="text-2xl text-cyan-700" />,
  },
  {
    category: "business",
    icon: <FaShoppingBag className="text-2xl text-cyan-700" />,
  },
  {
    category: "support",
    icon: <FaTools className="text-2xl text-cyan-700" />,
  },
];
const Searchbar = () => {
  const [showSpinner, setShowSpinner] = useState(false);
  const [titleSearch, setTitleSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const categoryHandler = (category) => {
    category = category === "all" ? "" : category;
    setCategorySearch(category);
  };
  return (
    <>
      <div className="max-w-7xl pt-32 w-11/12 mx-auto">

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

        <div className="grid lg:grid-cols-3 gap-7 py-10">
          <div className="lg:sticky lg:top-20 grid place-self-start w-full">
            <div className="bg-white rounded-lg shadow-lg shadow-purple-200 p-4 lg:p-10">
              <h1 className="capitalize text-2xl font-semibold">categories</h1>
              {job_categories.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center mt-4 justify-between"
                >
                  <div className="flex items-center gap-4">
                    {item.icon}
                    <h3 className="capitalize text-xl tracking-wider">
                      {item.category}
                    </h3>
                  </div>
                  <BsArrowRight
                    onClick={() => categoryHandler(item.category)}
                    className={`text-3xl cursor-pointer transition ease-linear duration-300 delay-100 hover:translate-x-2 ${
                      categorySearch === item.category ? "translate-x-2" : ""
                    } text-cyan-600`}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2 relative grid grid-cols-1 gap-5 place-self-start w-full">
            <Jobs
              setShowSpinner={setShowSpinner}
              titleSearch={titleSearch}
              locationSearch={locationSearch}
              categorySearch={categorySearch}
            />
            <div className="absolute mt-10 w-full">
              {showSpinner && <Spinner classes = "w-16 h-16" />}
            </div>
          </div>
        </div>

        
      </div>
    </>
  );
};

export default Searchbar;

import {
  FaLaptopCode,
  FaShoppingBag,
  FaTools,
  FaLongArrowAltRight,
} from "react-icons/fa";
import { MdDesignServices } from "react-icons/md";
import { HiSpeakerphone } from "react-icons/hi";
import { TiThSmall } from "react-icons/ti";

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

const JobCategoryFilter = ({ setCategorySearch, categorySearch }) => {
  const categoryHandler = (category) => {
    category = category === "all" ? "" : category;
    setCategorySearch(category);
  };

  return (
    <div className="lg:sticky lg:top-20 grid place-self-start w-full">
      <div className="bg-white rounded-lg shadow-lg shadow-purple-200 p-4 lg:p-10">
        <h1 className="capitalize text-2xl font-semibold">categories</h1>
        {job_categories.map((item, index) => (
          <div key={index} className="flex items-center mt-4 justify-between">
            <div className="flex items-center gap-4">
              {item.icon}
              <h3 className="capitalize text-lg lg:text-xl tracking-wider">
                {item.category}
              </h3>
            </div>
            <FaLongArrowAltRight
              onClick={() => categoryHandler(item.category)}
              className={`text-3xl cursor-pointer transition ease-linear duration-300 delay-100 hover:translate-x-2 ${
                categorySearch === item.category
                  ? "translate-x-2 text-violet-900"
                  : ""
              } text-cyan-600`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobCategoryFilter;

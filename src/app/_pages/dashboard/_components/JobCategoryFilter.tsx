import { FaLongArrowAltRight } from "react-icons/fa";
import { jobCategories } from "../_data/jobCategories.data";

interface JobCategoryFilterProps {
  setCategorySearch: (category: string) => void;
  categorySearch: string;
}

const JobCategoryFilter = ({
  setCategorySearch,
  categorySearch,
}: JobCategoryFilterProps) => {
  const categoryHandler = (category: string): void => {
    setCategorySearch(category === "all" ? "" : category);
  };

  return (
    <div className="lg:sticky lg:top-20 grid place-self-start w-full">
      <div className="bg-white rounded-lg shadow-lg shadow-purple-200 p-4 lg:p-10">
        <h1 className="capitalize text-2xl font-semibold">categories</h1>
        {jobCategories.map((item, index) => (
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
            ></FaLongArrowAltRight>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobCategoryFilter;

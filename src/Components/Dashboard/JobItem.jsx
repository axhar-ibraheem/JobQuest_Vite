import formatDate from "../../utils/dateFormat";
import { ImLocation } from "react-icons/im";
import { BiCalendar, BiSolidTimeFive } from "react-icons/bi";
import { FaToolbox } from "react-icons/fa";
import { Link } from "react-router-dom";
const JobItem = ({
  id,
  title,
  location,
  posting_date,
  company_name,
  category,
  type,
}) => {
  const formattedDate = formatDate(posting_date);

  return (
    <article className="max-w-96 rounded-lg p-4 lg:p-10 bg-white grid shadow-lg shadow-purple-200 transition ease-in-out duration-500">
      <div className="flex gap-5">
        <div className="bg-gradient-to-r from-gray-600 to-gray-500 shadow-xl w-12 h-12 lg:w-20 lg:h-20 text-stone-100  text-3xl font-bold grid hover:shadow-2xl place-content-center rounded-lg">
          {title[0]}
        </div>
        <div>
          <h1 className="capitalize font-bold text-lg lg:text-2xl text-blue-900 tracking-wide">
            {title}
          </h1>
          <p className="capitalize italic lg:text-lg">{company_name}</p>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-3 mt-7">
        <div className="flex items-center gap-3 text-gray-500">
          <ImLocation className="text-2xl lg:text-3xl text-rose-900" />
          <p className="capitalize tracking-wide lg:text-xl">{location}</p>
        </div>

        <div className="flex items-center gap-3 text-gray-500">
          <BiCalendar className="text-2xl text-rose-900" />
          <p>{formattedDate}</p>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 mt-7">
        <div className="flex items-center gap-3 text-gray-500">
          <FaToolbox className="text-2xl lg:text-3xl text-rose-900" />
          <p className="capitalize tracking-wide lg:text-xl">{category}</p>
        </div>

        <div className="flex items-center gap-3">
          <BiSolidTimeFive className="text-2xl lg:text-3xl text-rose-900" />
          <p className="capitalize text-green-800 tracking-wider bg-orange-200 px-2 py-1 rounded-sm">
            {type}
          </p>
        </div>
      </div>
      <div className="mt-7 flex gap-3">
        <Link to = {`/dashboard/${id}`}>
          <button className="bg-blue-800 px-4 py-2 rounded-md text-white shadow-lg shadow-gray-300 capitalize tracking-wide transition ease-linear duration-300 delay-150 hover:shadow-gray-500">
            veiw details
          </button>
        </Link>
      </div>
    </article>
  );
};

export default JobItem;

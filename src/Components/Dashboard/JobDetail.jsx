import { useParams } from "react-router-dom/cjs/react-router-dom";
import formatDate from "../../utils/dateFormat";
import { ImLocation } from "react-icons/im";
import { BiCalendar, BiSolidTimeFive } from "react-icons/bi";
import { FaToolbox } from "react-icons/fa";
import Spinner from "../UI/Spinner";
const JobDetail = ({ jobs }) => {
  const params = useParams();

  const job = jobs.find((job) => job.id === params.job_id);
 
//   console.log(singleJob.job_id);
  if (jobs.length === 0)
    return (
      <div className="max-w-6xl pt-32 w-11/12 mx-auto">
        <Spinner classes="w-10 h-10" />
      </div>
    );
    const {
        job_title,
        job_type,
        company_name,
        posting_date,
        location,
        category,
      } = job;
    const formattedDate = formatDate(posting_date);
  return (
    <section className="max-w-6xl pt-32 w-11/12 mx-auto">
      <div>
        <div className="bg-white p-7 shadow-lg rounded-xl">
          <div className="flex gap-5">
            <div className="bg-gradient-to-r from-gray-600 to-gray-500 shadow-xl w-12 h-12 lg:w-20 lg:h-20 text-stone-100  text-3xl font-bold grid hover:shadow-2xl place-content-center rounded-lg">
             {job_title[0]}
            </div>
            <div>
              <h1 className="capitalize font-bold text-lg lg:text-2xl text-blue-900 tracking-wide">
                {job_title}
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
              <p className="capitalize tracking-wide lg:text-xl">
                {category}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <BiSolidTimeFive className="text-2xl lg:text-3xl text-rose-900" />
              <p className="capitalize text-green-800 tracking-wider bg-orange-200 px-2 py-1 rounded-sm">
                {job_type}
              </p>
            </div>
          </div>
        </div>

        <div></div>
      </div>
    </section>
  );
};

export default JobDetail;

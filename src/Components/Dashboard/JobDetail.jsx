import { useParams } from "react-router-dom/cjs/react-router-dom";
import formatDate from "../../utils/dateFormat";
import { ImLocation } from "react-icons/im";
import { BiCalendar, BiSolidTimeFive } from "react-icons/bi";
import { PiSlackLogoDuotone } from "react-icons/pi";
import { AiOutlineDollar } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import Spinner from "../UI/Spinner";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
const JobDetail = ({ jobs }) => {
  const params = useParams();
  const history = useHistory();
  const job = jobs.find((job) => job.id === params.job_id);
  const onBackHandler = () => {
    history.replace("/dashboard");
  };
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
    <section className="max-w-6xl pt-28 w-11/12 mx-auto">
      <div className="mb-5 flex items-center">
        <div onClick={onBackHandler} className="flex gap-3 cursor-pointer">
          <BsArrowLeft className="text-3xl transition ease-linear duration-300 delay-150 hover:-translate-x-2 text-blue-700 " />
          <span className="text-lg capitalize text-blue-700 ">
            back to jobs
          </span>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 gap-7 pb-10">
        <div className="bg-white p-4 lg:p-10 shadow-lg rounded-xl lg:col-span-2 grid grid-cols-1 gap-7 place-self-start w-full">
          <div className="flex justify-between items-center">
            <div className="flex gap-5 items-center">
              <div className="bg-gradient-to-r from-gray-600 to-gray-500 shadow-xl w-16 h-16 lg:w-24 lg:h-24 text-stone-100 text-3xl lg:text-4xl font-bold grid hover:shadow-2xl place-content-center rounded-lg">
                {job_title[0]}
              </div>
              <div className="grid gap-1">
                <h1 className="capitalize font-bold text-lg lg:text-3xl text-blue-900 tracking-wide">
                  {job_title}
                </h1>
                <p className="capitalize italic lg:text-lg">{company_name}</p>
                <div className="flex text-gray-500">
                  <p className="capitalize tracking-wide lg:text-lg bg-gray-200 px-3 rounded-sm">
                    {category}
                  </p>
                </div>
              </div>
            </div>
            <div className="hidden sm:block place-self-end">
              <div className="flex items-center gap-3 text-gray-500">
                <BiCalendar className="text-2xl text-blue-800" />
                <p>{formattedDate}</p>
              </div>
              <div>
                <button className="bg-sky-900 w-full shadow-lg rounded-md py-2 mt-4 text-white capitalize text-lg shadow-gray-500 transition ease-in-out delay-150 duration-300 hover:bg-sky-950">
                  apply now
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-between gap-4 flex-wrap mt-7 ">
            <div className="flex items-center  gap-2 text-gray-500">
              <ImLocation className="text-2xl drop-shadow-lg lg:text-3xl text-blue-800" />
              <p className="capitalize tracking-wide lg:text-xl">{location}</p>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <AiOutlineDollar className="text-2xl drop-shadow-lg lg:text-3xl text-blue-800" />
              <p className="capitalize tracking-wide lg:text-xl">
                100,000 USD{" "}
              </p>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <BiSolidTimeFive className="text-2xl drop-shadow-lg lg:text-3xl text-blue-800" />
              <p className="capitalize text-green-800 tracking-wider lg:text-xl">
                {job_type}
              </p>
            </div>
          </div>
          <div className="sm:hidden">
            <div className="flex items-center gap-3 text-gray-500">
              <BiCalendar className="text-2xl text-blue-800" />
              <p>{formattedDate}</p>
            </div>
            <div>
              <button className="bg-sky-900 w-full shadow-lg rounded-md py-2 mt-4 text-white capitalize text-lg shadow-gray-500 transition ease-in-out delay-75 duration-200 hover:bg-sky-950">
                apply now
              </button>
            </div>
          </div>
          <div className="border-t-2 pt-7">
            <h1 className="text-2xl capitalize font-bold mb-3">
              job description
            </h1>
            <p className="text-lg tracking-wide mb-3">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam
              inventore nobis qui quam, totam, animi maxime natus repudiandae at
              quisquam reiciendis nulla ab eaque possimus quia dolore aliquam
              quis mollitia illo sint, obcaecati dignissimos esse! Assumenda
              itaque quo suscipit nam, neque quos, labore, quia fuga maxime
              necessitatibus accusantium sint exercitationem.
            </p>
            <h1 className="text-xl font-bold tracking-wide mb-3">
              Roles & Responsibilities
            </h1>
            <ul className="list-disc max-w-[720px] w-[90%] mx-auto">
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Architecto, amet.
              </li>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
                asperiores consequatur saepe eum voluptas soluta!
              </li>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur cum, ex facilis quis dolor neque asperiores
                consectetur tenetur.
              </li>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium harum ea tempore minima esse voluptatum ratione
                aliquam.
              </li>
            </ul>
          </div>
          <div>
            <h1 className="text-2xl capitalize font-bold mb-3">
              about the company
            </h1>
            <div className="flex items-center gap-2">
              <PiSlackLogoDuotone className="text-3xl bg-blue-700 text-white  w-14 h-14 p-2 rounded-md" />
              <div>
                <h1 className="text-xl font-semibold text-blue-600 tracking-wider">
                  {company_name}
                </h1>
                <p>924,134 followers</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-20 grid place-self-start w-full">
          <div className="bg-white rounded-lg shadow-lg grid grid-cols-1 gap-4 shadow-purple-200 p-4 lg:p-10">
            <h1 className=" text-xl tracking-wide lg:text-2xl font-semibold">
              Ready to apply for this job opening?
            </h1>
            <p className="lg:text-lg tracking-wide">
              Please let the company know that you found this position on this
              Job Board as a way to support us, so we can keep posting cool
              jobs.
            </p>
            <div>
              <button className="w-full bg-sky-900 py-3 text-white capitalize text-xl shadow-lg shadow-gray-500 transition ease-in-out delay-100 duration-200 hover:bg-sky-950 rounded-md ">
                apply now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobDetail;

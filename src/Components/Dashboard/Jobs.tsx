import JobItem from "./JobItem";
import Spinner from "../UI/Spinner";
import { Job } from "../../types/job.types";

interface JobsProps {
  locationSearch: string;
  titleSearch: string;
  categorySearch: string;
  jobs: Job[];
  showSpinner: boolean;
}

const Jobs = ({
  locationSearch,
  titleSearch,
  categorySearch,
  jobs,
  showSpinner,
}: JobsProps) => {
  const filteredJobs = jobs.filter((job: Job) => {
    const noFiltersApplied =
      !titleSearch.toLowerCase().trim() &&
      !locationSearch.toLowerCase().trim() &&
      !categorySearch;

    if (noFiltersApplied) return true;

    return (
      job.job_title.toLowerCase().startsWith(titleSearch.toLowerCase()) &&
      job.location.toLowerCase().startsWith(locationSearch.toLowerCase()) &&
      job.category.toLowerCase().startsWith(categorySearch)
    );
  });

  return (
    <div className="lg:col-span-2 relative grid grid-cols-1 gap-5 place-self-start w-full">
      {filteredJobs.map((job) => (
        <JobItem
          key={job.id}
          id={job.id}
          location={job.location}
          job_title={job.job_title}
          posting_date={job.posting_date}
          company_name={job.company_name}
          job_type={job.job_type}
          category={job.category}
        ></JobItem>
      ))}
      <div className="absolute mt-10 w-full">
        {showSpinner && <Spinner classNames="w-16 h-16"></Spinner>}
      </div>
    </div>
  );
};

export default Jobs;

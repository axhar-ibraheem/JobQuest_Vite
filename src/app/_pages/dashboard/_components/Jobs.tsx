import JobItem from "./JobItem";
import { Spinner } from "@jobquest/shared";
import { Job } from "@jobquest/models";
import { filterJobs } from "../_utils/filterJobs";

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
  const filteredJobs = filterJobs(jobs, {
    titleSearch,
    locationSearch,
    categorySearch,
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

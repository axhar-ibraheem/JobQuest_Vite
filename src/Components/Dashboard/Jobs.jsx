import { useEffect, useState } from "react";
import axios from "axios";
import JobItem from "./JobItem";
import Spinner from "../UI/Spinner";
const Jobs = ({ locationSearch, titleSearch, categorySearch, jobs, showSpinner }) => {
  const filteredJobs = jobs.filter((job) =>
    !titleSearch.toLowerCase().trim() &&
    !locationSearch.toLowerCase().trim() &&
    !categorySearch
      ? job
      : job.job_title.toLowerCase().startsWith(titleSearch.toLowerCase()) &&
        job.location.toLowerCase().startsWith(locationSearch.toLowerCase()) &&
        job.category.toLowerCase().startsWith(categorySearch)
  );
  return (
    <div className="lg:col-span-2 relative grid grid-cols-1 gap-5 place-self-start w-full">
      {filteredJobs.map((job) => (
        <JobItem
          key={job.id}
          id={job.id}
          location={job.location}
          title={job.job_title}
          posting_date={job.posting_date}
          company_name={job.company_name}
          type={job.job_type}
          category={job.category}
        />
      ))}
      <div className="absolute mt-10 w-full">
        {showSpinner && <Spinner classes="w-16 h-16" />}
      </div>
    </div>
  );
};

export default Jobs;

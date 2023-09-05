import Jobs from "./Jobs";
import JobCategoryFilter from "./JobCategoryFilter";
import { useState } from "react";
const JobList = ({ locationSearch, titleSearch, jobs, showSpinner }) => {
  const [categorySearch, setCategorySearch] = useState("");
  return (
    <>
    <div className="my-7 ">
      <h1 className="text-4xl tracking-wide capitalize">latest <span className="text-blue-700 font-bold">tech</span> jobs</h1>
    </div>
      <div className="grid lg:grid-cols-3 gap-7 pb-10">
        <JobCategoryFilter
          setCategorySearch={setCategorySearch}
          categorySearch={categorySearch}
        />
        <Jobs
          titleSearch={titleSearch}
          locationSearch={locationSearch}
          categorySearch={categorySearch}
          jobs={jobs}
          showSpinner={showSpinner}
        />
      </div>
    </>
  );
};

export default JobList;

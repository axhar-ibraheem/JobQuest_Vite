import Jobs from "./Jobs";
import JobCategoryFilter from "./JobCategoryFilter";
import { useState } from "react";
const JobList = ({ locationSearch, titleSearch, jobs, showSpinner }) => {
  const [categorySearch, setCategorySearch] = useState("");
  return (
    <div className="grid lg:grid-cols-3 gap-7 py-10">
      <JobCategoryFilter
        setCategorySearch={setCategorySearch}
        categorySearch={categorySearch}
      />
      <Jobs
        titleSearch={titleSearch}
        locationSearch={locationSearch}
        categorySearch={categorySearch}
        jobs = {jobs}
        showSpinner = {showSpinner}
      />
    </div>
  );
};

export default JobList;

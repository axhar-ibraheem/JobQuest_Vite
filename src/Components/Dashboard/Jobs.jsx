import { useEffect, useState } from "react";
import axios from "axios";
import JobItem from "./JobItem";

const Jobs = ({
  setShowSpinner,
  locationSearch,
  titleSearch,
  categorySearch,
}) => {
  const [jobs, setJobs] = useState([]);

  const filteredJobs = jobs.filter((job) =>
    !titleSearch.toLowerCase().trim() &&
    !locationSearch.toLowerCase().trim() &&
    !categorySearch 
      ? job
      : job.job_title.toLowerCase().startsWith(titleSearch.toLowerCase()) &&
        job.location.toLowerCase().startsWith(locationSearch.toLowerCase()) &&
        job.category.toLowerCase().startsWith(categorySearch)
  );

  useEffect(() => {
    setShowSpinner(true);
    async function getJobs() {
      try {
        const response = await axios.get(
          "https://jobsboard-e5259-default-rtdb.firebaseio.com/jobs_data.json"
        );
        if (response.status === 200) {
          const { data } = response;
          setJobs([...data]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setShowSpinner(false);
      }
    }
    getJobs();
  }, []);

  return (
    <>
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
    </>
  );
};

export default Jobs;

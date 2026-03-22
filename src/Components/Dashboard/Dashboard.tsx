import Searchbar from "./Searchbar";
import JobList from "./JobList";
import { useState } from "react";
import { Job } from "../../types/job.types";

interface DashboardProps {
  jobs: Job[];
  showSpinner: boolean;
}

const Dashboard = ({ jobs, showSpinner }: DashboardProps) => {
  const [titleSearch, setTitleSearch] = useState<string>("");
  const [locationSearch, setLocationSearch] = useState<string>("");

  return (
    <section className="max-w-7xl pt-32 w-11/12 mx-auto">
      <Searchbar
        setTitleSearch={setTitleSearch}
        setLocationSearch={setLocationSearch}
      ></Searchbar>
      <JobList
        titleSearch={titleSearch}
        locationSearch={locationSearch}
        jobs={jobs}
        showSpinner={showSpinner}
      ></JobList>
    </section>
  );
};

export default Dashboard;

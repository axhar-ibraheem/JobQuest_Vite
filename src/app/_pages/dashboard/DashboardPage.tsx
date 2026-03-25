import Searchbar from "../dashboard/_components/Searchbar";
import JobList from "../dashboard/_components/JobList";
import { useState } from "react";
import { Job } from "@jobquest/models";

interface DashboardPageProps {
  jobs: Job[];
  showSpinner: boolean;
}

const DashboardPage = ({ jobs, showSpinner }: DashboardPageProps) => {
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

export default DashboardPage;

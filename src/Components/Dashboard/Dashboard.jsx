import Searchbar from "./Searchbar";
import JobList from "./JobList";
import { useState } from "react";
const Dashboard = ({jobs, showSpinner}) => {
  const [titleSearch, setTitleSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
 
  return (
    <section className="max-w-7xl pt-32 w-11/12 mx-auto">
      <Searchbar setTitleSearch = {setTitleSearch} setLocationSearch={setLocationSearch}/>
      <JobList titleSearch ={titleSearch} locationSearch = {locationSearch} jobs = {jobs} showSpinner={showSpinner}/>
    </section>
  );
};

export default Dashboard;

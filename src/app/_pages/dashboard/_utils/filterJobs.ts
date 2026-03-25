import { Job } from "../../../_models/job.types";

interface JobFilters {
  titleSearch: string;
  locationSearch: string;
  categorySearch: string;
}

export const filterJobs = (jobs: Job[], filters: JobFilters): Job[] => {
  const { titleSearch, locationSearch, categorySearch } = filters;

  return jobs.filter((job: Job) => {
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
};

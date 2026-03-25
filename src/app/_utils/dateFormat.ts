function formatDate(inputDate: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const parsedDate = new Date(inputDate);
  return parsedDate.toLocaleDateString("en-US", options);
}

export default formatDate;

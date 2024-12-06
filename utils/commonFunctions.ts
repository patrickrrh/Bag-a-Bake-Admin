export const formatDatewithtime = (date: string) => {
    const dateObj = new Date(date);
    const options: any = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    };
    return dateObj.toLocaleString("id-ID", options);
  };
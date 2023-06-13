import { useState, useEffect } from "react";
import { format } from "date-fns";

const useFormattedDate = (dateString, outputFormat = "yyyy-MM-dd HH:mm:ss") => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const formatted = format(new Date(dateString), outputFormat);
    setFormattedDate(formatted);
  }, [dateString, outputFormat]);

  return formattedDate;
};

export default useFormattedDate;
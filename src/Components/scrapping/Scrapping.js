import React, { useEffect, useState } from "react";
import axios from "axios";
import cheerio from "cheerio";

const Scrapping = () => {
  const [allJobs, setAllJobs] = useState([]);

  const fetchData = async () => {
    const url =
      "https://apna.co/jobs?location_id=0&location_identifier=64e4b7cdc35bd44248cbcab1&location_type=NBArea&location_name=Bangalore%20City%20Municipal%20Corporation%20Layout&search=true&text=IT%20Engineer&entity_id=360&entity_type=JobTitle";
    const apiKey = "42110a824d3fb1600bc19607a2725c3e";

    try {
      const response = await axios.get("http://api.scraperapi.com", {
        params: { api_key: apiKey, url: url },
      });

      const $ = cheerio.load(response.data);

      const jobs = [];
      $("div.JobListCardstyles__JobTitle-ffng7u-7.cuaBGE").each(
        (index, element) => {
          const title = $(element).text();
          jobs.push({ title: title });
        }
      );

      setAllJobs(jobs);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Call the fetchData function to initiate the process
    fetchData();
  }, []);

  return (
    <div>
      JOBS:
      {allJobs.length === 0
        ? "loading..."
        : allJobs.map((item, index) => {
            return (
              <div>
                {index + 1} : {item.title}
              </div>
            );
          })}
    </div>
  );
};

export default Scrapping;

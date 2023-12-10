import React, { useEffect, useState } from "react";
import axios from "axios";
import cheerio from "cheerio";

const Scrappint = () => {

  const [allJobs, setAllJobs] = useState([]);

  const fetchData = async () => {
    const url =
      "https://internshala.com/internships/work-from-home-front-end-development-internships/";
    const apiKey = "42110a824d3fb1600bc19607a2725c3e";

    try {
      const response = await axios.get("http://api.scraperapi.com", {
        params: { api_key: apiKey, url: url },
      });

      const $ = cheerio.load(response.data);

      const jobs = [];
      // scapping data 
      const $selected = $("div.internship_meta");
      $selected.each((index, element) => {
        // scrapping the title
        const $title = $(element).find(
          "a.view_detail_button:not([class*=' '])"
        );
        // scrapping the type of location remote/office
        const $location = $(element).find("a.location_link.view_detail_button");
        const $company = $(element).find(
          "a.link_display_like_text.view_detail_button"
        );
        // scrapping the stipend
        const $stipend = $(element).find("span.stipend");
        // scrapping the time period of intern
        const $duration = $(element).find(".item_body");
        const jobInfo = {
          title: $title[0].children[0].data,
          location: $location[0].children[0].data,
          company: $company[0].children[0].data.trim(),
          stipend: $stipend[0].children[0].data,
          duration: $duration[1].children[0].data.trim(),
        };
        jobs.push(jobInfo);
      });
      console.log(jobs);
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
    </div>
  );
};

export default Scrappint;

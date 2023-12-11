import React, { useState } from "react";
import { JobContext } from "./JobsStore";
import axios from "axios";
import cheerio from "cheerio";

const JobStoreState = (props) => {
  const [allJobsDetails, setAllJobDetails] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [jobPlace, setJobPlace] = useState("");
  const [url, setUrl] = useState("");
  const [userName, setUserName] = useState("User Name");

  const fetchData = async (title) => {
    let last;
    if (jobPlace === "work-from-home-") {
      last = "-internships/";
    } else if (jobPlace === "part-time-") {
      last = "-jobs/";
    } else {
      last = "-internship/";
    }
    const url = `https://internshala.com/internships/${jobPlace}${title}${last}`;
    setUrl(url);
    const apiKey = "42110a824d3fb1600bc19607a2725c3e";

    try {
      const response = await axios.get("https://api.scraperapi.com", {
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

      setAllJobDetails(jobs);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <JobContext.Provider
      value={{
        allJobsDetails,
        fetchData,
        alertMessage,
        setAlertMessage,
        setJobPlace,
        url,
        userName,
        setUserName,
      }}
    >
      {props.children}
    </JobContext.Provider>
  );
};

export default JobStoreState;

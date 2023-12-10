import "./home.css";
import React, { useContext, useEffect, useState } from "react";
import { JobContext } from "../../context/JobsStore";
import Card from "../card/Card";

const Home = () => {
  const { allJobsDetails, fetchData, setJobPlace, userName } =
    useContext(JobContext);
  const [active, setActive] = useState({
    one: "",
    two: "",
    three: "",
    four: "",
    five: "",
    six: "",
    seven: "",
    eight: "",
    nine: "",
    ten: "",
    eleven: "",
    twelve: "",
  });

  const fetchAllJobs = () => {
    fetchData();
  };

  const handleOption = (opt, title) => {
    setActive({ [opt]: "active" });
    fetchData(title);
  };

  useEffect(() => {
    fetchAllJobs();
  }, []);

  return (
    <div className="home_container flex flex-col items-center justify-center">
      <div className="home_header w-full h-24 bg-red-100 flex flex-row items-center justify-between">
        <img
          src="./Talenttraverselogo.jpg"
          alt="img"
          className="h-full w-auto"
        />
        <div className="home_user_info text-lg"><i className="fa-solid fa-user-tie mr-2"></i>{userName}</div>
      </div>
      <div className="home_content w-4/5  mt-10 mb-10 pb-3 h-screen flex flex-row">
        <div className="home_filter h-full w-2/5 flex flex-col items-center justify-between">
          <div className="home_intern_type flex flex-row items-center justify-around w-full mt-2">
            <label
              htmlFor="home"
              className={` border-2  px-2 py-1 rounded text-lg cursor-pointer bg-white border-white shadow-md`}
              onClick={() => setJobPlace("work-from-home-")}
            >
              <input type="radio" id="home" name="place" className="mr-1" />
              Work From Home
            </label>
            <label
              htmlFor="office"
              className={` border-2 text-lg cursor-pointer bg-white border-white shadow-md px-2 py-1  rounded `}
              onClick={() => setJobPlace("part-time-")}
            >
              <input type="radio" id="office" name="place" className="mr-1" />
              Office
            </label>
          </div>
          <div
            className={`option ${active.one}`}
            onClick={() => handleOption("one", "amazon-web-server-aws")}
          >
            Amazon Web Server
          </div>
          <div
            className={`option ${active.two}`}
            onClick={() => handleOption("two", "android-app-development")}
          >
            Android App Developer
          </div>
          <div
            className={`option ${active.three}`}
            onClick={() => handleOption("three", "angular-js-development")}
          >
            Angular Js Developer
          </div>
          <div
            className={`option ${active.four}`}
            onClick={() => handleOption("four", "artificial-intelligence-ai")}
          >
            Artificial Intelligence-AI
          </div>
          <div
            className={`option ${active.five}`}
            onClick={() => handleOption("five", "blockchain-development")}
          >
            BlockChain Development
          </div>
          <div
            className={`option ${active.six}`}
            onClick={() => handleOption("six", "backend-development")}
          >
            Backend Developer
          </div>
          <div
            className={`option ${active.seven}`}
            onClick={() => handleOption("seven", "c-programmingt")}
          >
            C Progamming
          </div>{" "}
          <div
            className={`option ${active.eight}`}
            onClick={() => handleOption("eight", "cyber-security")}
          >
            Cyber Security
          </div>
          <div
            className={`option ${active.nine}`}
            onClick={() => handleOption("nine", "digital-marketing")}
          >
            Digital Marketing
          </div>
          <div
            className={`option ${active.ten}`}
            onClick={() => handleOption("ten", "express-js")}
          >
            Express JS
          </div>
          <div
            className={`option ${active.eleven}`}
            onClick={() => handleOption("eleven", "full-stack-development")}
          >
            Full Stack Developer
          </div>
          <div
            className={`option ${active.twelve}`}
            onClick={() => handleOption("twelve", "front-end-development")}
          >
            Frontend Developer
          </div>
        </div>
        <div className="home_results flex flex-row items-center justify-center w-3/5 mt-2">
          <div className="home_result_container w-11/12 h-full flex flex-col items-center justify-start overflow-y-scroll custom-scrollbar">
            {allJobsDetails.length === 0
              ? "loading..."
              : allJobsDetails.map((item, index) => {
                  return (
                    <div className="w-11/12" key={index}>
                      <Card item={item}/>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
// border-black
// bg-black text-white

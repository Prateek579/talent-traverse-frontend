import React, { useContext } from "react";
import "./card.css";
import { JobContext } from "../../context/JobsStore";

const Card = (props) => {

    const {url} = useContext(JobContext)
 
    const handleClick = () => {
       window.open(url, '_blank')
    }

  return (
    <div
      className="card_contaner bg-gray-100 mt-3
    flex flex-col items-start justify-around rounded-md p-3"
   >
      <div className="card_title_detail w-full flex flex-row items-center justify-between">
        <div className="card_title text-xl">{props.item.title}</div>
        <img src="./Talenttraverselogo.jpg" alt="img" className="h-12" />
      </div>
      <div className="card_company text-gray-400 mt-2">
        {props.item.company}
      </div>
      <div className="card_location mt-2">
        <i className="fa-solid fa-house-user text-black mr-2"></i>
        {props.item.location}
      </div>
      <div className="card_info w-full flex flex-row items-center justify-between mt-2">
        <div className="card_duration">
          <i className="fa-regular fa-calendar-days mr-2"></i>
          {props.item.duration}
        </div>
        <div className="card_stippend"><i className="fa-solid fa-wallet mr-2"></i>{props.item.stipend}</div>
      </div>
      <button className="m-3 bg-black text-white py-1 px-2 rounded-md cursor-pointer" onClick={()=>handleClick()}>Apply Now</button>
    </div>
  );
};

export default Card;

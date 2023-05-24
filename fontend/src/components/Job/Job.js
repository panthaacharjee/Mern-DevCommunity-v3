import React, { useState } from "react";
import "./jobs.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import ReactTimeAgos from "../CustomComponent/ReactTimeAgos";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Job = ({ val }) => {
  const [save, setSave] = useState(true);
  const handleSave = (props) => {
    if (props === "save") {
      setSave(false);
      toast("Job Saved");
    } else {
      setSave(true);
      toast("Job Unsaved");
    }
  };
  return (
    <div className="job-container">
      <Link to={`/job/${val._id}`}>
        <img src={val.owner.avatar.url} alt="client-avatar" />
        <div className="job-box">
          <h4>{val.name}</h4>
          <p>{val.owner.name}</p>
          <label>{val.location}</label>
          <p style={{ marginTop: "10px", color: "green" }}>
            <ReactTimeAgos date={val.createdAt} />
          </p>
        </div>
      </Link>
      {save ? (
        <p onClick={() => handleSave("save")}>
          <AiOutlineHeart />
        </p>
      ) : (
        <p onClick={() => handleSave("unsave")}>
          <AiFillHeart />
        </p>
      )}
    </div>
  );
};

export default Job;

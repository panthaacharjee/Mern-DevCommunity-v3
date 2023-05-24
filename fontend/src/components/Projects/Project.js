import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import ReactTimeAgos from "../CustomComponent/ReactTimeAgos";
import { GoLocation } from "react-icons/go";
import { toast } from "react-toastify";

const Project = ({ val }) => {
  console.log(val);
  let about = val.about.substr(0, 250) + "............";

  //Project Save
  const [save, setSave] = useState(true);
  const handleSave = (props) => {
    if (props === "save") {
      setSave(false);
      toast("Project Saved");
    } else {
      setSave(true);
      toast("Project Unsaved");
    }
  };

  return (
    <div className="project-container">
      <Link to={`/project/${val._id}`} className="project-box">
        <h4>{val.name}</h4>
        <div className="project-desc">
          <p>{val.priceType}</p>
          <p>{val.label}</p>
          <p>
            Budget : ৳<span>{val.price}</span>
          </p>
          <p>
            Posted
            <span>
              <ReactTimeAgos date={val.createdAt} />
            </span>
          </p>
        </div>
        <p
          dangerouslySetInnerHTML={{ __html: about }}
          className="project-about"
        />
        <div className="project-skill-box">
          {val.skills.map((skill, ind) => {
            return <p key={ind}>{skill.skill}</p>;
          })}
        </div>
        <div className="project-footer-box">
          <p>
            <label>Proposals : </label> {val.bidders.length}
          </p>
          <p>
            <span>
              <GoLocation /> {val.owner.location}
            </span>
          </p>
        </div>
      </Link>
      {save ? (
        <button className="project-save-btn" onClick={() => handleSave("save")}>
          <AiOutlineHeart />
        </button>
      ) : (
        <button
          className="project-save-btn"
          onClick={() => handleSave("unsave")}
        >
          <AiFillHeart />
        </button>
      )}
    </div>
  );
};

export default Project;

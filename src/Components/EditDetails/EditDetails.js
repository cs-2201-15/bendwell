import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editRoutine } from "../../store/routine";
import "./editdetails.scss";

const EditDetails = ({ routine, setDetails }) => {
  const [routineName, setroutineName] = useState(routine.name);
  const [text, settext] = useState(routine.notes || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editRoutine(routine.id, routineName, text));

    setDetails(false);
  };

  return (
    <div className="edit-details-background">
      <div className="edit-details-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          onClick={() => {
            setDetails(false);
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <h1 className="title">Edit Routine Details</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            className="placeholder"
            onChange={(e) => setroutineName(e.target.value)}
            value={routineName}
          ></input>
          <textarea
            className="textbox"
            onChange={(e) => settext(e.target.value)}
            value={text}
          ></textarea>
          <button type="submit" className="save">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditDetails;

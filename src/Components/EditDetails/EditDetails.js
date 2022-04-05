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

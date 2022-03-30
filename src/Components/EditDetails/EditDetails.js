import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editRoutine } from '../../store/routine';

const EditDetails = ({ routine, setDetails }) => {
  const [routineName, setroutineName] = useState(routine.name);
  const [text, settext] = useState(routine.notes || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editRoutine(routine.id, routineName, text));

    setDetails(false);
  };

  return (
    <>
      <h1>Edit Routine Details</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setroutineName(e.target.value)}
          value={routineName}
        ></input>
        <textarea
          onChange={(e) => settext(e.target.value)}
          value={text}
        ></textarea>
        <button type="submit">Save</button>
      </form>
    </>
  );
};

export default EditDetails;

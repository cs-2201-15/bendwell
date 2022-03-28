import React from 'react';

const EditDetails = ({ routine }) => {
  return (
    <>
      <h1>{routine.name}</h1>
      <textarea>This is our edit view</textarea>
    </>
  );
};

export default EditDetails;

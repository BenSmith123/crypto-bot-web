
import React from 'react';

export default function PopupDialog(props) {

  const {
    close,
    questionDialog,
    title,
    confirmText,
    description,
    acceptFunc,
  } = props;

  return (
    <>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="dialogButtonContainer">
        {questionDialog && (
        <button type="button" className="button-red button-dialog" onClick={() => { acceptFunc(); close(); }}>{confirmText || 'Yes'}</button>
        )}
        <button type="button" className="button button-dialog" onClick={() => close()}>Cancel</button>
      </div>
    </>
  );
}


import React from 'react';
import Loader from './Loader';

export function Loading(props) {
  const { text } = props;
  return (
    <div className="toastMessage toastMessage--loading">
      <Loader size="40px" />
      <p>{text}</p>
    </div>
  );
}

export function Success() {
  return (
    <div className="toast--loader">
      <Loader />
    </div>
  );
}


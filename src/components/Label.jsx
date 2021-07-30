
import React from 'react';

function DefaultLable(text, className) {

  return (
    <div className={className || 'label'}>
      {text}
    </div>
  );
}

export const Label = ({ text }) => DefaultLable(text);

export const LabelBlue = ({ text }) => DefaultLable(text, 'label-blue');

export const LabelGreen = ({ text }) => DefaultLable(text, 'label-green');

export const LabelOrange = ({ text }) => DefaultLable(text, 'label-orange');


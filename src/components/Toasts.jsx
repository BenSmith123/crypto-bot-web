
import React from 'react';
import Loader from './Loader';

export function Loading(props) {
  const { text } = props;
  return (
    <div className="toastMessage--loading">
      <Loader size="40px" />
      <p>{text}</p>
    </div>
  );
}

export function Error(props) {
  const { text } = props;

  return (

    <div className="toastMessage--loading">
      <svg
        height="32"
        style={{ fill: '#ff3434' }}
        viewBox="0 0 32 32"
        width="32"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <g id="Error_1_">
            <g id="Error"><circle
              cx="16"
              cy="16"
              id="BG"
              r="16"
            />
              <path
                d="M14.5,25h3v-3h-3V25z M14.5,6v13h3V6H14.5z"
                style={{ fill: 'white' }}
              />
            </g>
          </g>
        </g>
      </svg>
      <p>Error: {text}</p>
    </div>

  );
}



import React from 'react';

export default function CryptoIcon(props) {
  const { name } = props;
  return (
    <img
      className="fadein-image"
      onError={(event) => event.target.src = '/crypto-icons/_empty.svg'} // eslint-disable-line
      src={`/crypto-icons/${name.toLowerCase()}.svg`}
      alt={`${name.toLowerCase()}-icon`}
      width="32"
      height="32"
    />
  );
}

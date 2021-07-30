
import React from 'react';

import { CRYPTO_ICONS_URL } from '../environment';

export default function CryptoIcon(props) {
  const { name } = props;
  return (
    <div className="cryptoIcon">
      <img
        className="fadein-image"
        onError={(event) => event.target.style.display = 'none'} // eslint-disable-line
        src={`${CRYPTO_ICONS_URL}white/${name.toLowerCase()}/32`}
        alt={`${name.toLowerCase()}-icon`}
        width="32"
        height="32"
      />
    </div>
  );
}
